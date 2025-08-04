import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { API } from '@/lib/api';
import { Asset } from '@/integrations/supabase/types';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  Calculator,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  BarChart3,
  Activity
} from 'lucide-react';

interface TradingPanelProps {
  className?: string;
}

export default function TradingPanel({ className }: TradingPanelProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop_loss' | 'take_profit' | 'stop_limit'>('market');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [timeInForce, setTimeInForce] = useState<'GTC' | 'IOC' | 'FOK'>('GTC');
  const [loading, setLoading] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    if (selectedAsset) {
      setCurrentPrice(selectedAsset.current_price || 0);
      setPriceChange(selectedAsset.price_change_24h || 0);
      setPrice(selectedAsset.current_price?.toString() || '');
    }
  }, [selectedAsset]);

  const fetchAssets = async () => {
    try {
      const data = await API.MarketData.getAssets();
      setAssets(data || []);
      if (data && data.length > 0) {
        setSelectedAsset(data[0]);
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAsset || !amount) return;

    setLoading(true);
    try {
      const orderData = {
        asset_id: selectedAsset.id,
        order_type: orderType,
        side: orderSide,
        amount: parseFloat(amount),
        price: price ? parseFloat(price) : undefined,
        stop_price: stopPrice ? parseFloat(stopPrice) : undefined,
        time_in_force: timeInForce,
      };

      await API.Trading.placeOrder(orderData);
      
      // Reset form
      setAmount('');
      setPrice('');
      setStopPrice('');
      
      console.log('Order placed successfully:', orderData);
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!amount || !price) return 0;
    return parseFloat(amount) * parseFloat(price);
  };

  const getPriceChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getPriceChangeIcon = (change: number) => {
    return change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />;
  };

  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Asset Selection and Price Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <span>Asset Selection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div>
              <Label className="text-xs sm:text-sm">Asset Type</Label>
              <Select 
                value={selectedAsset?.asset_type || ''} 
                onValueChange={(value) => {
                  const filtered = assets.filter(a => a.asset_type === value);
                  setSelectedAsset(filtered[0] || null);
                }}
              >
                <SelectTrigger className="h-10 sm:h-12">
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  <SelectItem value="stock">Stocks</SelectItem>
                  <SelectItem value="etf">ETFs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs sm:text-sm">Asset</Label>
              <Select 
                value={selectedAsset?.id || ''} 
                onValueChange={(value) => {
                  const asset = assets.find(a => a.id === value);
                  setSelectedAsset(asset || null);
                }}
              >
                <SelectTrigger className="h-10 sm:h-12">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  {assets
                    .filter(a => a.asset_type === selectedAsset?.asset_type)
                    .map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.symbol} - {asset.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {selectedAsset && (
              <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Current Price</span>
                  <Badge variant="outline" className="text-xs">
                    {selectedAsset.asset_type?.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                    ${currentPrice.toFixed(2)}
                  </span>
                  <div className={`flex items-center space-x-1 ${getPriceChangeColor(priceChange)}`}>
                    {getPriceChangeIcon(priceChange)}
                    <span className="text-xs sm:text-sm font-medium">
                      {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  24h Volume: ${selectedAsset.volume_24h?.toLocaleString() || '0'}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span>Place Order</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Order Side */}
            <div>
              <Label className="text-xs sm:text-sm">Order Side</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button
                  type="button"
                  variant={orderSide === 'buy' ? 'default' : 'outline'}
                  className={`h-10 sm:h-12 text-xs sm:text-sm ${
                    orderSide === 'buy' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                      : 'hover:bg-green-50 dark:hover:bg-green-950'
                  }`}
                  onClick={() => setOrderSide('buy')}
                >
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Buy
                </Button>
                <Button
                  type="button"
                  variant={orderSide === 'sell' ? 'default' : 'outline'}
                  className={`h-10 sm:h-12 text-xs sm:text-sm ${
                    orderSide === 'sell' 
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                      : 'hover:bg-red-50 dark:hover:bg-red-950'
                  }`}
                  onClick={() => setOrderSide('sell')}
                >
                  <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Sell
                </Button>
              </div>
            </div>

            {/* Order Type */}
            <div>
              <Label className="text-xs sm:text-sm">Order Type</Label>
              <Select value={orderType} onValueChange={(value: any) => setOrderType(value)}>
                <SelectTrigger className="h-10 sm:h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market</SelectItem>
                  <SelectItem value="limit">Limit</SelectItem>
                  <SelectItem value="stop_loss">Stop Loss</SelectItem>
                  <SelectItem value="take_profit">Take Profit</SelectItem>
                  <SelectItem value="stop_limit">Stop Limit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div>
              <Label className="text-xs sm:text-sm">Amount ({selectedAsset?.base_currency || 'USD'})</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-10 sm:h-12"
              />
            </div>

            {/* Price (for non-market orders) */}
            {orderType !== 'market' && (
              <div>
                <Label className="text-xs sm:text-sm">Price (USD)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-10 sm:h-12"
                />
              </div>
            )}

            {/* Stop Price (for stop orders) */}
            {(orderType === 'stop_loss' || orderType === 'stop_limit') && (
              <div>
                <Label className="text-xs sm:text-sm">Stop Price (USD)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={stopPrice}
                  onChange={(e) => setStopPrice(e.target.value)}
                  className="h-10 sm:h-12"
                />
              </div>
            )}

            {/* Time in Force */}
            <div>
              <Label className="text-xs sm:text-sm">Time in Force</Label>
              <Select value={timeInForce} onValueChange={(value: any) => setTimeInForce(value)}>
                <SelectTrigger className="h-10 sm:h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GTC">Good Till Cancelled (GTC)</SelectItem>
                  <SelectItem value="IOC">Immediate or Cancel (IOC)</SelectItem>
                  <SelectItem value="FOK">Fill or Kill (FOK)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Order Summary */}
            {amount && (
              <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Order Summary</span>
                  <Badge variant={orderSide === 'buy' ? 'default' : 'destructive'} className="text-xs">
                    {orderSide.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">{amount} {selectedAsset?.base_currency}</span>
                  </div>
                  {price && (
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-medium">${price}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium capitalize">{orderType.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Place Order Button */}
            <Button 
              onClick={handlePlaceOrder} 
              disabled={loading || !amount || !selectedAsset}
              className={`w-full h-10 sm:h-12 text-xs sm:text-sm ${
                orderSide === 'buy' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Place {orderSide.charAt(0).toUpperCase() + orderSide.slice(1)} Order</span>
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Order History Preview */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-slate-200 dark:border-slate-700">
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            <span>Recent Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-2 sm:space-y-3">
            {[
              { id: 1, symbol: 'BTCUSDT', side: 'buy', amount: '0.5', price: '43250', status: 'filled', time: '2 min ago' },
              { id: 2, symbol: 'ETHUSDT', side: 'sell', amount: '2.0', price: '2680', status: 'pending', time: '5 min ago' },
              { id: 3, symbol: 'AAPL', side: 'buy', amount: '10', price: '175.50', status: 'filled', time: '1 hour ago' },
            ].map((order) => (
              <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                    order.side === 'buy' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {order.side === 'buy' ? <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" /> : <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-100 text-sm sm:text-base truncate">{order.symbol}</p>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">{order.amount} @ ${order.price}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <Badge variant={order.status === 'filled' ? 'default' : 'secondary'} className="mb-1 text-xs">
                    {order.status}
                  </Badge>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}