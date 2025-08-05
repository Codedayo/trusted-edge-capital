import { useState, useEffect, useCallback } from 'react';
import { ICO_CONFIG, formatCurrency, calculateTokens, calculateProgress, isSaleActive, getTimeRemaining } from '@/lib/ico-config';

// Extend Window interface for ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (params: any) => void) => void;
      removeListener: (event: string, callback: (params: any) => void) => void;
    };
  }
}

export interface ICOData {
  tokenName: string;
  tokenSymbol: string;
  tokenPrice: number;
  maxSupply: number;
  softCap: number;
  hardCap: number;
  totalRaised: number;
  participants: number;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  acceptedTokens: Array<{
    symbol: string;
    name: string;
    icon: string;
  }>;
}

export interface UserParticipation {
  totalContributed: number;
  tokensPurchased: number;
  walletConnected: boolean;
  walletAddress: string;
  kycStatus: 'not-started' | 'in-progress' | 'submitted' | 'approved' | 'rejected';
}

export interface TransactionStatus {
  isProcessing: boolean;
  hash?: string;
  error?: string;
  success: boolean;
}

export const useICO = () => {
  const [icoData, setIcoData] = useState<ICOData>({
    tokenName: ICO_CONFIG.token.name,
    tokenSymbol: ICO_CONFIG.token.symbol,
    tokenPrice: ICO_CONFIG.token.price,
    maxSupply: ICO_CONFIG.token.maxSupply,
    softCap: ICO_CONFIG.sale.softCap,
    hardCap: ICO_CONFIG.sale.hardCap,
    totalRaised: 8750000, // Mock data - replace with actual contract data
    participants: 1247, // Mock data - replace with actual contract data
    timeRemaining: getTimeRemaining(),
    acceptedTokens: ICO_CONFIG.acceptedTokens.map(token => ({
      symbol: token.symbol,
      name: token.name,
      icon: token.icon
    }))
  });

  const [userParticipation, setUserParticipation] = useState<UserParticipation>({
    totalContributed: 0,
    tokensPurchased: 0,
    walletConnected: false,
    walletAddress: '',
    kycStatus: 'not-started'
  });

  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>({
    isProcessing: false,
    success: false
  });

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setIcoData(prev => ({
        ...prev,
        timeRemaining: getTimeRemaining()
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Connect wallet
  const connectWallet = useCallback(async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        const address = accounts[0];
        
        // Check if we're on the correct network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== `0x${ICO_CONFIG.network.chainId.toString(16)}`) {
          throw new Error(`Please switch to ${ICO_CONFIG.network.name}`);
        }

        setUserParticipation(prev => ({
          ...prev,
          walletConnected: true,
          walletAddress: address
        }));

        // Load user's participation data
        await loadUserParticipation(address);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }, []);

  // Load user participation data from contract
  const loadUserParticipation = useCallback(async (address: string) => {
    try {
      // Mock data - replace with actual contract calls
      const mockParticipation = {
        totalContributed: 2500, // USD
        tokensPurchased: 10000, // TRST tokens
        kycStatus: 'approved' as const
      };

      setUserParticipation(prev => ({
        ...prev,
        totalContributed: mockParticipation.totalContributed,
        tokensPurchased: mockParticipation.tokensPurchased,
        kycStatus: mockParticipation.kycStatus
      }));
    } catch (error) {
      console.error('Error loading user participation:', error);
    }
  }, []);

  // Buy tokens
  const buyTokens = useCallback(async (amount: number, paymentToken: string) => {
    if (!userParticipation.walletConnected) {
      throw new Error('Please connect your wallet first');
    }

    if (userParticipation.kycStatus !== 'approved') {
      throw new Error('KYC verification required before purchasing tokens');
    }

    if (amount < ICO_CONFIG.sale.minPurchase) {
      throw new Error(`Minimum purchase amount is ${formatCurrency(ICO_CONFIG.sale.minPurchase)}`);
    }

    if (amount > ICO_CONFIG.sale.maxPurchase) {
      throw new Error(`Maximum purchase amount is ${formatCurrency(ICO_CONFIG.sale.maxPurchase)}`);
    }

    setTransactionStatus({
      isProcessing: true,
      success: false
    });

    try {
      // Mock transaction - replace with actual contract interaction
      await new Promise(resolve => setTimeout(resolve, 3000));

      const tokens = calculateTokens(amount);
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);

      setTransactionStatus({
        isProcessing: false,
        hash: mockTxHash,
        success: true
      });

      // Update user participation
      setUserParticipation(prev => ({
        ...prev,
        totalContributed: prev.totalContributed + amount,
        tokensPurchased: prev.tokensPurchased + tokens
      }));

      // Update total raised (in real implementation, this would come from contract events)
      setIcoData(prev => ({
        ...prev,
        totalRaised: prev.totalRaised + amount,
        participants: prev.participants + 1
      }));

      return mockTxHash;
    } catch (error) {
      setTransactionStatus({
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Transaction failed',
        success: false
      });
      throw error;
    }
  }, [userParticipation.walletConnected, userParticipation.kycStatus]);

  // Submit KYC
  const submitKYC = useCallback(async (kycData: any) => {
    try {
      // Mock KYC submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setUserParticipation(prev => ({
        ...prev,
        kycStatus: 'submitted'
      }));

      return true;
    } catch (error) {
      console.error('Error submitting KYC:', error);
      throw error;
    }
  }, []);

  // Get sale statistics
  const getSaleStats = useCallback(() => {
    const progress = calculateProgress(icoData.totalRaised);
    const isActive = isSaleActive();
    const isSoftCapReached = icoData.totalRaised >= icoData.softCap;
    const isHardCapReached = icoData.totalRaised >= icoData.hardCap;

    return {
      progress,
      isActive,
      isSoftCapReached,
      isHardCapReached,
      formattedRaised: formatCurrency(icoData.totalRaised),
      formattedSoftCap: formatCurrency(icoData.softCap),
      formattedHardCap: formatCurrency(icoData.hardCap)
    };
  }, [icoData.totalRaised, icoData.softCap, icoData.hardCap]);

  // Check if user can participate
  const canParticipate = useCallback(() => {
    return (
      userParticipation.walletConnected &&
      userParticipation.kycStatus === 'approved' &&
      isSaleActive() &&
      !getSaleStats().isHardCapReached
    );
  }, [userParticipation.walletConnected, userParticipation.kycStatus, getSaleStats]);

  return {
    icoData,
    userParticipation,
    transactionStatus,
    connectWallet,
    buyTokens,
    submitKYC,
    getSaleStats,
    canParticipate,
    isSaleActive: isSaleActive()
  };
}; 