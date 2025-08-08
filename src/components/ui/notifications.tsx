import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  BellOff, 
  Settings, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Shield,
  Clock,
  Filter
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'trade' | 'security';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  priority: 'low' | 'medium' | 'high';
}

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onSettingsChange: (settings: NotificationSettings) => void;
  settings: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  trade: boolean;
  security: boolean;
  priceAlerts: boolean;
  news: boolean;
  sound: boolean;
}

export default function Notifications({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll,
  onSettingsChange,
  settings
}: NotificationsProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'trade' | 'security'>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'trade':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'security':
        return <Shield className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-slate-500" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-slate-300';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'trade') return notification.type === 'trade';
    if (filter === 'security') return notification.type === 'security';
    return true;
  });

  const handleSettingsChange = (key: keyof NotificationSettings, value: boolean) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const handleTestNotification = () => {
    toast({
      title: "Test Notification",
      description: "This is a test notification to verify your settings.",
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onMarkAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>

      {showSettings && (
        <CardContent className="border-b pb-4">
          <div className="space-y-4">
            <h4 className="font-medium">Notification Settings</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span className="text-sm">Email Notifications</span>
                </div>
                <Switch
                  checked={settings.email}
                  onCheckedChange={(checked) => handleSettingsChange('email', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span className="text-sm">Push Notifications</span>
                </div>
                <Switch
                  checked={settings.push}
                  onCheckedChange={(checked) => handleSettingsChange('push', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">Trade Notifications</span>
                </div>
                <Switch
                  checked={settings.trade}
                  onCheckedChange={(checked) => handleSettingsChange('trade', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Security Alerts</span>
                </div>
                <Switch
                  checked={settings.security}
                  onCheckedChange={(checked) => handleSettingsChange('security', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Price Alerts</span>
                </div>
                <Switch
                  checked={settings.priceAlerts}
                  onCheckedChange={(checked) => handleSettingsChange('priceAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4" />
                  <span className="text-sm">News Updates</span>
                </div>
                <Switch
                  checked={settings.news}
                  onCheckedChange={(checked) => handleSettingsChange('news', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span className="text-sm">Sound Notifications</span>
                </div>
                <Switch
                  checked={settings.sound}
                  onCheckedChange={(checked) => handleSettingsChange('sound', checked)}
                />
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleTestNotification}
              className="w-full"
            >
              Test Notification
            </Button>
          </div>
        </CardContent>
      )}

      <CardContent className="p-0">
        <div className="border-b px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            
            <div className="flex space-x-1">
              {[
                { value: 'all', label: 'All' },
                { value: 'unread', label: 'Unread' },
                { value: 'trade', label: 'Trade' },
                { value: 'security', label: 'Security' }
              ].map((f) => (
                <Button
                  key={f.value}
                  variant={filter === f.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(f.value as any)}
                  className="text-xs"
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <ScrollArea className="h-96">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-slate-500">
              <BellOff className="h-12 w-12 mb-2" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-950/20' : ''
                  } hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {notification.title}
                          </h4>
                          {notification.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">
                              High
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex items-center space-x-1 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimestamp(notification.timestamp)}</span>
                          </div>
                          
                          {notification.action && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={notification.action.onClick}
                              className="text-xs h-6"
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMarkAsRead(notification.id)}
                          className="h-6 w-6 p-0"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(notification.id)}
                        className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {filteredNotifications.length > 0 && (
          <div className="border-t px-4 py-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              className="w-full text-xs"
            >
              Clear All Notifications
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 