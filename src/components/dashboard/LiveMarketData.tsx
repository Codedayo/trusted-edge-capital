import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Wifi, 
  WifiOff,
  RefreshCw,
  Bell,
  Star,
  StarOff,
  Zap,
  BarChart3,
  DollarSign,
  Clock,
  AlertTriangle,
  X
} from 'lucide-react';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  timestamp: string;
}

interface LiveMarketDataProps {
  className?: string;
}

export default function LiveMarketData({ className }: LiveMarketDataProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [selectedAsset, setSelectedAsset] = useState('BTCUSDT');
  const [watchlist, setWatchlist] = useState<string[]>(['BTCUSDT', 'ETHUSDT', 'AAPL', 'TSLA']);
  const [alerts, setAlerts] = useState<any[]>([]);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  // Simulate WebSocket connection
  useEffect(() => {
    setIsConnected(true);
    
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const mockData: MarketData[] = [
        {
          symbol: 'BTCUSDT',
          price: 45000 + Math.random() * 2000,
          change: Math.random() * 1000 - 500,
          changePercent: Math.random() * 10 - 5,
          volume: 1000000 + Math.random() * 500000,
          high: 47000,
          low: 44000,
          timestamp: new Date().toISOString()
        },
        {
          symbol: 'ETHUSDT',
          price: 2800 + Math.random() * 200,
          change: Math.random() * 100 - 50,
          changePercent: Math.random() * 5 - 2.5,
          volume: 500000 + Math.random() * 250000,
          high: 2900,
          low: 2700,
          timestamp: new Date().toISOString()
        },
        {
          symbol: 'AAPL',
          price: 175 + Math.random() * 10,
          change: Math.random() * 5 - 2.5,
          changePercent: Math.random() * 3 - 1.5,
          volume: 100000 + Math.random() * 50000,
          high: 180,
          low: 170,
          timestamp: new Date().toISOString()
        },
        {
          symbol: 'TSLA',
          price: 250 + Math.random() * 20,
          change: Math.random() * 10 - 5,
          changePercent: Math.random() * 4 - 2,
          volume: 200000 + Math.random() * 100000,
          high: 260,
          low: 240,
          timestamp: new Date().toISOString()
        }
      ];
      
      setMarketData(mockData);
    }, 2000);

    return () => {
      setIsConnected(false);
      clearInterval(interval);
    };
  }, []);

  // Initialize chart
  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        layout: {
          background: { color: 'transparent' },
          textColor: '#64748b',
        },
        grid: {
          vertLines: { color: '#e2e8f0' },
          horzLines: { color: '#e2e8f0' },
        },
        crosshair: {
          mode: 0,
        },
        rightPriceScale: {
          borderColor: '#e2e8f0',
        },
        timeScale: {
          borderColor: '#e2e8f0',
        },
      });

      const lineSeries = chart.addLineSeries({
        color: '#f59e0b',
        lineWidth: 2,
      });

      // Generate mock price data
      const data = Array.from({ length: 100 }, (_, i) => ({
        time: (Date.now() / 1000 - (100 - i) * 60) as any,
        value: 45000 + Math.sin(i * 0.1) * 1000 + Math.random() * 500,
      }));

      lineSeries.setData(data);
      chartRef.current = chart;
      seriesRef.current = lineSeries;

      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, []);

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const getPriceChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getPriceChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toString();
  };

  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {isConnected ? 'Live Data' : 'Connecting...'}
          </span>
          {isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          <RefreshCw className="h-3 w-3 mr-1" />
          Refresh
        </Button>
      </div>

      {/* Live Price Ticker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {marketData.map((asset) => (
          <Card key={asset.symbol} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                    {asset.symbol}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWatchlist(asset.symbol)}
                    className="h-6 w-6 p-0"
                  >
                    {watchlist.includes(asset.symbol) ? (
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    ) : (
                      <StarOff className="h-3 w-3 text-slate-400" />
                    )}
                  </Button>
                </div>
                <Badge variant="outline" className="text-xs">
                  {asset.symbol.includes('USDT') ? 'CRYPTO' : 'STOCK'}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(asset.price)}
                  </span>
                  <div className={`flex items-center space-x-1 ${getPriceChangeColor(asset.changePercent)}`}>
                    {getPriceChangeIcon(asset.changePercent)}
                    <span className="text-xs sm:text-sm font-medium">
                      {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Vol: {formatLargeNumber(asset.volume)}</span>
                  <span>H: {formatCurrency(asset.high)}</span>
                  <span>L: {formatCurrency(asset.low)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold" />
            <span>Live Price Chart - {selectedAsset}</span>
            <div className="flex items-center space-x-2 ml-auto">
              <Button variant="outline" size="sm" className="text-xs">
                <Bell className="h-3 w-3 mr-1" />
                Set Alert
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Full Screen
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={chartContainerRef} className="w-full h-80" />
        </CardContent>
      </Card>

      {/* Market Alerts */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold" />
            <span>Price Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-500 dark:text-slate-400">No price alerts set</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Create Alert
                </Button>
              </div>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {alert.symbol} {alert.condition} {formatCurrency(alert.price)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Created {new Date(alert.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={alert.active ? 'default' : 'secondary'} className="text-xs">
                      {alert.active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Market Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">24h Volume</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                  $2.4B
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Active Trades</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                  1,247
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Market Cap</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                  $1.2T
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 