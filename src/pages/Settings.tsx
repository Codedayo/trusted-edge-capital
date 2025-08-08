import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Smartphone,
  Key,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Settings as SettingsIcon,
  Lock,
  Mail,
  Phone,
  CreditCard,
  Download,
  Upload
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import TwoFactorAuth from '@/components/ui/two-factor-auth';
import Notifications, { NotificationSettings } from '@/components/ui/notifications';

interface UserSettings {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    timezone: string;
    language: string;
  };
  security: {
    twoFactorEnabled: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    sessionTimeout: number;
    requirePasswordForTrades: boolean;
    ipWhitelist: string[];
  };
  trading: {
    defaultOrderType: string;
    confirmOrders: boolean;
    autoSaveTrades: boolean;
    riskLevel: 'low' | 'medium' | 'high';
    maxPositionSize: number;
    stopLossPercentage: number;
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    compactMode: boolean;
    showAnimations: boolean;
    chartTheme: 'light' | 'dark';
  };
  notifications: NotificationSettings;
}

export default function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      timezone: '',
      language: 'en'
    },
    security: {
      twoFactorEnabled: false,
      emailNotifications: true,
      smsNotifications: false,
      sessionTimeout: 30,
      requirePasswordForTrades: true,
      ipWhitelist: []
    },
    trading: {
      defaultOrderType: 'market',
      confirmOrders: true,
      autoSaveTrades: true,
      riskLevel: 'medium',
      maxPositionSize: 10000,
      stopLossPercentage: 5
    },
    appearance: {
      theme: 'auto',
      compactMode: false,
      showAnimations: true,
      chartTheme: 'dark'
    },
    notifications: {
      email: true,
      push: true,
      trade: true,
      security: true,
      priceAlerts: true,
      news: true,
      sound: true
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      // In production, load from API
      const savedSettings = localStorage.getItem('userSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      setIsLoading(true);
      // In production, save to API
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      toast({
        title: "Settings Saved",
        description: "Your settings have been successfully saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = (field: keyof UserSettings['profile'], value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handleSecurityUpdate = (field: keyof UserSettings['security'], value: any) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: value
      }
    }));
  };

  const handleTradingUpdate = (field: keyof UserSettings['trading'], value: any) => {
    setSettings(prev => ({
      ...prev,
      trading: {
        ...prev.trading,
        [field]: value
      }
    }));
  };

  const handleAppearanceUpdate = (field: keyof UserSettings['appearance'], value: any) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [field]: value
      }
    }));
  };

  const handleNotificationUpdate = (newSettings: NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      notifications: newSettings
    }));
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure your new passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      // In production, call API to change password
      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'trusted-edge-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string);
        setSettings(importedSettings);
        toast({
          title: "Settings Imported",
          description: "Your settings have been successfully imported.",
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Invalid settings file. Please try again.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your account preferences and security settings
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={exportSettings}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" asChild>
            <label>
              <Upload className="h-4 w-4 mr-2" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={importSettings}
                className="hidden"
              />
            </label>
          </Button>
          <Button onClick={saveSettings} disabled={isLoading}>
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="trading" className="flex items-center space-x-2">
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Trading</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={settings.profile.firstName}
                    onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={settings.profile.lastName}
                    onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={settings.profile.phone}
                    onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select value={settings.profile.country} onValueChange={(value) => handleProfileUpdate('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.profile.timezone} onValueChange={(value) => handleProfileUpdate('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="gmt">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSecurityUpdate('twoFactorEnabled', checked)}
                  />
                </div>

                {settings.security.twoFactorEnabled && (
                  <TwoFactorAuth
                    isEnabled={settings.security.twoFactorEnabled}
                    onSetup={(secret, backupCodes) => {
                      handleSecurityUpdate('twoFactorEnabled', true);
                      toast({
                        title: "2FA Enabled",
                        description: "Two-factor authentication has been enabled.",
                      });
                    }}
                    onDisable={async () => {
                      handleSecurityUpdate('twoFactorEnabled', false);
                      toast({
                        title: "2FA Disabled",
                        description: "Two-factor authentication has been disabled.",
                      });
                    }}
                  />
                )}

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Password Change</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handlePasswordChange} disabled={isLoading}>
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Session & Security</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Session Timeout</Label>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Automatically log out after inactivity
                        </p>
                      </div>
                      <Select 
                        value={settings.security.sessionTimeout.toString()} 
                        onValueChange={(value) => handleSecurityUpdate('sessionTimeout', parseInt(value))}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Require Password for Trades</Label>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Always require password confirmation for trades
                        </p>
                      </div>
                      <Switch
                        checked={settings.security.requirePasswordForTrades}
                        onCheckedChange={(checked) => handleSecurityUpdate('requirePasswordForTrades', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5" />
                Trading Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Order Settings</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Default Order Type</Label>
                      <Select 
                        value={settings.trading.defaultOrderType} 
                        onValueChange={(value) => handleTradingUpdate('defaultOrderType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="market">Market</SelectItem>
                          <SelectItem value="limit">Limit</SelectItem>
                          <SelectItem value="stop">Stop</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Confirm Orders</Label>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Always show confirmation before placing orders
                        </p>
                      </div>
                      <Switch
                        checked={settings.trading.confirmOrders}
                        onCheckedChange={(checked) => handleTradingUpdate('confirmOrders', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Auto-Save Trades</Label>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Automatically save trade history
                        </p>
                      </div>
                      <Switch
                        checked={settings.trading.autoSaveTrades}
                        onCheckedChange={(checked) => handleTradingUpdate('autoSaveTrades', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Risk Management</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Risk Level</Label>
                      <Select 
                        value={settings.trading.riskLevel} 
                        onValueChange={(value: any) => handleTradingUpdate('riskLevel', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxPositionSize">Max Position Size ($)</Label>
                      <Input
                        id="maxPositionSize"
                        type="number"
                        value={settings.trading.maxPositionSize}
                        onChange={(e) => handleTradingUpdate('maxPositionSize', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stopLossPercentage">Default Stop Loss (%)</Label>
                      <Input
                        id="stopLossPercentage"
                        type="number"
                        value={settings.trading.stopLossPercentage}
                        onChange={(e) => handleTradingUpdate('stopLossPercentage', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Theme</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme Mode</Label>
                      <Select 
                        value={settings.appearance.theme} 
                        onValueChange={(value: any) => handleAppearanceUpdate('theme', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Chart Theme</Label>
                      <Select 
                        value={settings.appearance.chartTheme} 
                        onValueChange={(value: any) => handleAppearanceUpdate('chartTheme', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Interface</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Compact Mode</Label>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Use more compact layout
                        </p>
                      </div>
                      <Switch
                        checked={settings.appearance.compactMode}
                        onCheckedChange={(checked) => handleAppearanceUpdate('compactMode', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Show Animations</Label>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Enable interface animations
                        </p>
                      </div>
                      <Switch
                        checked={settings.appearance.showAnimations}
                        onCheckedChange={(checked) => handleAppearanceUpdate('showAnimations', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Notifications
            notifications={[]}
            onMarkAsRead={() => {}}
            onMarkAllAsRead={() => {}}
            onDelete={() => {}}
            onClearAll={() => {}}
            onSettingsChange={handleNotificationUpdate}
            settings={settings.notifications}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
} 