import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Shield,
  History,
  Activity,
  Settings,
  LogOut,
  HelpCircle,
  Coins,
  Bitcoin,
  Wallet,
  Target,
  Star,
  Zap,
  Globe,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import PortfolioOverview from '@/components/dashboard/PortfolioOverview';
import LiveMarketData from '@/components/dashboard/LiveMarketData';
import MarketData from '@/components/dashboard/MarketData';
import TradingPanel from '@/components/dashboard/TradingPanel';
import SecurityDashboard from '@/components/dashboard/SecurityDashboard';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import CryptoWallet from '@/components/dashboard/CryptoWallet';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const quickStats = [
    {
      title: 'Portfolio Value',
      value: '$124,567.89',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'from-trusted-success to-green-500'
    },
    {
      title: '24h Change',
      value: '+$8,234.56',
      change: '+7.2%',
      changeType: 'positive',
      icon: TrendingUp,
      gradient: 'from-trusted-gold to-yellow-500'
    },
    {
      title: 'Active Trades',
      value: '12',
      change: '+3',
      changeType: 'positive',
      icon: Activity,
      gradient: 'from-trusted-blue to-trusted-navy'
    },
    {
      title: 'Security Score',
      value: '98/100',
      change: '+2',
      changeType: 'positive',
      icon: Shield,
      gradient: 'from-trusted-success to-green-500'
    }
  ];

  const navigation = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'portfolio', label: 'Portfolio', icon: TrendingUp },
    { id: 'trading', label: 'Trading', icon: Activity },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'history', label: 'History', icon: History },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'trst', label: 'TRST TOKEN', icon: Coins, external: true, href: '/trst' }
  ];

  const NavigationSidebar = () => (
    <div className="p-4 sm:p-6">
      <div className="space-y-2">
        {navigation.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? 'default' : 'ghost'}
            className={`w-full justify-start h-auto p-3 ${
              activeTab === item.id 
                ? 'bg-gradient-to-r from-trusted-gold to-yellow-500 text-trusted-navy shadow-lg' 
                : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100'
            }`}
            onClick={() => {
              if (item.external && item.href) {
                window.location.href = item.href;
              } else {
                setActiveTab(item.id);
                if (isMobile) {
                  setIsSidebarOpen(false);
                }
              }
            }}
          >
            <div className="flex items-start space-x-3 w-full">
              <item.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <div className="font-medium">{item.label}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <img 
              src="/Trusted Edge Capital Logo.png" 
              alt="Trusted Edge Capital" 
              className="h-6 sm:h-8 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 drop-shadow-sm">
                Trusted Edge Capital
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 drop-shadow-sm">
                Professional Trading Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Badge variant="secondary" className="bg-gradient-to-r from-trusted-success to-green-500 text-white shadow-lg">
              <Star className="h-3 w-3 mr-1" />
              Live Trading
            </Badge>
            <div className="flex items-center space-x-2">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100 drop-shadow-sm">
                  {user?.email}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 drop-shadow-sm">
                  Premium Member
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="border-trusted-error text-trusted-error hover:bg-trusted-error hover:text-white shadow-lg"
              >
                <LogOut className="h-4 w-4" />
              </Button>
              
              {/* Mobile Menu Button */}
              {isMobile && (
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
                    <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="/Trusted Edge Capital Logo.png" 
                            alt="Trusted Edge Capital" 
                            className="h-6 w-auto"
                          />
                          <div>
                            <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                              Trusted Edge Capital
                            </h1>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              Professional Trading Platform
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsSidebarOpen(false)}
                          className="p-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <NavigationSidebar />
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="w-64 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-r border-slate-200/50 dark:border-slate-700/50 min-h-screen">
            <NavigationSidebar />
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {quickStats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">{stat.title}</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">{stat.value}</p>
                      <p className={`text-xs ${
                        stat.changeType === 'positive' ? 'text-trusted-success' : 
                        stat.changeType === 'negative' ? 'text-trusted-error' : 'text-trusted-text-secondary'
                      } drop-shadow-sm`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center flex-shrink-0 ml-2 sm:ml-3 shadow-lg`}>
                      <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4 sm:space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                <PortfolioOverview />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <LiveMarketData />
                  <MarketData />
                </div>
              </div>
            )}
            {activeTab === 'portfolio' && <PortfolioOverview />}
            {activeTab === 'trading' && <TradingPanel />}
            {activeTab === 'wallet' && <CryptoWallet />}
            {activeTab === 'security' && <SecurityDashboard />}
            {activeTab === 'history' && <TransactionHistory />}
            {activeTab === 'analytics' && (
              <div className="space-y-4 sm:space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="p-2 bg-gradient-to-r from-trusted-gold to-yellow-500 rounded-lg">
                        <Activity className="h-5 w-5 text-trusted-navy" />
                      </div>
                      <span className="text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">Analytics Dashboard</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 sm:py-12">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-trusted-gold/20 to-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-trusted-gold" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-trusted-text-primary dark:text-slate-100 mb-2 drop-shadow-lg">
                        Advanced Analytics
                      </h3>
                      <p className="text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">
                        Detailed trading analytics and performance metrics coming soon.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}