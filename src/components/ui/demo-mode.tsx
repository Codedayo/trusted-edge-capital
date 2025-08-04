import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  TrendingUp,
  BarChart3,
  Wallet,
  Settings,
  Info,
  X
} from 'lucide-react';

interface DemoModeProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
}

interface DemoData {
  balance: number;
  portfolio: any[];
  trades: any[];
  performance: number;
}

export default function DemoMode({ isActive, onToggle, onReset }: DemoModeProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [demoData, setDemoData] = useState<DemoData>({
    balance: 100000,
    portfolio: [],
    trades: [],
    performance: 0
  });

  const resetDemoData = () => {
    setDemoData({
      balance: 100000,
      portfolio: [],
      trades: [],
      performance: 0
    });
    onReset();
  };

  const simulateTrade = () => {
    const newTrade = {
      id: Date.now(),
      symbol: 'BTCUSDT',
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      amount: Math.random() * 1000,
      price: 45000 + Math.random() * 5000,
      timestamp: new Date().toISOString()
    };

    setDemoData(prev => ({
      ...prev,
      trades: [newTrade, ...prev.trades.slice(0, 9)],
      balance: prev.balance + (newTrade.side === 'buy' ? -newTrade.amount * newTrade.price : newTrade.amount * newTrade.price),
      performance: prev.performance + (Math.random() - 0.5) * 2
    }));
  };

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        simulateTrade();
      }, 5000); // Simulate trade every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <>
      {/* Demo Mode Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span className="text-sm font-medium">Demo Mode</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                $100K
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Controls */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-white dark:bg-slate-800 shadow-lg"
              >
                <Info className="h-4 w-4 mr-2" />
                Demo Info
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <span>Demo Mode Information</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                    What is Demo Mode?
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Demo mode allows you to test the platform with virtual funds. 
                    All trades and transactions are simulated and do not involve real money.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Starting Balance:</span>
                    <span className="font-medium">$100,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Current Balance:</span>
                    <span className="font-medium">${demoData.balance.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Performance:</span>
                    <span className={`font-medium ${demoData.performance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {demoData.performance >= 0 ? '+' : ''}{demoData.performance.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Total Trades:</span>
                    <span className="font-medium">{demoData.trades.length}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={resetDemoData}
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Demo
                  </Button>
                  <Button
                    onClick={onToggle}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Exit Demo
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            onClick={simulateTrade}
            className="bg-white dark:bg-slate-800 shadow-lg"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Simulate Trade
          </Button>
        </div>
      </div>

      {/* Demo Data Display */}
      {isActive && (
        <div className="fixed top-20 right-4 z-40">
          <Card className="w-80 bg-white dark:bg-slate-800 shadow-lg border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Demo Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-500 mx-auto mb-1" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">Balance</p>
                  <p className="font-semibold">${demoData.balance.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">Performance</p>
                  <p className={`font-semibold ${demoData.performance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {demoData.performance >= 0 ? '+' : ''}{demoData.performance.toFixed(2)}%
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Recent Trades:</p>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {demoData.trades.slice(0, 3).map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between text-xs p-2 bg-slate-50 dark:bg-slate-700 rounded">
                      <div>
                        <span className="font-medium">{trade.symbol}</span>
                        <span className={`ml-2 px-1 py-0.5 rounded text-xs ${
                          trade.side === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {trade.side.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-slate-500">${trade.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
} 