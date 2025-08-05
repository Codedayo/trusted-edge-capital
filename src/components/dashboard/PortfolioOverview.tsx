import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Bitcoin,
  BarChart3,
  Star,
  Sparkles,
  Activity,
  Target,
  Zap
} from 'lucide-react';

export default function PortfolioOverview() {
  const portfolioData = {
    totalValue: 124567.89,
    totalChange: 8.5,
    totalChangePercent: 7.2,
    assets: [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        value: 45678.90,
        change: 12.5,
        changePercent: 8.3,
        allocation: 36.7,
        icon: Bitcoin
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        value: 34567.89,
        change: -2.1,
        changePercent: -1.8,
        allocation: 27.8,
        icon: TrendingUp
      },
      {
        symbol: 'USDT',
        name: 'Tether',
        value: 23456.78,
        change: 0.5,
        changePercent: 0.2,
        allocation: 18.9,
        icon: DollarSign
      },
      {
        symbol: 'TRST',
        name: 'TRST Token',
        value: 20864.32,
        change: 25.8,
        changePercent: 15.2,
        allocation: 16.6,
        icon: Star
      }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
        <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-trusted-gold to-yellow-500 rounded-lg">
              <BarChart3 className="h-5 w-5 text-trusted-navy" />
            </div>
            <span className="text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">Portfolio Overview</span>
            <Badge className="bg-gradient-to-r from-trusted-success to-green-500 text-white ml-auto">
              <Sparkles className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Portfolio Value */}
            <div className="bg-gradient-to-r from-trusted-success/15 to-green-500/15 rounded-xl p-6 border border-trusted-success/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-trusted-success/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-trusted-success" />
                </div>
                <div>
                  <div className="text-sm font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">Total Portfolio</div>
                  <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">Current Value</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">
                {formatCurrency(portfolioData.totalValue)}
              </div>
              <div className={`flex items-center space-x-1 mt-2 ${
                portfolioData.totalChange >= 0 ? 'text-trusted-success' : 'text-trusted-error'
              }`}>
                {portfolioData.totalChange >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="font-medium drop-shadow-sm">
                  {portfolioData.totalChange >= 0 ? '+' : ''}{portfolioData.totalChangePercent}%
                </span>
              </div>
            </div>

            {/* 24h Performance */}
            <div className="bg-gradient-to-r from-trusted-gold/15 to-yellow-500/15 rounded-xl p-6 border border-trusted-gold/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-trusted-gold/20 rounded-lg">
                  <Activity className="h-5 w-5 text-trusted-gold" />
                </div>
                <div>
                  <div className="text-sm font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">24h Performance</div>
                  <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">Today's Change</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">
                {formatCurrency(portfolioData.totalChange * 1000)}
              </div>
              <div className="flex items-center space-x-1 mt-2 text-trusted-success">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium drop-shadow-sm">+{portfolioData.totalChangePercent}%</span>
              </div>
            </div>

            {/* Asset Allocation */}
            <div className="bg-gradient-to-r from-trusted-blue/15 to-trusted-navy/15 rounded-xl p-6 border border-trusted-blue/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-trusted-blue/20 rounded-lg">
                  <Target className="h-5 w-5 text-trusted-blue" />
                </div>
                <div>
                  <div className="text-sm font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">Asset Allocation</div>
                  <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">Diversified Portfolio</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">
                {portfolioData.assets.length}
              </div>
              <div className="text-sm text-trusted-text-secondary dark:text-slate-400 mt-2 drop-shadow-sm">
                Active Assets
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Breakdown */}
      <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
        <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-trusted-gold to-yellow-500 rounded-lg">
              <Zap className="h-5 w-5 text-trusted-navy" />
            </div>
            <span className="text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">Asset Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {portfolioData.assets.map((asset, index) => {
              const Icon = asset.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-trusted-gold to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="h-5 w-5 text-trusted-navy" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">{asset.symbol}</span>
                        <Badge variant="secondary" className="text-xs">
                          {asset.allocation.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="text-sm text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">{asset.name}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">
                      {formatCurrency(asset.value)}
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${
                      asset.change >= 0 ? 'text-trusted-success' : 'text-trusted-error'
                    }`}>
                      {asset.change >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span className="drop-shadow-sm">
                        {asset.change >= 0 ? '+' : ''}{asset.changePercent}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Allocation Chart */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">
              Portfolio Allocation
            </h3>
            <div className="space-y-3">
              {portfolioData.assets.map((asset, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">{asset.symbol}</span>
                    <span className="text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">{asset.allocation.toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={asset.allocation} 
                    className="h-2 bg-slate-200 dark:bg-slate-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}