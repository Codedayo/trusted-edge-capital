import { supabase } from '@/integrations/supabase/client';
import { Asset, Order, Portfolio, Holding, Transaction, Watchlist, WatchlistItem } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';

// Helper function to check if we're in demo mode
const isDemoMode = () => {
  return typeof window !== 'undefined' && localStorage.getItem('demoUser');
};

// Mock data for demo mode and fallback
const mockAssets: Asset[] = [
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    asset_type: 'crypto',
    current_price: 43250,
    price_change_24h: 2.5,
    volume_24h: 25000000000,
    market_cap: 850000000000,
    base_currency: 'BTC',
    quote_currency: 'USD',
    min_order_size: 0.001,
    max_order_size: 1000,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    asset_type: 'crypto',
    current_price: 2680,
    price_change_24h: -1.2,
    volume_24h: 15000000000,
    market_cap: 320000000000,
    base_currency: 'ETH',
    quote_currency: 'USD',
    min_order_size: 0.01,
    max_order_size: 10000,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether',
    asset_type: 'crypto',
    current_price: 1.00,
    price_change_24h: 0.1,
    volume_24h: 50000000000,
    market_cap: 95000000000,
    base_currency: 'USDT',
    quote_currency: 'USD',
    min_order_size: 1,
    max_order_size: 1000000,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'aapl',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    asset_type: 'stock',
    current_price: 175.50,
    price_change_24h: 1.8,
    volume_24h: 5000000000,
    market_cap: 2800000000000,
    base_currency: 'AAPL',
    quote_currency: 'USD',
    min_order_size: 1,
    max_order_size: 100000,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'tsla',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    asset_type: 'stock',
    current_price: 245.30,
    price_change_24h: -2.1,
    volume_24h: 8000000000,
    market_cap: 780000000000,
    base_currency: 'TSLA',
    quote_currency: 'USD',
    min_order_size: 1,
    max_order_size: 100000,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockPortfolios: Portfolio[] = [
  {
    id: 'demo-portfolio',
    user_id: 'demo-user-id',
    name: 'Main Portfolio',
    balance: 125430.50,
    available_balance: 15000.00,
    currency: 'USD',
    is_default: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockHoldings: Holding[] = [
  {
    id: 'holding-1',
    portfolio_id: 'demo-portfolio',
    asset_id: 'btc',
    quantity: 0.245,
    average_price: 42000,
    total_cost: 10290,
    current_value: 10596.25,
    unrealized_pnl: 306.25,
    asset: mockAssets[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'holding-2',
    portfolio_id: 'demo-portfolio',
    asset_id: 'eth',
    quantity: 1.85,
    average_price: 2600,
    total_cost: 4810,
    current_value: 4958,
    unrealized_pnl: 148,
    asset: mockAssets[1],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockOrders: Order[] = [
  {
    id: 'order-1',
    user_id: 'demo-user-id',
    asset_id: 'btc',
    order_type: 'market',
    side: 'buy',
    amount: 0.1,
    price: 43250,
    stop_price: null,
    time_in_force: 'GTC',
    status: 'filled',
    average_fill_price: 43250,
    filled_amount: 0.1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'order-2',
    user_id: 'demo-user-id',
    asset_id: 'eth',
    order_type: 'limit',
    side: 'sell',
    amount: 0.5,
    price: 2700,
    stop_price: null,
    time_in_force: 'GTC',
    status: 'pending',
    average_fill_price: null,
    filled_amount: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockWatchlists: Watchlist[] = [
  {
    id: 'watchlist-1',
    user_id: 'demo-user-id',
    name: 'My Watchlist',
    is_default: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Market Data API
export class MarketDataAPI {
  static async getAssets(assetType?: string): Promise<Asset[]> {
    try {
      // In demo mode, return mock data
      if (isDemoMode()) {
        let filteredAssets = mockAssets;
        if (assetType && assetType !== 'all') {
          filteredAssets = mockAssets.filter(asset => asset.asset_type === assetType);
        }
        return filteredAssets;
      }

      // Try Supabase if available
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching assets from Supabase:', error);
        // Return mock data if database is not set up
        let filteredAssets = mockAssets;
        if (assetType && assetType !== 'all') {
          filteredAssets = mockAssets.filter(asset => asset.asset_type === assetType);
        }
        return filteredAssets;
      }

      let filteredAssets = data || [];
      if (assetType && assetType !== 'all') {
        filteredAssets = filteredAssets.filter(asset => asset.asset_type === assetType);
      }
      return filteredAssets;
    } catch (error) {
      console.error('Error fetching assets:', error);
      // Return mock data as fallback
      let filteredAssets = mockAssets;
      if (assetType && assetType !== 'all') {
        filteredAssets = mockAssets.filter(asset => asset.asset_type === assetType);
      }
      return filteredAssets;
    }
  }

  static async getAssetPrice(assetId: string): Promise<number | null> {
    try {
      // In demo mode, return mock price
      if (isDemoMode()) {
        const asset = mockAssets.find(a => a.id === assetId);
        return asset?.current_price || null;
      }

      const { data, error } = await supabase
        .from('assets')
        .select('current_price')
        .eq('id', assetId)
        .single();

      if (error) throw error;
      return data?.current_price || null;
    } catch (error) {
      console.error('Error fetching asset price:', error);
      const asset = mockAssets.find(a => a.id === assetId);
      return asset?.current_price || null;
    }
  }
}

// Trading API
export class TradingAPI {
  static async placeOrder(orderData: any): Promise<Order> {
    try {
      // In demo mode, simulate order placement
      if (isDemoMode()) {
        const newOrder: Order = {
          id: `order-${Date.now()}`,
          user_id: 'demo-user-id',
          asset_id: orderData.asset_id,
          order_type: orderData.order_type,
          side: orderData.side,
          amount: orderData.amount,
          price: orderData.price,
          stop_price: orderData.stop_price,
          time_in_force: orderData.time_in_force,
          status: 'pending',
          average_fill_price: null,
          filled_amount: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        mockOrders.unshift(newOrder);
        return newOrder;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('orders')
        .insert([{
          ...orderData,
          user_id: user.id,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Order placed successfully",
        description: `${orderData.side.toUpperCase()} ${orderData.amount} ${orderData.asset_id}`,
      });

      return data;
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast({
        title: "Order failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  }

  static async getOrders(userId?: string): Promise<Order[]> {
    try {
      // In demo mode, return mock orders
      if (isDemoMode()) {
        return mockOrders;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('orders')
        .select('*, assets(symbol, base_currency, quote_currency)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return mockOrders;
    }
  }
}

// Portfolio API
export class PortfolioAPI {
  static async getPortfolios(): Promise<Portfolio[]> {
    try {
      // In demo mode, return mock data
      if (isDemoMode()) {
        return mockPortfolios;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      return mockPortfolios;
    }
  }

  static async getHoldings(): Promise<Holding[]> {
    try {
      // In demo mode, return mock data
      if (isDemoMode()) {
        return mockHoldings;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // First get user's portfolios
      const { data: portfolios, error: portfolioError } = await supabase
        .from('portfolios')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_default', true)
        .single();

      if (portfolioError) throw portfolioError;

      const { data, error } = await supabase
        .from('holdings')
        .select('*, assets(*)')
        .eq('portfolio_id', portfolios.id);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching holdings:', error);
      return mockHoldings;
    }
  }
}

// Transaction API
export class TransactionAPI {
  static async getTransactions(userId?: string): Promise<Transaction[]> {
    try {
      // In demo mode, return mock transactions
      if (isDemoMode()) {
        return [
          {
            id: 'tx-1',
            user_id: 'demo-user-id',
            type: 'deposit',
            asset_id: 'usdt',
            amount: 1000,
            status: 'completed',
            created_at: new Date().toISOString()
          },
          {
            id: 'tx-2',
            user_id: 'demo-user-id',
            type: 'trade',
            asset_id: 'btc',
            amount: 0.1,
            status: 'completed',
            created_at: new Date().toISOString()
          }
        ];
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }
}

// Watchlist API
export class WatchlistAPI {
  static async getWatchlists(): Promise<Watchlist[]> {
    try {
      // In demo mode, return mock watchlist
      if (isDemoMode()) {
        return mockWatchlists;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('watchlists')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching watchlists:', error);
      return mockWatchlists;
    }
  }

  static async addToWatchlist(watchlistId: string, assetId: string): Promise<void> {
    try {
      // In demo mode, just log the action
      if (isDemoMode()) {
        console.log(`Added ${assetId} to watchlist ${watchlistId}`);
        return;
      }

      const { error } = await supabase
        .from('watchlist_items')
        .insert([{ watchlist_id: watchlistId, asset_id: assetId }]);

      if (error) throw error;

      toast({
        title: "Added to watchlist",
        description: "Asset has been added to your watchlist",
      });
    } catch (error: any) {
      console.error('Error adding to watchlist:', error);
      toast({
        title: "Failed to add to watchlist",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  static async removeFromWatchlist(watchlistId: string, assetId: string): Promise<void> {
    try {
      // In demo mode, just log the action
      if (isDemoMode()) {
        console.log(`Removed ${assetId} from watchlist ${watchlistId}`);
        return;
      }

      const { error } = await supabase
        .from('watchlist_items')
        .delete()
        .eq('watchlist_id', watchlistId)
        .eq('asset_id', assetId);

      if (error) throw error;

      toast({
        title: "Removed from watchlist",
        description: "Asset has been removed from your watchlist",
      });
    } catch (error: any) {
      console.error('Error removing from watchlist:', error);
      toast({
        title: "Failed to remove from watchlist",
        description: error.message,
        variant: "destructive",
      });
    }
  }
}

// Price Update API
export class PriceUpdateAPI {
  private static interval: NodeJS.Timeout | null = null;
  private static subscribers: ((prices: any) => void)[] = [];

  static startPriceUpdates() {
    if (this.interval) return;

    this.interval = setInterval(() => {
      const prices = mockAssets.reduce((acc, asset) => {
        // Simulate price changes
        const change = (Math.random() - 0.5) * 0.02; // ±1% change
        const newPrice = asset.current_price * (1 + change);
        
        acc[asset.id] = {
          price: newPrice,
          change: change * 100,
          volume: asset.volume_24h
        };
        
        return acc;
      }, {} as any);

      this.subscribers.forEach(callback => callback(prices));
    }, 5000); // Update every 5 seconds
  }

  static stopPriceUpdates() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  static subscribe(callback: (prices: any) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }
}

// Export all APIs
export const API = {
  MarketData: MarketDataAPI,
  Trading: TradingAPI,
  Portfolio: PortfolioAPI,
  Transaction: TransactionAPI,
  Watchlist: WatchlistAPI,
  PriceUpdate: PriceUpdateAPI
}; 