import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet, 
  Send, 
  Download, 
  Copy, 
  QrCode, 
  Eye, 
  EyeOff,
  Bitcoin,
  DollarSign,
  TrendingUp,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  price: number;
  change24h: number;
  address: string;
}

interface CryptoWalletProps {
  className?: string;
}

export default function CryptoWallet({ className }: CryptoWalletProps) {
  const [assets, setAssets] = useState<CryptoAsset[]>([
    {
      id: 'btc',
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: 0.245,
      price: 43250,
      change24h: 2.5,
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
    },
    {
      id: 'eth',
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 1.85,
      price: 2680,
      change24h: -1.2,
      address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
    },
    {
      id: 'usdt',
      symbol: 'USDT',
      name: 'Tether',
      balance: 5000,
      price: 1.00,
      change24h: 0.1,
      address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
    }
  ]);

  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferAddress, setTransferAddress] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);

  const totalValue = assets.reduce((sum, asset) => sum + (asset.balance * asset.price), 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatCrypto = (amount: number, symbol: string) => {
    return `${amount.toFixed(8)} ${symbol}`;
  };

  const getPriceChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getPriceChangeIcon = (change: number) => {
    return change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleTransfer = () => {
    if (!selectedAsset || !transferAmount || !transferAddress) return;
    
    // Simulate transfer
    console.log(`Transferring ${transferAmount} ${selectedAsset.symbol} to ${transferAddress}`);
    
    // Reset form
    setTransferAmount('');
    setTransferAddress('');
    setIsTransferDialogOpen(false);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Wallet Overview */}
      <Card className="border-0 shadow-lg bg-trusted-gradient text-white">
        <CardHeader className="border-b border-white/20">
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-6 w-6" />
            <span>Crypto Wallet</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-white/80">Total Value</p>
              <p className="text-3xl font-bold">{formatCurrency(totalValue)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-white/80">Assets</p>
              <p className="text-3xl font-bold">{assets.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-white/80">Security</p>
              <div className="flex items-center justify-center space-x-1">
                <Shield className="h-5 w-5 text-trusted-gold" />
                <span className="text-lg font-semibold">Protected</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <Card key={asset.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-trusted-gold-gradient rounded-lg flex items-center justify-center">
                    {asset.symbol === 'BTC' && <Bitcoin className="h-5 w-5 text-white" />}
                    {asset.symbol === 'ETH' && <DollarSign className="h-5 w-5 text-white" />}
                    {asset.symbol === 'USDT' && <DollarSign className="h-5 w-5 text-white" />}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{asset.symbol}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{asset.name}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {asset.symbol}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Balance</span>
                  <span className="font-medium">{formatCrypto(asset.balance, asset.symbol)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Value</span>
                  <span className="font-medium">{formatCurrency(asset.balance * asset.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Price</span>
                  <span className="font-medium">{formatCurrency(asset.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">24h Change</span>
                  <div className={`flex items-center space-x-1 ${getPriceChangeColor(asset.change24h)}`}>
                    {getPriceChangeIcon(asset.change24h)}
                    <span className="font-medium">
                      {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedAsset(asset);
                    setIsDepositDialogOpen(true);
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Deposit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedAsset(asset);
                    setIsTransferDialogOpen(true);
                  }}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transfer Dialog */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-trusted-gold" />
              <span>Send {selectedAsset?.symbol}</span>
            </DialogTitle>
            <DialogDescription>
              Transfer {selectedAsset?.symbol} to another wallet address
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Recipient Address</Label>
              <Input
                placeholder="Enter wallet address"
                value={transferAddress}
                onChange={(e) => setTransferAddress(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsTransferDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-trusted-gold-gradient text-white hover:opacity-90"
                onClick={handleTransfer}
              >
                Send {selectedAsset?.symbol}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Deposit Dialog */}
      <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-trusted-gold" />
              <span>Deposit {selectedAsset?.symbol}</span>
            </DialogTitle>
            <DialogDescription>
              Receive {selectedAsset?.symbol} to your wallet address
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Your {selectedAsset?.symbol} Address</p>
              <div className="flex items-center space-x-2">
                <Input
                  value={selectedAsset?.address || ''}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(selectedAsset?.address || '')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <p>• Only send {selectedAsset?.symbol} to this address</p>
              <p>• Minimum deposit: 0.001 {selectedAsset?.symbol}</p>
              <p>• Deposits are credited after 3 confirmations</p>
            </div>
            <Button
              className="w-full bg-trusted-gold-gradient text-white hover:opacity-90"
              onClick={() => setIsDepositDialogOpen(false)}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 