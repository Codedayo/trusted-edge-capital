# Configuration Guide

This guide will help you set up the Trusted Edge Capital trading platform properly.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Supabase Service Role Key (for admin operations)
# VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Development Configuration
NODE_ENV=development

# Optional: Analytics and Monitoring
# VITE_ANALYTICS_ID=your_analytics_id
# VITE_SENTRY_DSN=your_sentry_dsn

# Optional: External APIs
# VITE_COINGECKO_API_KEY=your_coingecko_api_key
# VITE_ALPHA_VANTAGE_API_KEY=your_alphavantage_api_key

# Optional: Feature Flags
# VITE_ENABLE_SOCIAL_TRADING=true
# VITE_ENABLE_COPY_TRADING=true
# VITE_ENABLE_ADVANCED_CHARTING=true

# Optional: Trading Configuration
# VITE_DEFAULT_TRADING_PAIRS=BTCUSDT,ETHUSDT,AAPL,MSFT
# VITE_MAX_ORDER_SIZE=1000000
# VITE_MIN_ORDER_SIZE=0.00001

# Optional: Security Configuration
# VITE_ENABLE_2FA=true
# VITE_ENABLE_KYC=true
# VITE_SESSION_TIMEOUT=3600

# Optional: Performance Configuration
# VITE_ENABLE_CACHING=true
# VITE_CACHE_DURATION=300
# VITE_MAX_CONCURRENT_REQUESTS=10
```

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

### 2. Run Database Migrations

The database migrations are located in `supabase/migrations/`. These will create:

- User profiles and authentication
- Asset tables for crypto and stocks
- Trading pairs and order management
- Portfolio and holdings tracking
- Transaction history
- Watchlist functionality

### 3. Configure Row Level Security

The migrations include RLS policies for:
- User data protection
- Portfolio access control
- Order management security
- Transaction privacy

## External API Configuration

### CoinGecko API (Crypto Data)
1. Sign up at [coingecko.com](https://coingecko.com)
2. Get your API key
3. Add to environment variables

### Alpha Vantage API (Stock Data)
1. Sign up at [alphavantage.co](https://alphavantage.co)
2. Get your API key
3. Add to environment variables

## Feature Configuration

### Trading Pairs
Configure default trading pairs in your environment:

```env
VITE_DEFAULT_TRADING_PAIRS=BTCUSDT,ETHUSDT,AAPL,MSFT,GOOGL,TSLA
```

### Order Limits
Set minimum and maximum order sizes:

```env
VITE_MIN_ORDER_SIZE=0.00001
VITE_MAX_ORDER_SIZE=1000000
```

### Security Features
Enable additional security features:

```env
VITE_ENABLE_2FA=true
VITE_ENABLE_KYC=true
VITE_SESSION_TIMEOUT=3600
```

## Development Configuration

### Local Development
For local development, you can use:

```env
NODE_ENV=development
VITE_ENABLE_MOCK_DATA=true
```

### Production Configuration
For production deployment:

```env
NODE_ENV=production
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_MONITORING=true
```

## Performance Optimization

### Caching
Enable caching for better performance:

```env
VITE_ENABLE_CACHING=true
VITE_CACHE_DURATION=300
```

### Request Limits
Configure concurrent request limits:

```env
VITE_MAX_CONCURRENT_REQUESTS=10
```

## Security Best Practices

### Environment Variables
- Never commit `.env.local` to version control
- Use different keys for development and production
- Rotate API keys regularly

### Database Security
- Enable RLS policies
- Use service role key only for admin operations
- Implement proper authentication

### API Security
- Rate limit API requests
- Validate all inputs
- Use HTTPS in production

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify your Supabase URL and keys
   - Check if your project is active
   - Ensure migrations have been run

2. **Authentication Issues**
   - Verify Supabase Auth is enabled
   - Check email confirmation settings
   - Review RLS policies

3. **Trading Errors**
   - Verify asset data exists
   - Check order validation rules
   - Review portfolio balances

4. **Performance Issues**
   - Enable caching
   - Optimize API calls
   - Use production builds

### Debug Mode
Enable debug mode for development:

```env
VITE_DEBUG=true
VITE_LOG_LEVEL=debug
```

## Production Deployment

### Environment Variables
Set production environment variables:

```env
NODE_ENV=production
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

### Build Configuration
Optimize for production:

```bash
npm run build
```

### Monitoring
Enable monitoring and analytics:

```env
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_MONITORING=true
VITE_SENTRY_DSN=your_sentry_dsn
```

## Support

For configuration issues:
1. Check the troubleshooting section
2. Review Supabase documentation
3. Open an issue on GitHub
4. Contact support@trustededgecapital.com 