import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
  LogOut,
  HelpCircle
} from 'lucide-react';
import PortfolioOverview from '@/components/dashboard/PortfolioOverview';
import TradingPanel from '@/components/dashboard/TradingPanel';
import MarketData from '@/components/dashboard/MarketData';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import CryptoWallet from '@/components/dashboard/CryptoWallet';
import SecurityDashboard from '@/components/dashboard/SecurityDashboard';
import LiveMarketData from '@/components/dashboard/LiveMarketData';
import OnboardingTour from '@/components/ui/onboarding-tour';
import DemoMode from '@/components/ui/demo-mode';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositAsset, setDepositAsset] = useState('USDT');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAsset, setWithdrawAsset] = useState('USDT');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isDemoModeActive, setIsDemoModeActive] = useState(false);

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
    { id: 'live-data', label: 'Live Data', icon: Activity },
    { id: 'wallet', label: 'Crypto Wallet', icon: Wallet },
    { id: 'security', label: 'Security', icon: Shield },
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

  const checkDemoMode = () => {
    return typeof window !== 'undefined' && localStorage.getItem('demoUser');
  };

  const NavigationSidebar = () => (
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
          onClick={() => {
            setActiveTab(item.id);
            if (isMobile) {
              setIsSidebarOpen(false);
            }
          }}
        >
          <item.icon className="h-4 w-4 mr-3" />
          {item.label}
        </Button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {isMobile && (
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="/Trusted Edge Capital Logo.png" 
                        alt="Trusted Edge Capital" 
                        className="h-6 w-auto"
                      />
                      <div>
                        <h1 className="text-sm font-bold text-trusted-navy dark:text-slate-100">
                          Trusted Edge Capital
                        </h1>
                        <p className="text-xs text-trusted-text-secondary dark:text-slate-400">
                          Professional Trading Platform
                        </p>
                      </div>
                    </div>
                  </div>
                  <NavigationSidebar />
                </SheetContent>
              </Sheet>
            )}
            
            <img 
              src="/Trusted Edge Capital Logo.png" 
              alt="Trusted Edge Capital" 
              className="h-6 sm:h-8 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-trusted-navy dark:text-slate-100">
                Trusted Edge Capital
              </h1>
              <p className="text-xs sm:text-sm text-trusted-text-secondary dark:text-slate-400">
                Professional Trading Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search assets, markets..."
                className="pl-10 w-64"
              />
            </div>
            
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="h-4 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2"
              onClick={() => setShowOnboarding(true)}
              title="Start Tour"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-trusted-gold-gradient rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {getUserInitials()}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">
                  {getUserDisplayName()}
                </p>
                <p className="text-xs text-trusted-text-secondary dark:text-slate-400">
                  {user?.email}
                </p>
                {checkDemoMode() && (
                  <Badge variant="secondary" className="mt-1 text-xs bg-trusted-gold text-trusted-navy">
                    Demo Mode
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-trusted-text-secondary hover:text-trusted-text-primary p-2"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 min-h-screen">
            <NavigationSidebar />
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-trusted-text-secondary dark:text-slate-400 truncate">{stat.title}</p>
                      <p className="text-lg sm:text-2xl font-bold text-trusted-text-primary dark:text-slate-100 truncate">{stat.value}</p>
                      <div className={`flex items-center space-x-1 text-xs sm:text-sm ${
                        stat.changeType === 'positive' ? 'text-trusted-success' : 'text-trusted-error'
                      }`}>
                        {stat.changeType === 'positive' ? (
                          <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        )}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center flex-shrink-0 ml-3`}>
                      <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-trusted-text-primary dark:text-slate-100">Deposit Funds</h3>
                    <p className="text-xs sm:text-sm text-trusted-text-secondary dark:text-slate-400">Add funds to your account</p>
                  </div>
                  <Button 
                    className="bg-trusted-gold-gradient text-white hover:opacity-90 text-xs sm:text-sm"
                    onClick={() => setIsDepositDialogOpen(true)}
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Deposit</span>
                    <span className="sm:hidden">+</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-trusted-text-primary dark:text-slate-100">Withdraw Funds</h3>
                    <p className="text-xs sm:text-sm text-trusted-text-secondary dark:text-slate-400">Withdraw to your wallet</p>
                  </div>
                  <Button 
                    variant="outline"
                    className="border-trusted-gold text-trusted-gold hover:bg-trusted-gold hover:text-white text-xs sm:text-sm"
                    onClick={() => setIsWithdrawDialogOpen(true)}
                  >
                    <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Withdraw</span>
                    <span className="sm:hidden">-</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Content */}
          <div className="space-y-4 sm:space-y-6">
            {activeTab === 'overview' && <PortfolioOverview />}
            {activeTab === 'trading' && <TradingPanel />}
            {activeTab === 'markets' && <MarketData />}
            {activeTab === 'live-data' && <LiveMarketData />}
            {activeTab === 'wallet' && <CryptoWallet />}
            {activeTab === 'security' && <SecurityDashboard />}
            {activeTab === 'history' && <TransactionHistory />}
            {activeTab === 'analytics' && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b border-slate-200 dark:border-slate-700">
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-trusted-gold" />
                    <span>Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
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

      {/* Onboarding Tour */}
      <OnboardingTour
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={() => setShowOnboarding(false)}
      />

      {/* Demo Mode */}
      <DemoMode
        isActive={isDemoModeActive}
        onToggle={() => setIsDemoModeActive(!isDemoModeActive)}
        onReset={() => {
          // Reset demo data
          console.log('Demo data reset');
        }}
      />
    </div>
  );
}