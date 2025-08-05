import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  TrendingUp,
  Users,
  Zap,
  Shield,
  CheckCircle,
  AlertCircle,
  Lock,
  Unlock,
  Sparkles,
  Activity,
  Target,
  Coins
} from 'lucide-react';

export default function VestingSchedule() {
  const vestingSchedules = [
    {
      category: 'Public Sale',
      totalTokens: 40000000,
      unlockedTokens: 40000000,
      vestingPeriod: 'Immediate',
      status: 'completed',
      description: 'No vesting period - tokens available immediately',
      icon: Unlock,
      color: 'bg-trusted-success'
    },
    {
      category: 'Team & Advisors',
      totalTokens: 15000000,
      unlockedTokens: 3750000, // 25% after 6 months
      vestingPeriod: '24 months',
      status: 'active',
      description: 'Linear vesting over 24 months with 6-month cliff',
      icon: Users,
      color: 'bg-trusted-blue'
    },
    {
      category: 'Development',
      totalTokens: 20000000,
      unlockedTokens: 10000000, // 50% after 12 months
      vestingPeriod: '12 months',
      status: 'active',
      description: 'Linear vesting over 12 months',
      icon: Zap,
      color: 'bg-trusted-success'
    },
    {
      category: 'Marketing',
      totalTokens: 10000000,
      unlockedTokens: 5000000, // 50% after 12 months
      vestingPeriod: '12 months',
      status: 'active',
      description: 'Linear vesting over 12 months',
      icon: TrendingUp,
      color: 'bg-trusted-warning'
    },
    {
      category: 'Reserve',
      totalTokens: 10000000,
      unlockedTokens: 0,
      vestingPeriod: 'TBD',
      status: 'locked',
      description: 'Reserved for future initiatives',
      icon: Shield,
      color: 'bg-trusted-navy'
    },
    {
      category: 'Partnerships',
      totalTokens: 5000000,
      unlockedTokens: 0,
      vestingPeriod: 'TBD',
      status: 'locked',
      description: 'Strategic partnership allocations',
      icon: Users,
      color: 'bg-trusted-error'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-trusted-success" />;
      case 'active':
        return <Clock className="h-4 w-4 text-trusted-warning" />;
      case 'locked':
        return <Lock className="h-4 w-4 text-trusted-text-secondary dark:text-slate-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-trusted-error" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-trusted-success">Completed</Badge>;
      case 'active':
        return <Badge className="bg-trusted-warning">Active</Badge>;
      case 'locked':
        return <Badge className="bg-trusted-navy">Locked</Badge>;
      default:
        return <Badge className="bg-trusted-error">Unknown</Badge>;
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const calculateProgress = (unlocked: number, total: number) => {
    return (unlocked / total) * 100;
  };

  return (
    <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
      <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-trusted-gold to-yellow-500 rounded-lg">
            <Calendar className="h-5 w-5 text-trusted-navy" />
          </div>
          <span className="text-trusted-text-primary dark:text-slate-100">Vesting Schedule</span>
          <Badge className="bg-gradient-to-r from-trusted-success to-green-500 text-white ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Overview */}
        <div className="bg-gradient-to-r from-trusted-navy to-trusted-blue rounded-xl p-6 text-white shadow-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Activity className="h-5 w-5 text-trusted-gold" />
            <span>Vesting Overview</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-trusted-gold">
                {vestingSchedules.reduce((sum, schedule) => sum + schedule.unlockedTokens, 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-300">Tokens Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-trusted-gold">
                {vestingSchedules.reduce((sum, schedule) => sum + schedule.totalTokens, 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-300">Total Supply</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-trusted-gold">
                {Math.round((vestingSchedules.reduce((sum, schedule) => sum + schedule.unlockedTokens, 0) / 
                  vestingSchedules.reduce((sum, schedule) => sum + schedule.totalTokens, 0)) * 100)}%
              </div>
              <div className="text-sm text-slate-300">Unlock Progress</div>
            </div>
          </div>
        </div>

        {/* Vesting Schedules */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2 text-trusted-text-primary dark:text-slate-100">
            <Target className="h-5 w-5 text-trusted-gold" />
            <span>Detailed Schedule</span>
          </h3>
          <div className="space-y-4">
            {vestingSchedules.map((schedule, index) => {
              const Icon = schedule.icon;
              const progress = calculateProgress(schedule.unlockedTokens, schedule.totalTokens);
              
              return (
                <div key={index} className="border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${schedule.color} shadow-lg`}></div>
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-trusted-text-secondary dark:text-slate-400" />
                        <span className="font-medium text-trusted-text-primary dark:text-slate-100">{schedule.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(schedule.status)}
                      {getStatusBadge(schedule.status)}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-sm text-trusted-text-secondary dark:text-slate-400">
                      {schedule.description}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-trusted-text-secondary dark:text-slate-400">Total Tokens</div>
                        <div className="font-semibold text-trusted-text-primary dark:text-slate-100">{formatNumber(schedule.totalTokens)} TRST</div>
                      </div>
                      <div>
                        <div className="text-trusted-text-secondary dark:text-slate-400">Unlocked</div>
                        <div className="font-semibold text-trusted-text-primary dark:text-slate-100">{formatNumber(schedule.unlockedTokens)} TRST</div>
                      </div>
                      <div>
                        <div className="text-trusted-text-secondary dark:text-slate-400">Vesting Period</div>
                        <div className="font-semibold text-trusted-text-primary dark:text-slate-100">{schedule.vestingPeriod}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-trusted-text-secondary dark:text-slate-400">Unlock Progress</span>
                        <span className="font-medium text-trusted-text-primary dark:text-slate-100">{progress.toFixed(1)}%</span>
                      </div>
                      <Progress 
                        value={progress} 
                        className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2 text-trusted-text-primary dark:text-slate-100">
            <Clock className="h-5 w-5 text-trusted-gold" />
            <span>Unlock Timeline</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-trusted-success/15 to-green-500/15 border border-trusted-success/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-trusted-success/20 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-trusted-success" />
                </div>
                <div>
                  <div className="font-medium text-trusted-text-primary dark:text-slate-100">ICO Launch</div>
                  <div className="text-sm text-trusted-text-secondary dark:text-slate-400">Public sale tokens unlocked</div>
                </div>
              </div>
              <Badge className="bg-trusted-success">Completed</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-trusted-warning/15 to-orange-500/15 border border-trusted-warning/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-trusted-warning/20 rounded-lg">
                  <Clock className="h-4 w-4 text-trusted-warning" />
                </div>
                <div>
                  <div className="font-medium text-trusted-text-primary dark:text-slate-100">6 Months Post-ICO</div>
                  <div className="text-sm text-trusted-text-secondary dark:text-slate-400">Team & advisors cliff ends</div>
                </div>
              </div>
              <Badge className="bg-trusted-warning">In Progress</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-200/50 dark:bg-slate-700/50 rounded-lg">
                  <Lock className="h-4 w-4 text-trusted-text-secondary dark:text-slate-400" />
                </div>
                <div>
                  <div className="font-medium text-trusted-text-primary dark:text-slate-100">12 Months Post-ICO</div>
                  <div className="text-sm text-trusted-text-secondary dark:text-slate-400">Development & marketing vesting</div>
                </div>
              </div>
              <Badge className="bg-trusted-navy">Upcoming</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-200/50 dark:bg-slate-700/50 rounded-lg">
                  <Lock className="h-4 w-4 text-trusted-text-secondary dark:text-slate-400" />
                </div>
                <div>
                  <div className="font-medium text-trusted-text-primary dark:text-slate-100">24 Months Post-ICO</div>
                  <div className="text-sm text-trusted-text-secondary dark:text-slate-400">Team & advisors fully vested</div>
                </div>
              </div>
              <Badge className="bg-trusted-navy">Upcoming</Badge>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-trusted-warning/15 to-orange-500/15 border border-trusted-warning/30 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-trusted-warning mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium text-trusted-warning mb-2">Important Notes</div>
              <ul className="space-y-1 text-trusted-text-secondary dark:text-slate-400">
                <li>• Public sale tokens are immediately available after purchase</li>
                <li>• Team tokens have a 6-month cliff followed by linear vesting</li>
                <li>• Development and marketing tokens vest linearly over 12 months</li>
                <li>• Reserve and partnership tokens are locked until further notice</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 