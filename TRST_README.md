# TRST Token Sale Module

A comprehensive TRST token sale module for the Trusted Edge Capital platform, featuring a complete token sale interface with wallet integration, KYC verification, and real-time statistics.

## 🚀 Features

### Core TRST Functionality
- **Token Sale Interface**: Complete token purchase flow with wallet integration
- **Real-time Statistics**: Live fundraising progress, participant count, and token metrics
- **KYC Integration**: Identity verification system with document upload
- **Tokenomics Display**: Interactive pie chart showing token distribution
- **Vesting Schedule**: Detailed unlock timeline for different token allocations
- **Mobile Responsive**: Optimized for all device sizes
- **Dark/Light Mode**: Consistent theming with the main platform

## 📁 File Structure

```
src/
├── pages/
│   └── TRST.tsx                  # Main TRST page
├── components/trst/
│   ├── TRSTHero.tsx              # Hero section with countdown
│   ├── TokenSaleSummary.tsx      # Real-time sale statistics
│   ├── BuyTokensFlow.tsx         # Token purchase interface
│   ├── TokenomicsChart.tsx       # Token distribution chart
│   ├── VestingSchedule.tsx       # Unlock timeline
│   ├── KYCForm.tsx               # Identity verification
│   └── trst-config.ts            # TRST configuration
├── hooks/
└── use-trst.ts                   # TRST state management
```

## ⚙️ Configuration

### 1. Update Token Information in `src/lib/trst-config.ts`:

```typescript
export const TRST_CONFIG = {
  token: {
    name: 'TRST Token',
    symbol: 'TRST',
    price: 0.50,           // Token price in USD
    maxSupply: 100000000,  // Total token supply
    decimals: 18
  },
  sale: {
    softCap: 5000000,      // Minimum funding goal
    hardCap: 50000000,     // Maximum funding goal
    minPurchase: 100,       // Minimum purchase amount
    maxPurchase: 100000,    // Maximum purchase amount
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z'
  },
  network: {
    name: 'Ethereum',
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'
  },
  contracts: {
    tokenAddress: '0x...',  // Your TRST token contract
    saleAddress: '0x...',  // Your TRST sale contract
    receiverAddress: '0x...' // Funds receiver wallet
  }
};
```

### 2. Update Accepted Tokens:

```typescript
acceptedTokens: [
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ethereum' },
  { symbol: 'USDT', name: 'Tether USD', icon: 'Tether' },
  { symbol: 'USDC', name: 'USD Coin', icon: 'USDCoin' },
  { symbol: 'BTC', name: 'Bitcoin', icon: 'Bitcoin' }
]
```

## 🔧 Development Setup

### 1. Install Dependencies:
```bash
npm install
```

### 2. Start Development Server:
```bash
npm run dev
```

### 3. Access TRST Page:
Navigate to `http://localhost:5173/trst`

## 🎨 Customization

### Theme Integration
The TRST module uses the existing Trusted Edge Capital theme:
- **Colors**: `trusted-navy`, `trusted-gold`, `trusted-blue`, etc.
- **Components**: Shadcn/ui components with custom styling
- **Typography**: Consistent font hierarchy and spacing

### Responsive Design
The TRST module is fully responsive with:
- **Mobile**: Optimized layouts for small screens
- **Tablet**: Adaptive grid systems
- **Desktop**: Full-featured interface with sidebar navigation

## 🔌 Integration

### 1. Add to Navigation:
Update your main navigation to include the TRST link:

```typescript
const navigation = [
  // ... existing items
  { id: 'ico', label: 'TRST COIN', icon: Coins, href: '/ico' }
];
```

### 2. Update Routing:
Ensure the TRST route is added to your router:

```typescript
<Route path="/trst" element={<TRST />} />
```

## 📊 State Management

### useTRST Hook
The TRST module uses a custom hook for state management:

```typescript
const {
  trstData,          // Current TRST state
  userParticipation, // User's participation data
  connectWallet,     // Wallet connection function
  buyTokens,         // Token purchase function
  submitKYC,         // KYC submission function
  getSaleStats,      // Get sale statistics
  canParticipate,    // Check if user can participate
  isSaleActive       // Check if sale is active
} = useTRST();
```

## 🔐 Security Considerations

### Production Deployment
1. **Replace Mock Data**: Update `use-ico.ts` to use actual contract calls
2. **Smart Contract Audit**: Ensure contracts are audited before deployment
3. **KYC Integration**: Connect to real KYC service providers
4. **Rate Limiting**: Implement proper rate limiting for purchases
5. **Gas Optimization**: Optimize contract calls for gas efficiency

## 📝 License

This TRST module is part of the Trusted Edge Capital platform and follows the same licensing terms.

## 🆘 Support

For technical support or questions about the TRST module:
- **Documentation**: Check the inline comments in each component
- **Issues**: Report bugs through the project's issue tracker
- **Contributions**: Submit pull requests for improvements

## ⚠️ Important Notes

**Note**: This TRST module is designed to be production-ready but requires proper smart contract integration and security auditing before deployment to mainnet. 