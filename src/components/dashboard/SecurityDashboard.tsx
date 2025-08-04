import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Fingerprint, 
  Smartphone, 
  Lock, 
  Eye, 
  EyeOff,
  Key,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Activity,
  Settings,
  QrCode,
  Download,
  Copy,
  RefreshCw
} from 'lucide-react';
import QRCode from 'qrcode.react';

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'trade' | 'withdrawal' | 'security_change';
  description: string;
  location: string;
  timestamp: string;
  ip: string;
  device: string;
  status: 'success' | 'warning' | 'error';
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  geoRestrictions: boolean;
}

export default function SecurityDashboard() {
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    biometricEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    geoRestrictions: false
  });

  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [twoFactorSecret, setTwoFactorSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [securityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      type: 'login',
      description: 'Successful login',
      location: 'New York, NY',
      timestamp: '2024-08-04T14:30:00Z',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success'
    },
    {
      id: '2',
      type: 'trade',
      description: 'Large trade executed',
      location: 'San Francisco, CA',
      timestamp: '2024-08-04T13:45:00Z',
      ip: '10.0.0.50',
      device: 'Safari on iPhone',
      status: 'success'
    },
    {
      id: '3',
      type: 'security_change',
      description: '2FA enabled',
      location: 'London, UK',
      timestamp: '2024-08-04T12:15:00Z',
      ip: '172.16.0.25',
      device: 'Firefox on Mac',
      status: 'success'
    },
    {
      id: '4',
      type: 'login',
      description: 'Failed login attempt',
      location: 'Unknown',
      timestamp: '2024-08-04T11:30:00Z',
      ip: '203.0.113.1',
      device: 'Unknown',
      status: 'error'
    }
  ]);

  const [activeSessions] = useState([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      ip: '192.168.1.100',
      lastActive: '2 minutes ago',
      isCurrent: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'San Francisco, CA',
      ip: '10.0.0.50',
      lastActive: '1 hour ago',
      isCurrent: false
    }
  ]);

  useEffect(() => {
    // Generate a random secret for 2FA demo
    if (showTwoFactorSetup && !twoFactorSecret) {
      const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setTwoFactorSecret(secret);
    }
  }, [showTwoFactorSetup, twoFactorSecret]);

  const handleTwoFactorToggle = () => {
    if (!securitySettings.twoFactorEnabled) {
      setShowTwoFactorSetup(true);
    } else {
      setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: false }));
    }
  };

  const handleBiometricToggle = () => {
    setSecuritySettings(prev => ({ ...prev, biometricEnabled: !prev.biometricEnabled }));
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return <ShieldCheck className="h-4 w-4" />;
      case 'logout': return <Shield className="h-4 w-4" />;
      case 'trade': return <Activity className="h-4 w-4" />;
      case 'withdrawal': return <Key className="h-4 w-4" />;
      case 'security_change': return <Settings className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Security Score</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">85/100</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Active Sessions</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">{activeSessions.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Failed Attempts</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">1</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <ShieldAlert className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Last Login</p>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">2 min ago</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-blue-600" />
                <div>
                  <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Add an extra layer of security</p>
                </div>
              </div>
              <Switch
                checked={securitySettings.twoFactorEnabled}
                onCheckedChange={handleTwoFactorToggle}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Fingerprint className="h-5 w-5 text-green-600" />
                <div>
                  <Label className="text-sm font-medium">Biometric Authentication</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Use fingerprint or face ID</p>
                </div>
              </div>
              <Switch
                checked={securitySettings.biometricEnabled}
                onCheckedChange={handleBiometricToggle}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-purple-600" />
                <div>
                  <Label className="text-sm font-medium">Email Notifications</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Get alerts for security events</p>
                </div>
              </div>
              <Switch
                checked={securitySettings.emailNotifications}
                onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-600" />
                <div>
                  <Label className="text-sm font-medium">Geographic Restrictions</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Limit access to specific regions</p>
                </div>
              </div>
              <Switch
                checked={securitySettings.geoRestrictions}
                onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, geoRestrictions: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold" />
              <span>Active Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{session.device}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{session.location} • {session.ip}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{session.lastActive}</p>
                    {session.isCurrent && (
                      <Badge variant="secondary" className="text-xs">Current</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Events */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <ShieldAlert className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold" />
            <span>Security Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(event.status)}`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{event.description}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {event.location} • {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400">{event.device}</p>
                  <p className="text-xs text-slate-400">{event.ip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 2FA Setup Dialog */}
      <Dialog open={showTwoFactorSetup} onOpenChange={setShowTwoFactorSetup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-trusted-gold" />
              <span>Set Up Two-Factor Authentication</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Scan this QR code with your authenticator app
              </p>
              <div className="bg-white p-4 rounded-lg inline-block">
                <QRCode value={`otpauth://totp/TrustedEdgeCapital:${twoFactorSecret}?secret=${twoFactorSecret}&issuer=TrustedEdgeCapital`} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Verification Code</Label>
              <Input
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowTwoFactorSetup(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-trusted-gold-gradient text-white hover:opacity-90"
                onClick={() => {
                  if (verificationCode.length === 6) {
                    setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: true }));
                    setShowTwoFactorSetup(false);
                    setVerificationCode('');
                  }
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Verify & Enable
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 