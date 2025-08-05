import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  BarChart3, 
  Coins, 
  PieChart, 
  Calendar, 
  Shield,
  TrendingUp,
  Users,
  Target,
  FileText,
  DollarSign,
  Bitcoin,
  Circle,
  Sparkles,
  Activity,
  Settings,
  Info,
  ExternalLink,
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import TRSTHero from '@/components/trst/TRSTHero';
import TokenSaleSummary from '@/components/trst/TokenSaleSummary';
import BuyTokensFlow from '@/components/trst/BuyTokensFlow';
import TokenomicsChart from '@/components/trst/TokenomicsChart';
import VestingSchedule from '@/components/trst/VestingSchedule';
import KYCForm from '@/components/trst/KYCForm';
import { useAuth } from '@/contexts/AuthContext';
import { useTRST } from '@/hooks/use-trst';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

export default function TRST() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { icoData, userParticipation, connectWallet, buyTokens, submitKYC, getSaleStats, canParticipate, isSaleActive } = useTRST();

  // Dark mode toggle function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const stats = [
    {
      label: 'Total Raised',
      value: `$${(icoData.totalRaised / 1000000).toFixed(1)}M`,
      change: '+12.5%',
      gradient: 'from-trusted-success to-green-500',
      icon: TrendingUp
    },
    {
      label: 'Participants',
      value: icoData.participants.toLocaleString(),
      change: '+89',
      gradient: 'from-trusted-blue to-trusted-navy',
      icon: Users
    },
    {
      label: 'Token Price',
      value: `$${icoData.tokenPrice}`,
      change: 'Fixed',
      gradient: 'from-trusted-gold to-yellow-500',
      icon: Target
    },
    {
      label: 'Progress',
      value: `${Math.round((icoData.totalRaised / icoData.hardCap) * 100)}%`,
      change: 'of hard cap',
      gradient: 'from-trusted-warning to-orange-500',
      icon: BarChart3
    }
  ];

  const navigation = [
    { id: 'overview', label: 'Overview', icon: BarChart3, description: 'Sale summary and statistics' },
    { id: 'buy', label: 'Buy Tokens', icon: Coins, description: 'Purchase TRST tokens' },
    { id: 'tokenomics', label: 'Tokenomics', icon: PieChart, description: 'Token distribution and allocation' },
    { id: 'vesting', label: 'Vesting', icon: Calendar, description: 'Unlock schedules and timelines' },
    { id: 'kyc', label: 'KYC', icon: Shield, description: 'Identity verification' }
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
              setActiveTab(item.id);
              if (isMobile) {
                setIsSidebarOpen(false);
              }
            }}
          >
            <div className="flex items-start space-x-3 w-full">
              <item.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs opacity-70">{item.description}</div>
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
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
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
                  TRST TOKEN
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className="border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            <Link to="/">
              <Button variant="outline" size="sm" className="border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Platform
              </Button>
            </Link>
            <Badge variant="secondary" className="bg-gradient-to-r from-trusted-gold to-yellow-500 text-trusted-navy animate-pulse">
              <Coins className="h-4 w-4 mr-1" />
              TRST Live
            </Badge>
            <Button variant="outline" size="sm" className="border-trusted-gold text-trusted-gold hover:bg-trusted-gold hover:text-trusted-navy hidden sm:flex">
              <FileText className="h-4 w-4 mr-2" />
              Whitepaper
            </Button>
            <Button variant="outline" size="sm" className="border-trusted-blue text-trusted-blue hover:bg-trusted-blue hover:text-white hidden sm:flex">
              <ExternalLink className="h-4 w-4 mr-2" />
              Docs
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
                          <h1 className="text-sm font-bold text-trusted-navy dark:text-slate-100">
                            Trusted Edge Capital
                          </h1>
                          <p className="text-xs text-trusted-text-secondary dark:text-slate-400">
                            TRST TOKEN
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
          {/* Hero Section */}
          <TRSTHero icoData={icoData} />

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-trusted-text-secondary dark:text-slate-400">{stat.label}</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-trusted-text-primary dark:text-slate-100">{stat.value}</p>
                      <p className="text-xs text-trusted-text-secondary dark:text-slate-400">{stat.change}</p>
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
                {navigation.map((item) => (
                  <TabsTrigger 
                    key={item.id} 
                    value={item.id}
                    className="flex items-center space-x-1 sm:space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-trusted-gold data-[state=active]:to-yellow-500 data-[state=active]:text-trusted-navy text-xs sm:text-sm"
                  >
                    <item.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <TokenSaleSummary icoData={icoData} />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <TokenomicsChart />
                    <VestingSchedule />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="buy" className="space-y-4 sm:space-y-6">
                <BuyTokensFlow 
                  icoData={icoData}
                  userParticipation={userParticipation}
                />
              </TabsContent>

              <TabsContent value="tokenomics" className="space-y-4 sm:space-y-6">
                <TokenomicsChart />
              </TabsContent>

              <TabsContent value="vesting" className="space-y-4 sm:space-y-6">
                <VestingSchedule />
              </TabsContent>

              <TabsContent value="kyc" className="space-y-4 sm:space-y-6">
                <KYCForm />
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="text-center text-xs sm:text-sm text-trusted-text-secondary dark:text-slate-400">
              <p>© 2024 Trusted Edge Capital. All rights reserved.</p>
              <p className="mt-2">
                <span className="text-trusted-gold">TRST</span> - The Future of Decentralized Trading
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
} 