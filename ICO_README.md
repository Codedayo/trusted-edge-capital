# TRST Token Sale (ICO) Module

A comprehensive Initial Coin Offering (ICO) module for the Trusted Edge Capital platform, featuring a complete token sale interface with wallet integration, KYC verification, and real-time statistics.

## 🚀 Features

### Core ICO Functionality
- **Hero Section**: Eye-catching countdown timer and token branding
- **Real-time Statistics**: Live fundraising progress, participant count, and token price
- **Buy Tokens Flow**: Complete purchase process with wallet connection
- **Tokenomics Chart**: Interactive pie chart showing token distribution
- **Vesting Schedule**: Detailed unlock timelines and vesting periods
- **KYC Integration**: Comprehensive identity verification system

### Technical Features
- **Wallet Integration**: MetaMask and other Web3 wallet support
- **Smart Contract Ready**: Hooks for ERC-20 and sale contract interactions
- **Responsive Design**: Mobile-friendly interface matching existing platform
- **Dark/Light Mode**: Consistent with Trusted Edge Capital theme
- **Configurable**: Easy parameter modification for different token sales

## 📁 File Structure

```
src/
├── pages/
│   └── ICO.tsx                    # Main ICO page
├── components/ico/
│   ├── ICOHero.tsx               # Hero section with countdown
│   ├── TokenSaleSummary.tsx      # Real-time sale statistics
│   ├── BuyTokensFlow.tsx         # Purchase interface
│   ├── TokenomicsChart.tsx       # Token distribution chart
│   ├── VestingSchedule.tsx       # Vesting timeline
│   └── KYCForm.tsx               # Identity verification
├── lib/
│   └── ico-config.ts             # ICO configuration
└── hooks/
    └── use-ico.ts                # ICO state management
```

## ⚙️ Configuration

### Quick Setup

1. **Update Token Information** in `src/lib/ico-config.ts`:
```typescript
token: {
  name: 'TRST',
  symbol: 'TRST',
  price: 0.25, // USD per token
  maxSupply: 100000000,
}
```

2. **Set Sale Parameters**:
```typescript
sale: {
  softCap: 5000000, // USD
  hardCap: 25000000, // USD
  startDate: new Date('2024-01-15T00:00:00Z'),
  endDate: new Date('2024-02-15T23:59:59Z'),
}
```

3. **Configure Smart Contracts**:
```typescript
contracts: {
  tokenAddress: '0x...', // Your ERC-20 token contract
  saleAddress: '0x...',  // Your ICO sale contract
  treasuryAddress: '0x...', // Treasury wallet
}
```

### Network Configuration

Update the network settings for your target blockchain:

```typescript
network: {
  chainId: 1, // Ethereum mainnet
  rpcUrl: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
  explorerUrl: 'https://etherscan.io',
  name: 'Ethereum Mainnet'
}
```

## 🔧 Smart Contract Integration

### Required Contract Functions

Your smart contracts should implement these functions:

#### Token Contract (ERC-20)
```solidity
function balanceOf(address account) external view returns (uint256);
function transfer(address to, uint256 amount) external returns (bool);
function approve(address spender, uint256 amount) external returns (bool);
```

#### Sale Contract
```solidity
function buyTokens() external payable;
function getSaleInfo() external view returns (uint256 raised, uint256 participants);
function getUserContribution(address user) external view returns (uint256);
function isSaleActive() external view returns (bool);
```

### Integration Steps

1. **Replace Mock Data**: Update `use-ico.ts` to use actual contract calls
2. **Add Contract ABI**: Include your contract ABIs
3. **Implement Event Listeners**: Listen for purchase events
4. **Add Error Handling**: Handle contract failures gracefully

## 🎨 Customization

### Theme Colors

The ICO module uses the existing Trusted Edge Capital theme:

```css
--trusted-gold: 42 100% 55%;       /* Primary accent */
--trusted-navy: 220 45% 8%;        /* Primary background */
--trusted-blue: 220 45% 15%;       /* Secondary background */
--trusted-success: 142 76% 36%;    /* Success states */
--trusted-warning: 38 92% 50%;     /* Warning states */
--trusted-error: 0 84% 60%;        /* Error states */
```

### Component Styling

All components use Tailwind CSS classes and can be customized by modifying the className props.

## 📱 Responsive Design

The ICO module is fully responsive with:
- Mobile-first design approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements
- Optimized navigation for mobile devices

## 🔒 Security Features

### KYC Integration
- Document upload with encryption
- Identity verification workflow
- Compliance with regulatory requirements
- Secure data handling

### Wallet Security
- MetaMask integration with network validation
- Transaction confirmation dialogs
- Error handling for failed transactions
- Security warnings and notices

## 🚀 Deployment

### Production Checklist

1. **Update Contract Addresses**: Replace placeholder addresses with real contracts
2. **Configure RPC Endpoints**: Set up production RPC URLs
3. **Enable KYC Backend**: Connect to actual KYC service
4. **Add Analytics**: Implement tracking for user interactions
5. **Test Transactions**: Verify all purchase flows work correctly
6. **Security Audit**: Review code for potential vulnerabilities

### Environment Variables

Create a `.env` file with your configuration:

```env
VITE_CONTRACT_TOKEN_ADDRESS=0x...
VITE_CONTRACT_SALE_ADDRESS=0x...
VITE_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
VITE_CHAIN_ID=1
VITE_KYC_API_URL=https://your-kyc-service.com
```

## 📊 Analytics & Monitoring

### Key Metrics to Track
- Total funds raised
- Number of participants
- Average contribution size
- Geographic distribution
- KYC completion rates
- Transaction success rates

### Integration Points
- Google Analytics for user behavior
- Contract events for on-chain data
- KYC service for verification metrics
- Error tracking for debugging

## 🛠️ Development

### Local Development

1. **Install Dependencies**:
```bash
npm install
```

2. **Start Development Server**:
```bash
npm run dev
```

3. **Access ICO Page**:
Navigate to `http://localhost:5173/ico`

### Testing

The module includes comprehensive test scenarios:
- Wallet connection flows
- Purchase transaction simulation
- KYC form validation
- Responsive design testing
- Error handling verification

## 📚 API Reference

### useICO Hook

```typescript
const {
  icoData,           // Current ICO state
  userParticipation, // User's participation data
  transactionStatus, // Current transaction status
  connectWallet,     // Connect user's wallet
  buyTokens,         // Purchase tokens
  submitKYC,         // Submit KYC application
  getSaleStats,      // Get sale statistics
  canParticipate,    // Check if user can participate
  isSaleActive       // Check if sale is active
} = useICO();
```

### Configuration Functions

```typescript
import { 
  formatCurrency,    // Format USD amounts
  calculateTokens,   // Calculate tokens for USD amount
  calculateProgress, // Calculate fundraising progress
  isSaleActive,      // Check if sale is active
  getTimeRemaining   // Get countdown timer
} from '@/lib/ico-config';
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This ICO module is part of the Trusted Edge Capital platform and follows the same licensing terms.

## 🆘 Support

For technical support or questions about the ICO module:
- Check the existing documentation
- Review the configuration examples
- Test with the provided mock data
- Contact the development team

---

**Note**: This ICO module is designed to be production-ready but requires proper smart contract integration and security auditing before deployment to mainnet. 