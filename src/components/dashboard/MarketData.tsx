import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { API } from '@/lib/api';
import { Asset } from '@/integrations/supabase/types';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Star,
  StarOff,
  Globe,
  Filter,
  ArrowUpDown,
  DollarSign,
  BarChart3,
  Activity,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';

interface MarketDataProps {
  className?: string;
}

export default function MarketData({ className }: MarketDataProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [assetTypeFilter, setAssetTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('symbol');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    filterAndSortAssets();
  }, [assets, searchTerm, assetTypeFilter, sortBy, sortOrder]);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const data = await API.MarketData.getAssets();
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortAssets = () => {
    let filtered = assets;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(asset =>
        asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by asset type
    if (assetTypeFilter !== 'all') {
      filtered = filtered.filter(asset => asset.asset_type === assetTypeFilter);
    }

    // Sort assets
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'symbol':
          aValue = a.symbol;
          bValue = b.symbol;
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
        case 'market_cap':
          aValue = a.market_cap || 0;
          bValue = b.market_cap || 0;
          break;
        default:
          aValue = a.symbol;
          bValue = b.symbol;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredAssets(filtered);
  };

  const toggleWatchlist = (assetId: string) => {
    setWatchlist(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const getPriceChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getPriceChangeIcon = (change: number) => {
    return change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />;
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

  const getTopGainers = () => {
    return assets
      .filter(asset => asset.price_change_24h && asset.price_change_24h > 0)
      .sort((a, b) => (b.price_change_24h || 0) - (a.price_change_24h || 0))
      .slice(0, 3);
  };

  const getTopLosers = () => {
    return assets
      .filter(asset => asset.price_change_24h && asset.price_change_24h < 0)
      .sort((a, b) => (a.price_change_24h || 0) - (b.price_change_24h || 0))
      .slice(0, 3);
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                  <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Market Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Assets</p>
                <p className="text-2xl font-bold">{assets.length}</p>
              </div>
              <Globe className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Top Gainer</p>
                <p className="text-lg font-bold">{getTopGainers()[0]?.symbol || 'N/A'}</p>
                <p className="text-sm text-green-200">
                  +{getTopGainers()[0]?.price_change_24h?.toFixed(2) || '0'}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Top Loser</p>
                <p className="text-lg font-bold">{getTopLosers()[0]?.symbol || 'N/A'}</p>
                <p className="text-sm text-red-200">
                  {getTopLosers()[0]?.price_change_24h?.toFixed(2) || '0'}%
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-slate-200 dark:border-slate-700">
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Market Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={assetTypeFilter} onValueChange={setAssetTypeFilter}>
                <SelectTrigger className="w-32 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="stock">Stocks</SelectItem>
                  <SelectItem value="etf">ETFs</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="symbol">Symbol</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="change">24h Change</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="market_cap">Market Cap</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="h-12 px-3"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={fetchAssets}
                className="h-12 px-3"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Assets Table */}
          <div className="space-y-3">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-white">
                      {asset.symbol.slice(0, 2)}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {asset.symbol}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {asset.asset_type?.toUpperCase()}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWatchlist(asset.id)}
                        className="h-6 w-6 p-0"
                      >
                        {watchlist.includes(asset.id) ? (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        ) : (
                          <StarOff className="h-4 w-4 text-slate-400" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {asset.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(asset.current_price || 0)}
                    </p>
                    <div className={`flex items-center space-x-1 ${getPriceChangeColor(asset.price_change_24h || 0)}`}>
                      {getPriceChangeIcon(asset.price_change_24h || 0)}
                      <span className="text-sm font-medium">
                        {asset.price_change_24h && asset.price_change_24h >= 0 ? '+' : ''}
                        {(asset.price_change_24h || 0).toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="text-right hidden md:block">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Volume</p>
                    <p className="text-sm font-medium">
                      ${formatLargeNumber(asset.volume_24h || 0)}
                    </p>
                  </div>

                  <div className="text-right hidden lg:block">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Market Cap</p>
                    <p className="text-sm font-medium">
                      ${formatLargeNumber(asset.market_cap || 0)}
                    </p>
                  </div>

                  <Button variant="outline" size="sm" className="h-8">
                    Trade
                  </Button>
                </div>
              </div>
            ))}

            {filteredAssets.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">No assets found</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Top Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Top Gainers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {getTopGainers().map((asset, index) => (
                <div key={asset.id} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{asset.symbol}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(asset.current_price || 0)}
                    </p>
                    <p className="text-sm font-medium text-green-600">
                      +{(asset.price_change_24h || 0).toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <span>Top Losers</span>
            </CardTitle>
      </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {getTopLosers().map((asset, index) => (
                <div key={asset.id} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{asset.symbol}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(asset.current_price || 0)}
                    </p>
                    <p className="text-sm font-medium text-red-600">
                      {(asset.price_change_24h || 0).toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
      </CardContent>
    </Card>
      </div>
    </div>
  );
}