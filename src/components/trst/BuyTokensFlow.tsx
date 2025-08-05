import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Wallet, 
  Coins, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  ExternalLink,
  Copy,
  DollarSign,
  Bitcoin,
  Zap,
  Shield,
  Info,
  Sparkles,
  Target,
  Activity,
  Lock,
  Unlock,
  Circle
} from 'lucide-react';

interface TRSTData {
  tokenName: string;
  tokenSymbol: string;
  tokenPrice: number;
  acceptedTokens: Array<{
    symbol: string;
    name: string;
    icon: string;
  }>;
}

interface UserParticipation {
  totalContributed: number;
  tokensPurchased: number;
  walletConnected: boolean;
  walletAddress: string;
}

interface BuyTokensFlowProps {
  icoData: TRSTData;
  userParticipation: UserParticipation;
}

export default function BuyTokensFlow({ icoData, userParticipation }: BuyTokensFlowProps) {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [contributionAmount, setContributionAmount] = useState('');
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  const calculateTokens = (amount: number) => {
    return amount / icoData.tokenPrice;
  };

  const handleConnectWallet = async () => {
    setIsConnectingWallet(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnectingWallet(false);
    }, 2000);
  };

  const handleBuyTokens = async () => {
    setIsProcessingTransaction(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      const amount = parseFloat(contributionAmount);
      const tokens = calculateTokens(amount);
      
      setTransactionHash('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');
      setShowConfirmation(true);
      setIsProcessingTransaction(false);
      setContributionAmount('');
    }, 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getTokenIcon = (symbol: string) => {
    switch (symbol) {
      case 'ETH': return Circle;
      case 'BTC': return Bitcoin;
      case 'USDT': return DollarSign;
      default: return Coins;
    }
  };

  const TokenIcon = getTokenIcon(selectedToken);

  return (
    <div className="space-y-6">
      {/* Wallet Connection */}
      <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
        <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-trusted-gold to-yellow-500 rounded-lg">
              <Wallet className="h-5 w-5 text-trusted-navy" />
            </div>
            <span className="text-trusted-text-primary dark:text-slate-100">Connect Wallet</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-trusted-gold/20 to-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
              <Wallet className="h-10 w-10 text-trusted-gold" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-trusted-text-primary dark:text-slate-100">Connect Your Wallet</h3>
              <p className="text-trusted-text-secondary dark:text-slate-400 mb-6 max-w-md mx-auto">
                Connect your wallet to participate in the TRST token sale and start your investment journey
              </p>
            </div>
            <Button 
              onClick={handleConnectWallet}
              disabled={isConnectingWallet}
              className="bg-gradient-to-r from-trusted-gold to-yellow-500 text-trusted-navy hover:from-yellow-500 hover:to-trusted-gold font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {isConnectingWallet ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Buy Tokens Form */}
      <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
        <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-trusted-gold to-yellow-500 rounded-lg">
              <Coins className="h-5 w-5 text-trusted-navy" />
            </div>
            <span className="text-trusted-text-primary dark:text-slate-100">Buy TRST Tokens</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Payment Method Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Payment Method</Label>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {icoData.acceptedTokens.map((token, index) => {
                  const Icon = getTokenIcon(token.symbol);
                  return (
                    <SelectItem key={index} value={token.symbol}>
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span>{token.symbol} - {token.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Contribution Amount */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Contribution Amount ({selectedToken})</Label>
            <div className="relative">
              <TokenIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-trusted-text-secondary dark:text-slate-400" />
              <Input
                type="number"
                placeholder="0.00"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                className="pl-10 bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60"
              />
            </div>
          </div>

          {/* Token Calculation */}
          {contributionAmount && parseFloat(contributionAmount) > 0 && (
            <div className="bg-gradient-to-r from-trusted-gold/15 to-yellow-500/15 border border-trusted-gold/30 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-trusted-text-secondary dark:text-slate-400">You will receive:</span>
                <span className="font-medium text-trusted-gold">
                  {calculateTokens(parseFloat(contributionAmount)).toLocaleString()} TRST
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-trusted-text-secondary dark:text-slate-400">Token Price:</span>
                <span className="font-medium text-trusted-text-primary dark:text-slate-100">${icoData.tokenPrice} per TRST</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-trusted-text-secondary dark:text-slate-400">Network Fee:</span>
                <span className="font-medium text-trusted-text-primary dark:text-slate-100">~$5-15 (estimated)</span>
              </div>
            </div>
          )}

          {/* Purchase Button */}
          <Button
            onClick={handleBuyTokens}
            disabled={!contributionAmount || parseFloat(contributionAmount) <= 0 || isProcessingTransaction}
            className="w-full bg-gradient-to-r from-trusted-gold to-yellow-500 text-trusted-navy hover:from-yellow-500 hover:to-trusted-gold font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {isProcessingTransaction ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing Transaction...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Buy TRST Tokens
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>

          {/* Security Notice */}
          <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-trusted-warning/15 to-orange-500/15 border border-trusted-warning/30 rounded-xl">
            <Shield className="h-5 w-5 text-trusted-warning mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium text-trusted-warning mb-1">Security Notice</div>
              <div className="text-trusted-text-secondary dark:text-slate-400">
                Always verify the contract address and ensure you're on the official website before making any transactions.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <div className="p-2 bg-trusted-success/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-trusted-success" />
              </div>
              <span className="text-trusted-text-primary dark:text-slate-100">Transaction Successful!</span>
            </DialogTitle>
            <DialogDescription className="text-trusted-text-secondary dark:text-slate-400">
              Your TRST tokens have been purchased successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-trusted-success/15 to-green-500/15 border border-trusted-success/30 rounded-xl p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-trusted-text-primary dark:text-slate-100">Transaction Hash:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(transactionHash)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-xs font-mono bg-white/70 dark:bg-slate-800/70 p-2 rounded text-trusted-text-primary dark:text-slate-100">
                  {transactionHash}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirmation(false)}
              >
                Close
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-trusted-gold to-yellow-500 text-trusted-navy"
                onClick={() => {
                  window.open(`https://etherscan.io/tx/${transactionHash}`, '_blank');
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Explorer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 