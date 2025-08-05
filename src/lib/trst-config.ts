// TRST Configuration - Modify these values for your token sale
export const TRST_CONFIG = {
  // Token Information
  token: {
    name: 'TRST',
    symbol: 'TRST',
    description: 'Trusted Edge Capital Token',
    price: 0.25, // USD per token
    maxSupply: 100000000, // Total token supply
    decimals: 18
  },

  // Sale Parameters
  sale: {
    softCap: 5000000, // USD
    hardCap: 25000000, // USD
    startDate: new Date('2024-01-15T00:00:00Z'),
    endDate: new Date('2024-02-15T23:59:59Z'),
    minPurchase: 100, // USD
    maxPurchase: 100000, // USD per wallet
  },

  // Accepted Payment Methods
  acceptedTokens: [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      address: '0x0000000000000000000000000000000000000000', // Replace with actual contract
      decimals: 18,
      icon: 'Circle'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT on Ethereum
      decimals: 6,
      icon: 'DollarSign'
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      address: '0x0000000000000000000000000000000000000000', // Replace with actual contract
      decimals: 8,
      icon: 'Bitcoin'
    }
  ],

  // Smart Contract Addresses (Replace with actual addresses)
  contracts: {
    tokenAddress: '0x0000000000000000000000000000000000000000', // TRST token contract
    saleAddress: '0x0000000000000000000000000000000000000000', // TRST sale contract
    treasuryAddress: '0x0000000000000000000000000000000000000000', // Treasury wallet
  },

  // Network Configuration
  network: {
    chainId: 1, // Ethereum mainnet
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID', // Replace with your RPC
    explorerUrl: 'https://etherscan.io',
    name: 'Ethereum Mainnet'
  },

  // Tokenomics Distribution
  tokenomics: [
    {
      category: 'Public Sale',
      percentage: 40,
      amount: 40000000,
      vesting: 'Immediate',
      description: 'Available during TRST Sale'
    },
    {
      category: 'Team & Advisors',
      percentage: 15,
      amount: 15000000,
      vesting: '24 months with 6-month cliff',
      description: 'Vested over 24 months'
    },
    {
      category: 'Development',
      percentage: 20,
      amount: 20000000,
      vesting: '12 months linear',
      description: 'Platform development'
    },
    {
      category: 'Marketing',
      percentage: 10,
      amount: 10000000,
      vesting: '12 months linear',
      description: 'Community growth'
    },
    {
      category: 'Reserve',
      percentage: 10,
      amount: 10000000,
      vesting: 'TBD',
      description: 'Future initiatives'
    },
    {
      category: 'Partnerships',
      percentage: 5,
      amount: 5000000,
      vesting: 'TBD',
      description: 'Strategic partnerships'
    }
  ],

  // KYC Requirements
  kyc: {
    required: true,
    countries: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'SG'],
    restrictedCountries: ['CU', 'IR', 'KP', 'SD', 'SY'], // OFAC restricted
    minAge: 18
  },

  // UI Configuration
  ui: {
    theme: {
      primaryColor: 'trusted-gold',
      secondaryColor: 'trusted-navy',
      accentColor: 'trusted-blue'
    },
    features: {
      countdownTimer: true,
      progressBar: true,
      tokenomicsChart: true,
      vestingSchedule: true,
      kycForm: true,
      walletIntegration: true
    }
  },

  // Social Links
  social: {
    website: 'https://trustededgecapital.com',
    whitepaper: 'https://trustededgecapital.com/whitepaper.pdf',
    telegram: 'https://t.me/trustededgecapital',
    twitter: 'https://twitter.com/trustededgecap',
    discord: 'https://discord.gg/trustededgecapital',
    github: 'https://github.com/trustededgecapital'
  },

  // Legal Information
  legal: {
    termsOfService: 'https://trustededgecapital.com/terms',
    privacyPolicy: 'https://trustededgecapital.com/privacy',
    disclaimer: 'This is not financial advice. Please do your own research before investing.',
    jurisdiction: 'United States'
  }
};

// Helper functions
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount.toLocaleString()}`;
};

export const calculateTokens = (usdAmount: number): number => {
  return usdAmount / TRST_CONFIG.token.price;
};

export const calculateProgress = (raised: number): number => {
  return (raised / TRST_CONFIG.sale.hardCap) * 100;
};

export const isSaleActive = (): boolean => {
  const now = new Date();
  return now >= TRST_CONFIG.sale.startDate && now <= TRST_CONFIG.sale.endDate;
};

export const getTimeRemaining = () => {
  const now = new Date();
  const end = TRST_CONFIG.sale.endDate;
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}; 