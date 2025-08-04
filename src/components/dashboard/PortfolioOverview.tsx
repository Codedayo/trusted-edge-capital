import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { API } from '@/lib/api';
import { Portfolio, Holding } from '@/integrations/supabase/types';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  Eye,
  EyeOff,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Target,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface PortfolioOverviewProps {
  className?: string;
}

export default function PortfolioOverview({ className }: PortfolioOverviewProps) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [showValues, setShowValues] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      const [portfoliosData, holdingsData] = await Promise.all([
        API.Portfolio.getPortfolios(),
        API.Portfolio.getHoldings()
      ]);
      setPortfolios(portfoliosData || []);
      setHoldings(holdingsData || []);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalValue = portfolios.reduce((sum, portfolio) => sum + (portfolio.balance || 0), 0);
  const totalPnL = holdings.reduce((sum, holding) => sum + (holding.unrealized_pnl || 0), 0);
  const totalPnLPercent = totalValue > 0 ? (totalPnL / totalValue) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getPriceChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getPriceChangeIcon = (change: number) => {
    return change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />;
  };

  // Mock data for charts
  const performanceData = [
    { date: 'Jan', value: 100000 },
    { date: 'Feb', value: 105000 },
    { date: 'Mar', value: 110000 },
    { date: 'Apr', value: 108000 },
    { date: 'May', value: 115000 },
    { date: 'Jun', value: 125430 }
  ];

  const allocationData = [
    { name: 'Crypto', value: 45, color: '#f59e0b' },
    { name: 'Stocks', value: 35, color: '#3b82f6' },
    { name: 'Cash', value: 15, color: '#10b981' },
    { name: 'Other', value: 5, color: '#8b5cf6' }
  ];

  if (loading) {
    return (
      <div className={`space-y-4 sm:space-y-6 ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="animate-pulse space-y-3 sm:space-y-4">
                  <div className="h-3 sm:h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                  <div className="h-6 sm:h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-0 shadow-lg bg-trusted-gradient text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-xs sm:text-sm">Total Portfolio</p>
                <p className="text-lg sm:text-2xl font-bold truncate">
                  {showValues ? formatCurrency(totalValue) : '••••••'}
                </p>
              </div>
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-white/80 flex-shrink-0 ml-3" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-xs sm:text-sm">24h P&L</p>
                <p className="text-lg sm:text-2xl font-bold truncate">
                  {showValues ? formatCurrency(totalPnL) : '••••••'}
                </p>
                <div className="flex items-center space-x-1 text-xs sm:text-sm">
                  {getPriceChangeIcon(totalPnLPercent)}
                  <span>{totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%</span>
                </div>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-white/80 flex-shrink-0 ml-3" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-xs sm:text-sm">Active Positions</p>
                <p className="text-lg sm:text-2xl font-bold">{holdings.length}</p>
              </div>
              <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-white/80 flex-shrink-0 ml-3" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-xs sm:text-sm">Security Status</p>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold" />
                  <span className="text-sm sm:text-lg font-semibold">Protected</span>
                </div>
              </div>
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-white/80 flex-shrink-0 ml-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold" />
              <span>Portfolio Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--trusted-gold))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--trusted-gold))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
              <PieChart className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold" />
              <span>Asset Allocation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <RechartsPieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
              {allocationData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold" />
              <span>Current Holdings</span>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowValues(!showValues)}
              className="border-trusted-gold text-trusted-gold hover:bg-trusted-gold hover:text-white text-xs sm:text-sm"
            >
              {showValues ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />}
              <span className="hidden sm:inline">{showValues ? 'Hide Values' : 'Show Values'}</span>
              <span className="sm:hidden">{showValues ? 'Hide' : 'Show'}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {holdings.length > 0 ? (
              holdings.map((holding) => (
                <div
                  key={holding.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-trusted-gold-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base truncate">
                        {holding.asset?.symbol || 'Unknown'}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                        {holding.asset?.name || 'Unknown Asset'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                      {showValues ? formatCurrency(holding.quantity * (holding.asset?.current_price || 0)) : '••••••'}
                    </p>
                    <div className={`flex items-center space-x-1 text-xs sm:text-sm ${getPriceChangeColor(holding.unrealized_pnl || 0)}`}>
                      {getPriceChangeIcon(holding.unrealized_pnl || 0)}
                      <span>
                        {showValues ? formatCurrency(holding.unrealized_pnl || 0) : '••••••'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400" />
                </div>
                <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">No holdings yet</p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Start trading to see your holdings here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-trusted-gold-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base">Start Trading</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Buy and sell assets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base">Deposit Funds</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Add money to your account</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base">Security</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Manage your security</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}