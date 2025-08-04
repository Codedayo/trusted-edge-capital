import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  TrendingUp, 
  BarChart3, 
  Wallet, 
  History, 
  Star,
  Settings,
  Bell,
  Search,
  User,
  Menu,
  X,
  DollarSign,
  Download,
  Upload,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Zap,
  Globe,
  Bitcoin,
  LogOut
} from 'lucide-react';
import PortfolioOverview from '@/components/dashboard/PortfolioOverview';
import TradingPanel from '@/components/dashboard/TradingPanel';
import MarketData from '@/components/dashboard/MarketData';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import CryptoWallet from '@/components/dashboard/CryptoWallet';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositAsset, setDepositAsset] = useState('USDT');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAsset, setWithdrawAsset] = useState('USDT');
  const [withdrawAddress, setWithdrawAddress] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Portfolio',
      value: '$125,430.50',
      change: '+2.5%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'from-trusted-navy to-trusted-blue'
    },
    {
      title: '24h P&L',
      value: '+$3,240.80',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
      gradient: 'from-trusted-success to-green-600'
    },
    {
      title: 'Crypto Holdings',
      value: '$45,230.00',
      change: '+1.8%',
      changeType: 'positive',
      icon: Bitcoin,
      gradient: 'from-trusted-gold to-trusted-gold-dark'
    },
    {
      title: 'Stock Holdings',
      value: '$80,200.00',
      change: '+3.2%',
      changeType: 'positive',
      icon: BarChart3,
      gradient: 'from-trusted-blue to-trusted-navy'
    }
  ];

  const navigation = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'trading', label: 'Trading', icon: TrendingUp },
    { id: 'markets', label: 'Markets', icon: BarChart3 },
    { id: 'wallet', label: 'Crypto Wallet', icon: Wallet },
    { id: 'watchlist', label: 'Watchlist', icon: Star },
    { id: 'history', label: 'History', icon: History },
    { id: 'analytics', label: 'Analytics', icon: Activity }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isDemoMode = () => {
    return typeof window !== 'undefined' && localStorage.getItem('demoUser');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <img 
              src="/Trusted Edge Capital Logo.png" 
              alt="Trusted Edge Capital" 
              className="h-8 w-auto"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-trusted-navy dark:text-slate-100">
                Trusted Edge Capital
              </h1>
              <p className="text-sm text-trusted-text-secondary dark:text-slate-400">
                Professional Trading Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search assets, markets..."
                className="pl-10 w-64"
              />
            </div>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-trusted-gold-gradient rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {getUserInitials()}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">
                  {getUserDisplayName()}
                </p>
                <p className="text-xs text-trusted-text-secondary dark:text-slate-400">
                  {user?.email}
                </p>
                {isDemoMode() && (
                  <Badge variant="secondary" className="mt-1 text-xs bg-trusted-gold text-trusted-navy">
                    Demo Mode
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-trusted-text-secondary hover:text-trusted-text-primary"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 min-h-screen">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className={`w-full justify-start ${
                  activeTab === item.id 
                    ? 'bg-trusted-gold-gradient text-white shadow-lg' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-trusted-text-primary dark:text-slate-100'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-trusted-text-secondary dark:text-slate-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-trusted-text-primary dark:text-slate-100">{stat.value}</p>
                      <div className={`flex items-center space-x-1 text-sm ${
                        stat.changeType === 'positive' ? 'text-trusted-success' : 'text-trusted-error'
                      }`}>
                        {stat.changeType === 'positive' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-trusted-text-primary dark:text-slate-100">Deposit Funds</h3>
                    <p className="text-sm text-trusted-text-secondary dark:text-slate-400">Add funds to your account</p>
                  </div>
                  <Button 
                    className="bg-trusted-gold-gradient text-white hover:opacity-90"
                    onClick={() => setIsDepositDialogOpen(true)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Deposit
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-trusted-text-primary dark:text-slate-100">Withdraw Funds</h3>
                    <p className="text-sm text-trusted-text-secondary dark:text-slate-400">Withdraw to your wallet</p>
                  </div>
                  <Button 
                    variant="outline"
                    className="border-trusted-gold text-trusted-gold hover:bg-trusted-gold hover:text-white"
                    onClick={() => setIsWithdrawDialogOpen(true)}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && <PortfolioOverview />}
            {activeTab === 'trading' && <TradingPanel />}
            {activeTab === 'markets' && <MarketData />}
            {activeTab === 'wallet' && <CryptoWallet />}
            {activeTab === 'history' && <TransactionHistory />}
            {activeTab === 'watchlist' && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b border-slate-200 dark:border-slate-700">
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-trusted-gold" />
                    <span>Watchlist</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-trusted-text-secondary dark:text-slate-400">Watchlist functionality coming soon...</p>
                </CardContent>
              </Card>
            )}
            {activeTab === 'analytics' && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b border-slate-200 dark:border-slate-700">
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-trusted-gold" />
                    <span>Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-trusted-text-secondary dark:text-slate-400">Analytics dashboard coming soon...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* Deposit Dialog */}
      <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-trusted-gold" />
              <span>Deposit Funds</span>
            </DialogTitle>
            <DialogDescription>
              Add funds to your trading account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Asset</Label>
              <Select value={depositAsset} onValueChange={setDepositAsset}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="BTC">Bitcoin</SelectItem>
                  <SelectItem value="ETH">Ethereum</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="crypto">Crypto Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDepositDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-trusted-gold-gradient text-white hover:opacity-90"
                onClick={() => setIsDepositDialogOpen(false)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Deposit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-trusted-gold" />
              <span>Withdraw Funds</span>
            </DialogTitle>
            <DialogDescription>
              Withdraw funds to your external wallet
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Asset</Label>
              <Select value={withdrawAsset} onValueChange={setWithdrawAsset}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="BTC">Bitcoin</SelectItem>
                  <SelectItem value="ETH">Ethereum</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>
            <div>
              <Label>Wallet Address</Label>
              <Input
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                placeholder="Enter wallet address"
              />
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Network Fee:</span>
                <span className="font-medium">$2.50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Estimated Time:</span>
                <span className="font-medium">2-5 minutes</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsWithdrawDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-trusted-gold-gradient text-white hover:opacity-90"
                onClick={() => setIsWithdrawDialogOpen(false)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}