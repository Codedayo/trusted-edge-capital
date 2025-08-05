import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Bitcoin,
  Circle,
  Coins,
  Sparkles,
  Activity,
  Zap
} from 'lucide-react';

interface TRSTData {
  tokenName: string;
  tokenSymbol: string;
  tokenPrice: number;
  maxSupply: number;
  softCap: number;
  hardCap: number;
  totalRaised: number;
  participants: number;
  acceptedTokens: Array<{
    symbol: string;
    name: string;
    icon: string;
  }>;
}

interface TokenSaleSummaryProps {
  icoData: TRSTData;
}

export default function TokenSaleSummary({ icoData }: TokenSaleSummaryProps) {
  const progressPercentage = (icoData.totalRaised / icoData.hardCap) * 100;
  const softCapPercentage = (icoData.softCap / icoData.hardCap) * 100;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-trusted-success';
    if (percentage >= 80) return 'bg-trusted-gold';
    if (percentage >= 50) return 'bg-trusted-warning';
    return 'bg-trusted-blue';
  };

  const getTokenIcon = (symbol: string) => {
    switch (symbol) {
      case 'ETH': return Circle;
      case 'BTC': return Bitcoin;
      case 'USDT': return DollarSign;
      default: return Coins;
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
      <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-trusted-gold to-yellow-500 rounded-lg">
            <Target className="h-5 w-5 text-trusted-navy" />
          </div>
          <span className="text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">Token Sale Summary</span>
          <Badge className="bg-gradient-to-r from-trusted-success to-green-500 text-white ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Progress Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold flex items-center space-x-2 text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">
              <Activity className="h-5 w-5 text-trusted-gold" />
              <span>Fundraising Progress</span>
            </h3>
            <Badge className="bg-gradient-to-r from-trusted-gold to-yellow-500 text-trusted-navy font-bold">
              {progressPercentage.toFixed(1)}% Complete
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">Raised: {formatCurrency(icoData.totalRaised)}</span>
              <span className="text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">Goal: {formatCurrency(icoData.hardCap)}</span>
            </div>
            
            <div className="relative">
              <Progress 
                value={progressPercentage} 
                className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
              />
              <div 
                className={`absolute top-0 left-0 h-4 rounded-full transition-all duration-1000 ease-out ${getProgressColor(progressPercentage)} shadow-lg`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
              
              {/* Soft Cap Marker */}
              <div 
                className="absolute top-0 h-4 w-1 bg-trusted-warning rounded-full shadow-lg"
                style={{ left: `${softCapPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-trusted-text-secondary dark:text-slate-400">
              <span className="drop-shadow-sm">Soft Cap: {formatCurrency(icoData.softCap)}</span>
              <span className="drop-shadow-sm">Hard Cap: {formatCurrency(icoData.hardCap)}</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-trusted-success/15 to-green-500/15 rounded-xl p-4 border border-trusted-success/30">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-trusted-success" />
              <span className="text-sm font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">Total Raised</span>
            </div>
            <div className="text-2xl font-bold text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">
              {formatCurrency(icoData.totalRaised)}
            </div>
            <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">
              of {formatCurrency(icoData.hardCap)} goal
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-trusted-blue/15 to-trusted-navy/15 rounded-xl p-4 border border-trusted-blue/30">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-4 w-4 text-trusted-blue" />
              <span className="text-sm font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">Participants</span>
            </div>
            <div className="text-2xl font-bold text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">
              {icoData.participants.toLocaleString()}
            </div>
            <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">
              active contributors
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-trusted-gold/15 to-yellow-500/15 rounded-xl p-4 border border-trusted-gold/30">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-4 w-4 text-trusted-gold" />
              <span className="text-sm font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">Token Price</span>
            </div>
            <div className="text-2xl font-bold text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">
              ${icoData.tokenPrice}
            </div>
            <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">
              per {icoData.tokenSymbol}
            </div>
          </div>
        </div>

        {/* Caps Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">Soft Cap</span>
              <Badge 
                variant={icoData.totalRaised >= icoData.softCap ? "default" : "secondary"}
                className={icoData.totalRaised >= icoData.softCap ? "bg-trusted-success" : "bg-trusted-warning"}
              >
                {icoData.totalRaised >= icoData.softCap ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <AlertCircle className="h-3 w-3 mr-1" />
                )}
                {icoData.totalRaised >= icoData.softCap ? "Reached" : "Pending"}
              </Badge>
            </div>
            <div className="text-lg font-semibold text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">{formatCurrency(icoData.softCap)}</div>
            <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">
              Minimum funding goal
            </div>
          </div>
          
          <div className="border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">Hard Cap</span>
              <Badge 
                variant={icoData.totalRaised >= icoData.hardCap ? "default" : "secondary"}
                className={icoData.totalRaised >= icoData.hardCap ? "bg-trusted-success" : "bg-trusted-blue"}
              >
                {icoData.totalRaised >= icoData.hardCap ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <Clock className="h-3 w-3 mr-1" />
                )}
                {icoData.totalRaised >= icoData.hardCap ? "Reached" : "In Progress"}
              </Badge>
            </div>
            <div className="text-lg font-semibold text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">{formatCurrency(icoData.hardCap)}</div>
            <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">
              Maximum funding goal
            </div>
          </div>
        </div>

        {/* Accepted Payment Methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2 text-trusted-text-primary dark:text-slate-100 drop-shadow-lg">
            <Zap className="h-5 w-5 text-trusted-gold" />
            <span>Accepted Payment Methods</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {icoData.acceptedTokens.map((token, index) => {
              const Icon = getTokenIcon(token.symbol);
              return (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-slate-200/60 dark:border-slate-700/60 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-gradient-to-r from-trusted-gold to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="h-5 w-5 text-trusted-navy" />
                  </div>
                  <div>
                    <div className="font-medium text-trusted-text-primary dark:text-slate-100 drop-shadow-sm">{token.symbol}</div>
                    <div className="text-xs text-trusted-text-secondary dark:text-slate-400 drop-shadow-sm">{token.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Token Supply Info */}
        <div className="bg-gradient-to-r from-trusted-navy to-trusted-blue rounded-xl p-6 text-white shadow-xl">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-trusted-gold/20 rounded-lg">
              <Target className="h-5 w-5 text-trusted-gold" />
            </div>
            <h3 className="text-lg font-semibold">Token Supply</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-trusted-gold drop-shadow-lg">
                {icoData.maxSupply.toLocaleString()}
              </div>
              <div className="text-sm text-slate-300 drop-shadow-sm">Total Supply</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-trusted-gold drop-shadow-lg">
                {Math.round((icoData.totalRaised / icoData.tokenPrice)).toLocaleString()}
              </div>
              <div className="text-sm text-slate-300 drop-shadow-sm">Tokens Sold</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 