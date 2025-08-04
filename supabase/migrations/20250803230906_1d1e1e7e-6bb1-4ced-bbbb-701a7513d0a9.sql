-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  country TEXT,
  city TEXT,
  address TEXT,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'submitted', 'approved', 'rejected')),
  kyc_level INTEGER DEFAULT 0 CHECK (kyc_level BETWEEN 0 AND 3),
  is_verified BOOLEAN DEFAULT false,
  two_fa_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create wallets table for user crypto wallets
CREATE TABLE public.wallets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  wallet_type TEXT NOT NULL CHECK (wallet_type IN ('metamask', 'coinbase', 'walletconnect', 'internal')),
  wallet_address TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for wallets
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Create policies for wallets
CREATE POLICY "Users can view their own wallets" 
ON public.wallets 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own wallets" 
ON public.wallets 
FOR ALL 
USING (auth.uid() = user_id);

-- Create assets table for both crypto and stocks
CREATE TABLE public.assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('crypto', 'stock', 'etf', 'commodity')),
  base_currency TEXT NOT NULL,
  quote_currency TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  min_order_size DECIMAL(20, 8),
  max_order_size DECIMAL(20, 8),
  price_precision INTEGER DEFAULT 8,
  quantity_precision INTEGER DEFAULT 8,
  current_price DECIMAL(20, 8),
  price_change_24h DECIMAL(10, 4),
  volume_24h DECIMAL(20, 2),
  market_cap DECIMAL(20, 2),
  circulating_supply DECIMAL(20, 8),
  total_supply DECIMAL(20, 8),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for assets (public read access)
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active assets" 
ON public.assets 
FOR SELECT 
USING (is_active = true);

-- Create trading_pairs table (deprecated, use assets instead)
CREATE TABLE public.trading_pairs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  base_currency TEXT NOT NULL,
  quote_currency TEXT NOT NULL,
  symbol TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  min_order_size DECIMAL(20, 8),
  max_order_size DECIMAL(20, 8),
  price_precision INTEGER DEFAULT 8,
  quantity_precision INTEGER DEFAULT 8,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for trading_pairs (public read access)
ALTER TABLE public.trading_pairs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active trading pairs" 
ON public.trading_pairs 
FOR SELECT 
USING (is_active = true);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  asset_id UUID REFERENCES public.assets(id),
  trading_pair_id UUID REFERENCES public.trading_pairs(id),
  order_type TEXT NOT NULL CHECK (order_type IN ('market', 'limit', 'stop_loss', 'take_profit', 'stop_limit')),
  side TEXT NOT NULL CHECK (side IN ('buy', 'sell')),
  amount DECIMAL(20, 8) NOT NULL,
  price DECIMAL(20, 8),
  stop_price DECIMAL(20, 8),
  filled_amount DECIMAL(20, 8) DEFAULT 0,
  average_fill_price DECIMAL(20, 8),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'partially_filled', 'filled', 'cancelled', 'rejected', 'expired')),
  time_in_force TEXT DEFAULT 'GTC' CHECK (time_in_force IN ('GTC', 'IOC', 'FOK')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  executed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" 
ON public.orders 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create portfolios table
CREATE TABLE public.portfolios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  currency TEXT NOT NULL,
  balance DECIMAL(20, 8) DEFAULT 0,
  available_balance DECIMAL(20, 8) DEFAULT 0,
  locked_balance DECIMAL(20, 8) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for portfolios
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolios
CREATE POLICY "Users can view their own portfolio" 
ON public.portfolios 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create unique constraint for user_id and currency
CREATE UNIQUE INDEX idx_portfolios_user_currency ON public.portfolios(user_id, currency);

-- Create holdings table for asset positions
CREATE TABLE public.holdings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  asset_id UUID NOT NULL REFERENCES public.assets(id),
  quantity DECIMAL(20, 8) NOT NULL DEFAULT 0,
  average_cost DECIMAL(20, 8) NOT NULL DEFAULT 0,
  total_cost DECIMAL(20, 8) NOT NULL DEFAULT 0,
  current_value DECIMAL(20, 8) NOT NULL DEFAULT 0,
  unrealized_pnl DECIMAL(20, 8) NOT NULL DEFAULT 0,
  realized_pnl DECIMAL(20, 8) NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for holdings
ALTER TABLE public.holdings ENABLE ROW LEVEL SECURITY;

-- Create policies for holdings
CREATE POLICY "Users can view their own holdings" 
ON public.holdings 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create unique constraint for user_id and asset_id
CREATE UNIQUE INDEX idx_holdings_user_asset ON public.holdings(user_id, asset_id);

-- Create transactions table for detailed transaction history
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  asset_id UUID REFERENCES public.assets(id),
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('buy', 'sell', 'deposit', 'withdrawal', 'transfer', 'dividend', 'interest')),
  quantity DECIMAL(20, 8) NOT NULL,
  price DECIMAL(20, 8),
  total_amount DECIMAL(20, 8) NOT NULL,
  fee DECIMAL(20, 8) DEFAULT 0,
  reference_id TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for transactions
CREATE POLICY "Users can view their own transactions" 
ON public.transactions 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create watchlists table
CREATE TABLE public.watchlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for watchlists
ALTER TABLE public.watchlists ENABLE ROW LEVEL SECURITY;

-- Create policies for watchlists
CREATE POLICY "Users can manage their own watchlists" 
ON public.watchlists 
FOR ALL 
USING (auth.uid() = user_id);

-- Create watchlist_items table
CREATE TABLE public.watchlist_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  watchlist_id UUID NOT NULL REFERENCES public.watchlists(id) ON DELETE CASCADE,
  asset_id UUID NOT NULL REFERENCES public.assets(id),
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for watchlist_items
ALTER TABLE public.watchlist_items ENABLE ROW LEVEL SECURITY;

-- Create policies for watchlist_items
CREATE POLICY "Users can manage their own watchlist items" 
ON public.watchlist_items 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.watchlists 
    WHERE watchlists.id = watchlist_items.watchlist_id 
    AND watchlists.user_id = auth.uid()
  )
);

-- Create unique constraint for watchlist and asset
CREATE UNIQUE INDEX idx_watchlist_items_unique ON public.watchlist_items(watchlist_id, asset_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON public.portfolios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default assets (crypto)
INSERT INTO public.assets (symbol, name, asset_type, base_currency, quote_currency, min_order_size, max_order_size, current_price, price_change_24h, volume_24h, market_cap, circulating_supply, total_supply) VALUES
('BTCUSDT', 'Bitcoin', 'crypto', 'BTC', 'USDT', 0.00001, 100, 43250.50, 2.45, 28450000000, 850000000000, 19600000, 21000000),
('ETHUSDT', 'Ethereum', 'crypto', 'ETH', 'USDT', 0.001, 1000, 2680.75, -1.23, 15750000000, 320000000000, 120000000, 120000000),
('ADAUSDT', 'Cardano', 'crypto', 'ADA', 'USDT', 1, 1000000, 0.485, 5.67, 890000000, 17000000000, 35000000000, 45000000000),
('SOLUSDT', 'Solana', 'crypto', 'SOL', 'USDT', 0.01, 10000, 98.45, 3.21, 2340000000, 45000000000, 450000000, 535000000),
('MATICUSDT', 'Polygon', 'crypto', 'MATIC', 'USDT', 1, 1000000, 0.875, -2.45, 567000000, 8500000000, 10000000000, 10000000000),
('DOTUSDT', 'Polkadot', 'crypto', 'DOT', 'USDT', 0.1, 100000, 7.25, 1.85, 890000000, 9500000000, 1300000000, 1300000000),
('LINKUSDT', 'Chainlink', 'crypto', 'LINK', 'USDT', 0.1, 100000, 15.80, -0.95, 1200000000, 9200000000, 580000000, 1000000000),
('UNIUSDT', 'Uniswap', 'crypto', 'UNI', 'USDT', 0.1, 100000, 8.45, 2.15, 450000000, 5100000000, 600000000, 1000000000);

-- Insert default assets (stocks)
INSERT INTO public.assets (symbol, name, asset_type, base_currency, quote_currency, min_order_size, max_order_size, current_price, price_change_24h, volume_24h, market_cap) VALUES
('AAPL', 'Apple Inc.', 'stock', 'AAPL', 'USD', 1, 1000000, 175.50, 1.25, 45000000000, 2750000000000),
('MSFT', 'Microsoft Corporation', 'stock', 'MSFT', 'USD', 1, 1000000, 340.25, 0.85, 38000000000, 2530000000000),
('GOOGL', 'Alphabet Inc.', 'stock', 'GOOGL', 'USD', 1, 1000000, 142.80, -0.45, 25000000000, 1800000000000),
('AMZN', 'Amazon.com Inc.', 'stock', 'AMZN', 'USD', 1, 1000000, 145.20, 2.15, 35000000000, 1500000000000),
('TSLA', 'Tesla Inc.', 'stock', 'TSLA', 'USD', 1, 1000000, 245.75, -1.85, 28000000000, 780000000000),
('NVDA', 'NVIDIA Corporation', 'stock', 'NVDA', 'USD', 1, 1000000, 485.30, 3.45, 42000000000, 1200000000000),
('META', 'Meta Platforms Inc.', 'stock', 'META', 'USD', 1, 1000000, 320.45, 1.75, 18000000000, 820000000000),
('NFLX', 'Netflix Inc.', 'stock', 'NFLX', 'USD', 1, 1000000, 485.60, -0.95, 8500000000, 210000000000);

-- Insert default trading pairs (for backward compatibility)
INSERT INTO public.trading_pairs (base_currency, quote_currency, symbol, min_order_size, max_order_size) VALUES
('BTC', 'USDT', 'BTCUSDT', 0.00001, 100),
('ETH', 'USDT', 'ETHUSDT', 0.001, 1000),
('BTC', 'ETH', 'BTCETH', 0.00001, 100),
('ADA', 'USDT', 'ADAUSDT', 1, 1000000),
('SOL', 'USDT', 'SOLUSDT', 0.01, 10000),
('MATIC', 'USDT', 'MATICUSDT', 1, 1000000);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, first_name, last_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email), 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  -- Create default USDT portfolio
  INSERT INTO public.portfolios (user_id, currency, balance, available_balance)
  VALUES (NEW.id, 'USDT', 10000, 10000);
  
  -- Create default USD portfolio for stocks
  INSERT INTO public.portfolios (user_id, currency, balance, available_balance)
  VALUES (NEW.id, 'USD', 5000, 5000);
  
  -- Create default watchlist
  INSERT INTO public.watchlists (user_id, name, is_default)
  VALUES (NEW.id, 'My Watchlist', true);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();