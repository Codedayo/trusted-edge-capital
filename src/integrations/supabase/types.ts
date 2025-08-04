export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          display_name: string | null;
          first_name: string | null;
          last_name: string | null;
          phone: string | null;
          date_of_birth: string | null;
          country: string | null;
          city: string | null;
          address: string | null;
          kyc_status: 'pending' | 'submitted' | 'approved' | 'rejected';
          kyc_level: number;
          is_verified: boolean;
          two_fa_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          country?: string | null;
          city?: string | null;
          address?: string | null;
          kyc_status?: 'pending' | 'submitted' | 'approved' | 'rejected';
          kyc_level?: number;
          is_verified?: boolean;
          two_fa_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          display_name?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          country?: string | null;
          city?: string | null;
          address?: string | null;
          kyc_status?: 'pending' | 'submitted' | 'approved' | 'rejected';
          kyc_level?: number;
          is_verified?: boolean;
          two_fa_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      wallets: {
        Row: {
          id: string;
          user_id: string;
          wallet_type: 'metamask' | 'coinbase' | 'walletconnect' | 'internal';
          wallet_address: string;
          is_primary: boolean;
          is_verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          wallet_type: 'metamask' | 'coinbase' | 'walletconnect' | 'internal';
          wallet_address: string;
          is_primary?: boolean;
          is_verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          wallet_type?: 'metamask' | 'coinbase' | 'walletconnect' | 'internal';
          wallet_address?: string;
          is_primary?: boolean;
          is_verified?: boolean;
          created_at?: string;
        };
      };
      assets: {
        Row: {
          id: string;
          symbol: string;
          name: string;
          asset_type: 'crypto' | 'stock' | 'etf' | 'commodity';
          base_currency: string;
          quote_currency: string;
          is_active: boolean;
          min_order_size: number | null;
          max_order_size: number | null;
          price_precision: number;
          quantity_precision: number;
          current_price: number | null;
          price_change_24h: number | null;
          volume_24h: number | null;
          market_cap: number | null;
          circulating_supply: number | null;
          total_supply: number | null;
          last_updated: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          symbol: string;
          name: string;
          asset_type: 'crypto' | 'stock' | 'etf' | 'commodity';
          base_currency: string;
          quote_currency: string;
          is_active?: boolean;
          min_order_size?: number | null;
          max_order_size?: number | null;
          price_precision?: number;
          quantity_precision?: number;
          current_price?: number | null;
          price_change_24h?: number | null;
          volume_24h?: number | null;
          market_cap?: number | null;
          circulating_supply?: number | null;
          total_supply?: number | null;
          last_updated?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          symbol?: string;
          name?: string;
          asset_type?: 'crypto' | 'stock' | 'etf' | 'commodity';
          base_currency?: string;
          quote_currency?: string;
          is_active?: boolean;
          min_order_size?: number | null;
          max_order_size?: number | null;
          price_precision?: number;
          quantity_precision?: number;
          current_price?: number | null;
          price_change_24h?: number | null;
          volume_24h?: number | null;
          market_cap?: number | null;
          circulating_supply?: number | null;
          total_supply?: number | null;
          last_updated?: string | null;
          created_at?: string;
        };
      };
      trading_pairs: {
        Row: {
          id: string;
          base_currency: string;
          quote_currency: string;
          symbol: string;
          is_active: boolean;
          min_order_size: number | null;
          max_order_size: number | null;
          price_precision: number;
          quantity_precision: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          base_currency: string;
          quote_currency: string;
          symbol: string;
          is_active?: boolean;
          min_order_size?: number | null;
          max_order_size?: number | null;
          price_precision?: number;
          quantity_precision?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          base_currency?: string;
          quote_currency?: string;
          symbol?: string;
          is_active?: boolean;
          min_order_size?: number | null;
          max_order_size?: number | null;
          price_precision?: number;
          quantity_precision?: number;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          asset_id: string | null;
          trading_pair_id: string | null;
          order_type: 'market' | 'limit' | 'stop_loss' | 'take_profit' | 'stop_limit';
          side: 'buy' | 'sell';
          amount: number;
          price: number | null;
          stop_price: number | null;
          filled_amount: number;
          average_fill_price: number | null;
          status: 'pending' | 'partially_filled' | 'filled' | 'cancelled' | 'rejected' | 'expired';
          time_in_force: 'GTC' | 'IOC' | 'FOK';
          created_at: string;
          updated_at: string;
          executed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          asset_id?: string | null;
          trading_pair_id?: string | null;
          order_type: 'market' | 'limit' | 'stop_loss' | 'take_profit' | 'stop_limit';
          side: 'buy' | 'sell';
          amount: number;
          price?: number | null;
          stop_price?: number | null;
          filled_amount?: number;
          average_fill_price?: number | null;
          status?: 'pending' | 'partially_filled' | 'filled' | 'cancelled' | 'rejected' | 'expired';
          time_in_force?: 'GTC' | 'IOC' | 'FOK';
          created_at?: string;
          updated_at?: string;
          executed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          asset_id?: string | null;
          trading_pair_id?: string | null;
          order_type?: 'market' | 'limit' | 'stop_loss' | 'take_profit' | 'stop_limit';
          side?: 'buy' | 'sell';
          amount?: number;
          price?: number | null;
          stop_price?: number | null;
          filled_amount?: number;
          average_fill_price?: number | null;
          status?: 'pending' | 'partially_filled' | 'filled' | 'cancelled' | 'rejected' | 'expired';
          time_in_force?: 'GTC' | 'IOC' | 'FOK';
          created_at?: string;
          updated_at?: string;
          executed_at?: string | null;
        };
      };
      portfolios: {
        Row: {
          id: string;
          user_id: string;
          currency: string;
          balance: number;
          available_balance: number;
          locked_balance: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          currency: string;
          balance?: number;
          available_balance?: number;
          locked_balance?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          currency?: string;
          balance?: number;
          available_balance?: number;
          locked_balance?: number;
          updated_at?: string;
        };
      };
      holdings: {
        Row: {
          id: string;
          user_id: string;
          asset_id: string;
          quantity: number;
          average_cost: number;
          total_cost: number;
          current_value: number;
          unrealized_pnl: number;
          realized_pnl: number;
          last_updated: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          asset_id: string;
          quantity?: number;
          average_cost?: number;
          total_cost?: number;
          current_value?: number;
          unrealized_pnl?: number;
          realized_pnl?: number;
          last_updated?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          asset_id?: string;
          quantity?: number;
          average_cost?: number;
          total_cost?: number;
          current_value?: number;
          unrealized_pnl?: number;
          realized_pnl?: number;
          last_updated?: string | null;
          created_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          asset_id: string | null;
          transaction_type: 'buy' | 'sell' | 'deposit' | 'withdrawal' | 'transfer' | 'dividend' | 'interest';
          quantity: number;
          price: number | null;
          total_amount: number;
          fee: number;
          reference_id: string | null;
          status: 'pending' | 'completed' | 'failed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          asset_id?: string | null;
          transaction_type: 'buy' | 'sell' | 'deposit' | 'withdrawal' | 'transfer' | 'dividend' | 'interest';
          quantity: number;
          price?: number | null;
          total_amount: number;
          fee?: number;
          reference_id?: string | null;
          status?: 'pending' | 'completed' | 'failed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          asset_id?: string | null;
          transaction_type?: 'buy' | 'sell' | 'deposit' | 'withdrawal' | 'transfer' | 'dividend' | 'interest';
          quantity?: number;
          price?: number | null;
          total_amount?: number;
          fee?: number;
          reference_id?: string | null;
          status?: 'pending' | 'completed' | 'failed' | 'cancelled';
          created_at?: string;
        };
      };
      watchlists: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          is_default?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          is_default?: boolean;
          created_at?: string;
        };
      };
      watchlist_items: {
        Row: {
          id: string;
          watchlist_id: string;
          asset_id: string;
          added_at: string;
        };
        Insert: {
          id?: string;
          watchlist_id: string;
          asset_id: string;
          added_at?: string;
        };
        Update: {
          id?: string;
          watchlist_id?: string;
          asset_id?: string;
          added_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Extended types for better type safety
export type Asset = Database['public']['Tables']['assets']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type Portfolio = Database['public']['Tables']['portfolios']['Row'];
export type Holding = Database['public']['Tables']['holdings']['Row'];
export type Transaction = Database['public']['Tables']['transactions']['Row'];
export type Watchlist = Database['public']['Tables']['watchlists']['Row'];
export type WatchlistItem = Database['public']['Tables']['watchlist_items']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Wallet = Database['public']['Tables']['wallets']['Row'];

// Extended types with relations
export interface AssetWithPrice extends Asset {
  current_price: number;
  price_change_24h: number;
  volume_24h: number;
}

export interface HoldingWithAsset extends Holding {
  assets: Asset;
}

export interface OrderWithAsset extends Order {
  assets: Asset;
}

export interface TransactionWithAsset extends Transaction {
  assets: Asset | null;
}

export interface WatchlistWithItems extends Watchlist {
  watchlist_items: (WatchlistItem & {
    assets: Asset;
  })[];
}
