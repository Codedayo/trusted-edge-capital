import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PieChart, 
  Target, 
  Users, 
  Zap,
  TrendingUp,
  Shield,
  Globe,
  Star,
  Sparkles,
  Activity,
  Coins
} from 'lucide-react';

export default function TokenomicsChart() {
  const tokenomics = [
    {
      category: 'Public Sale',
      percentage: 40,
      amount: '40,000,000',
      color: 'from-yellow-400 to-trusted-gold',
      bgColor: 'bg-gradient-to-r from-yellow-400 to-trusted-gold',
      description: 'Available during TRST Sale',
      icon: Target
    },
    {
      category: 'Team & Advisors',
      percentage: 15,
      amount: '15,000,000',
      color: 'from-blue-500 to-trusted-blue',
      bgColor: 'bg-gradient-to-r from-blue-500 to-trusted-blue',
      description: 'Vested over 24 months',
      icon: Users
    },
    {
      category: 'Development',
      percentage: 20,
      amount: '20,000,000',
      color: 'from-green-500 to-trusted-success',
      bgColor: 'bg-gradient-to-r from-green-500 to-trusted-success',
      description: 'Platform development',
      icon: Zap
    },
    {
      category: 'Marketing',
      percentage: 10,
      amount: '10,000,000',
      color: 'from-orange-500 to-trusted-warning',
      bgColor: 'bg-gradient-to-r from-orange-500 to-trusted-warning',
      description: 'Community growth',
      icon: TrendingUp
    },
    {
      category: 'Reserve',
      percentage: 10,
      amount: '10,000,000',
      color: 'from-slate-700 to-trusted-navy',
      bgColor: 'bg-gradient-to-r from-slate-700 to-trusted-navy',
      description: 'Future initiatives',
      icon: Shield
    },
    {
      category: 'Partnerships',
      percentage: 5,
      amount: '5,000,000',
      color: 'from-red-500 to-trusted-error',
      bgColor: 'bg-gradient-to-r from-red-500 to-trusted-error',
      description: 'Strategic partnerships',
      icon: Globe
    }
  ];

  const totalSupply = 100000000;

  return (
    <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
      <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-trusted-gold to-yellow-500 rounded-lg">
            <PieChart className="h-5 w-5 text-trusted-navy" />
          </div>
          <span className="text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">Tokenomics & Distribution</span>
          <Badge className="bg-gradient-to-r from-trusted-success to-green-500 text-white ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Modern Pie Chart */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 mx-auto">
          <svg width="192" height="192" viewBox="0 0 192 192" className="transform -rotate-90 drop-shadow-2xl sm:w-64 sm:h-64 lg:w-72 lg:h-72">
            {tokenomics.map((item, index) => {
              const previousPercentages = tokenomics
                .slice(0, index)
                .reduce((sum, prev) => sum + prev.percentage, 0);
              
              const startAngle = (previousPercentages / 100) * 360;
              const endAngle = ((previousPercentages + item.percentage) / 100) * 360;
              
              const radius = 120;
              const centerX = 144;
              const centerY = 144;
              
              const startRadians = (startAngle * Math.PI) / 180;
              const endRadians = (endAngle * Math.PI) / 180;
              
              const x1 = centerX + radius * Math.cos(startRadians);
              const y1 = centerY + radius * Math.sin(startRadians);
              const x2 = centerX + radius * Math.cos(endRadians);
              const y2 = centerY + radius * Math.sin(endRadians);
              
              const largeArcFlag = item.percentage > 50 ? 1 : 0;
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              return (
                <path
                  key={index}
                  d={pathData}
                  className={`${item.bgColor} transition-all duration-500 hover:opacity-80 hover:scale-105`}
                  style={{ 
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                    stroke: 'white',
                    strokeWidth: '2'
                  }}
                />
              );
            })}
          </svg>
          
          {/* Center Info with Enhanced Glow Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-full p-4 sm:p-6 lg:p-8 shadow-2xl border-2 border-slate-200/60 dark:border-slate-700/60">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-trusted-gold to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                {totalSupply.toLocaleString()}
              </div>
              <div className="text-xs sm:text-sm font-bold text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">Total Supply</div>
            </div>
          </div>
        </div>

        {/* Distribution Details */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold flex items-center space-x-2 text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">
            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold" />
            <span>Token Allocation</span>
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {tokenomics.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${item.bgColor} shadow-lg`}></div>
                    <div className="flex items-center space-x-2">
                      <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-trusted-text-secondary dark:text-slate-400" />
                      <div>
                        <div className="font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm text-sm sm:text-base">{item.category}</div>
                        <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-trusted-text-primary dark:text-slate-100 drop-shadow-sm text-sm sm:text-base">{item.percentage}%</div>
                    <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">
                      {item.amount} TRST
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-gradient-to-r from-trusted-navy to-trusted-blue rounded-xl p-4 sm:p-6 text-white shadow-2xl">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center space-x-2">
            <div className="p-2 bg-trusted-gold/20 rounded-lg">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold" />
            </div>
            <span className="drop-shadow-lg">Key Features</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-trusted-gold rounded-full"></div>
                <span className="drop-shadow-sm">ERC-20 Standard</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-trusted-gold rounded-full"></div>
                <span className="drop-shadow-sm">Deflationary Mechanism</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-trusted-gold rounded-full"></div>
                <span className="drop-shadow-sm">Staking Rewards</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-trusted-gold rounded-full"></div>
                <span className="drop-shadow-sm">Governance Rights</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-trusted-gold rounded-full"></div>
                <span className="drop-shadow-sm">Platform Utility</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-trusted-gold rounded-full"></div>
                <span className="drop-shadow-sm">Cross-chain Compatible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vesting Schedule Summary */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold flex items-center space-x-2 text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">
            <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold" />
            <span>Vesting Schedule</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-trusted-success/15 to-green-500/15 border border-trusted-success/30 rounded-xl">
              <div>
                <div className="font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm text-sm sm:text-base">Public Sale</div>
                <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">No vesting period</div>
              </div>
              <Badge className="bg-trusted-success">Immediate</Badge>
            </div>
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-trusted-warning/15 to-orange-500/15 border border-trusted-warning/30 rounded-xl">
              <div>
                <div className="font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm text-sm sm:text-base">Team & Advisors</div>
                <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">24-month linear vesting</div>
              </div>
              <Badge className="bg-trusted-warning">24 Months</Badge>
            </div>
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-trusted-blue/15 to-trusted-navy/15 border border-trusted-blue/30 rounded-xl">
              <div>
                <div className="font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm text-sm sm:text-base">Development & Marketing</div>
                <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">12-month linear vesting</div>
              </div>
              <Badge className="bg-trusted-blue">12 Months</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 