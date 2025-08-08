import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  RefreshCw,
  Star,
  StarOff,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { websocketService } from '@/lib/websocket';
import { Asset } from '@/integrations/supabase/types';
import { MarketDataAPI } from '@/lib/api';

interface LiveMarketDataProps {
  className?: string;
}

interface MarketDataItem extends Asset {
  priceChange: number;
  priceChangePercent: number;
  volume24h: number;
  marketCap: number;
  isFavorite: boolean;
  lastUpdate: Date;
}

export default function LiveMarketData({ className }: LiveMarketDataProps) {
  const [marketData, setMarketData] = useState<MarketDataItem[]>([]);
  const [filteredData, setFilteredData] = useState<MarketDataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change' | 'volume' | 'marketCap'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterType, setFilterType] = useState<'all' | 'crypto' | 'stock'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  // Memoized sorted and filtered data
  const sortedAndFilteredData = useMemo(() => {
    let data = [...marketData];

    // Apply search filter
    if (searchTerm) {
      data = data.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      data = data.filter(item => item.asset_type === filterType);
    }

    // Apply sorting
    data.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.current_price || 0;
          bValue = b.current_price || 0;
          break;
        case 'change':
          aValue = a.price_change_24h || 0;
          bValue = b.price_change_24h || 0;
          break;
        case 'volume':
          aValue = a.volume_24h || 0;
          bValue = b.volume_24h || 0;
          break;
        case 'marketCap':
          aValue = a.market_cap || 0;
          bValue = b.market_cap || 0;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return data;
  }, [marketData, searchTerm, filterType, sortBy, sortOrder]);

  useEffect(() => {
    loadInitialData();
    setupWebSocket();
  }, []);

  useEffect(() => {
    setFilteredData(sortedAndFilteredData);
  }, [sortedAndFilteredData]);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      const assets = await MarketDataAPI.getAssets();
      
      const marketDataItems: MarketDataItem[] = assets.map(asset => ({
        ...asset,
        priceChange: asset.price_change_24h || 0,
        priceChangePercent: asset.price_change_24h || 0,
        volume24h: asset.volume_24h || 0,
        marketCap: asset.market_cap || 0,
        isFavorite: false, // In real app, get from user preferences
        lastUpdate: new Date()
      }));

      setMarketData(marketDataItems);
    } catch (error) {
      console.error('Failed to load market data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupWebSocket = () => {
    // Subscribe to price updates for major assets
    const majorAssets = ['BTC', 'ETH', 'USDT', 'AAPL', 'TSLA'];
    
    majorAssets.forEach(symbol => {
      const unsubscribe = websocketService.subscribe('price', symbol, (data) => {
        setMarketData(prev => prev.map(item => {
          if (item.symbol === symbol) {
            return {
              ...item,
              current_price: data.price,
              price_change_24h: data.change24h,
              volume_24h: data.volume24h,
              lastUpdate: new Date()
            };
          }
          return item;
        }));
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    });

    // Monitor connection status
    const checkConnection = () => {
      const status = websocketService.getConnectionStatus();
      setConnectionStatus(status ? 'connected' : 'disconnected');
    };

    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  };

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const toggleFavorite = (symbol: string) => {
    setMarketData(prev => prev.map(item => 
      item.symbol === symbol 
        ? { ...item, isFavorite: !item.isFavorite }
        : item
    ));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else if (volume >= 1e3) {
      return `$${(volume / 1e3).toFixed(2)}K`;
    }
    return `$${volume.toFixed(2)}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toFixed(2)}`;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-slate-600 dark:text-slate-400';
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-green-600 dark:text-green-400';
      case 'connecting':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'disconnected':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg font-semibold">Live Market Data</CardTitle>
            <Badge 
              variant="outline" 
              className={`text-xs ${getConnectionStatusColor()}`}
            >
              {connectionStatus}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadInitialData}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('all')}
            >
              All
            </Button>
            <Button
              variant={filterType === 'crypto' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('crypto')}
            >
              Crypto
            </Button>
            <Button
              variant={filterType === 'stock' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('stock')}
            >
              Stocks
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="space-y-2">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 pb-2 border-b">
              <div className="col-span-3">Asset</div>
              <div className="col-span-2 text-right cursor-pointer" onClick={() => handleSort('price')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>Price</span>
                  {sortBy === 'price' && (
                    sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                  )}
                </div>
              </div>
              <div className="col-span-2 text-right cursor-pointer" onClick={() => handleSort('change')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>24h Change</span>
                  {sortBy === 'change' && (
                    sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                  )}
                </div>
              </div>
              <div className="col-span-2 text-right cursor-pointer" onClick={() => handleSort('volume')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>Volume</span>
                  {sortBy === 'volume' && (
                    sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                  )}
                </div>
              </div>
              <div className="col-span-2 text-right cursor-pointer" onClick={() => handleSort('marketCap')}>
                <div className="flex items-center justify-end space-x-1">
                  <span>Market Cap</span>
                  {sortBy === 'marketCap' && (
                    sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                  )}
                </div>
              </div>
              <div className="col-span-1 text-center">Fav</div>
            </div>

            {/* Market Data Rows */}
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {filteredData.map((item) => (
                <div
                  key={item.symbol}
                  className="grid grid-cols-12 gap-2 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <div className="col-span-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs font-medium">
                        {item.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.symbol}</div>
                        <div className="text-xs text-slate-500">{item.name}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-right">
                    <div className="font-medium">{formatPrice(item.current_price || 0)}</div>
                  </div>
                  
                  <div className="col-span-2 text-right">
                    <div className={`flex items-center justify-end space-x-1 ${getChangeColor(item.price_change_24h || 0)}`}>
                      {item.price_change_24h > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : item.price_change_24h < 0 ? (
                        <TrendingDown className="h-3 w-3" />
                      ) : null}
                      <span className="font-medium">
                        {item.price_change_24h > 0 ? '+' : ''}{item.price_change_24h?.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-right">
                    <div className="text-sm">{formatVolume(item.volume24h)}</div>
                  </div>
                  
                  <div className="col-span-2 text-right">
                    <div className="text-sm">{formatMarketCap(item.marketCap)}</div>
                  </div>
                  
                  <div className="col-span-1 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(item.symbol)}
                      className="h-6 w-6 p-0"
                    >
                      {item.isFavorite ? (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      ) : (
                        <StarOff className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                No assets found matching your criteria.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 