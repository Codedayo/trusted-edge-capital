import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Shield, 
  Smartphone, 
  Key, 
  Eye, 
  EyeOff, 
  Copy, 
  Download,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import QRCode from 'qrcode.react';

interface TwoFactorAuthProps {
  onSetup?: (secret: string, backupCodes: string[]) => void;
  onVerify?: (token: string) => Promise<boolean>;
  onDisable?: () => Promise<void>;
  isEnabled?: boolean;
  secret?: string;
  backupCodes?: string[];
}

export default function TwoFactorAuth({
  onSetup,
  onVerify,
  onDisable,
  isEnabled = false,
  secret = '',
  backupCodes = []
}: TwoFactorAuthProps) {
  const [step, setStep] = useState<'setup' | 'verify' | 'enabled' | 'disable'>(
    isEnabled ? 'enabled' : 'setup'
  );
  const [showSecret, setShowSecret] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [generatedSecret, setGeneratedSecret] = useState('');
  const [generatedBackupCodes, setGeneratedBackupCodes] = useState<string[]>([]);

  useEffect(() => {
    if (step === 'setup' && !generatedSecret) {
      generateNewSecret();
    }
  }, [step]);

  const generateNewSecret = () => {
    // Generate a random 32-character base32 secret
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setGeneratedSecret(secret);
    
    // Generate QR code URL for authenticator apps
    const issuer = 'Trusted Edge Capital';
    const account = 'user@example.com'; // Replace with actual user email
    const qrUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`;
    setQrCodeUrl(qrUrl);
    
    // Generate backup codes
    const codes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    setGeneratedBackupCodes(codes);
  };

  const handleSetup = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Verify the code (in real implementation, verify against server)
      const isValid = await verifyTOTP(generatedSecret, verificationCode);
      
      if (isValid) {
        if (onSetup) {
          await onSetup(generatedSecret, generatedBackupCodes);
        }
        setStep('enabled');
        toast({
          title: "2FA Enabled",
          description: "Two-factor authentication has been successfully enabled.",
        });
      } else {
        toast({
          title: "Invalid Code",
          description: "The verification code is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enable 2FA. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable = async () => {
    setIsLoading(true);
    try {
      if (onDisable) {
        await onDisable();
      }
      setStep('setup');
      setGeneratedSecret('');
      setQrCodeUrl('');
      setGeneratedBackupCodes([]);
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disable 2FA. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Secret key copied to clipboard.",
    });
  };

  const downloadBackupCodes = () => {
    const content = `Trusted Edge Capital - Backup Codes\n\n${generatedBackupCodes.join('\n')}\n\nKeep these codes safe. Each can only be used once.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Simple TOTP verification (in production, use a proper library)
  const verifyTOTP = async (secret: string, token: string): Promise<boolean> => {
    // This is a simplified verification - in production, use a proper TOTP library
    const timestamp = Math.floor(Date.now() / 30000); // 30-second window
    const expectedToken = generateTOTP(secret, timestamp);
    return token === expectedToken;
  };

  const generateTOTP = (secret: string, timestamp: number): string => {
    // Simplified TOTP generation - in production, use a proper library
    const hash = btoa(secret + timestamp.toString());
    const code = parseInt(hash.slice(0, 6), 16) % 1000000;
    return code.toString().padStart(6, '0');
  };

  if (step === 'enabled') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Two-Factor Authentication Enabled
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            Your account is protected with 2FA
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Backup Codes</Label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {backupCodes.map((code, index) => (
                <div key={index} className="bg-slate-100 dark:bg-slate-800 p-2 rounded font-mono">
                  {code}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              Keep these codes safe. Each can only be used once.
            </p>
          </div>

          <Button 
            variant="destructive" 
            onClick={handleDisable}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Disabling...
              </>
            ) : (
              'Disable 2FA'
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Two-Factor Authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 'setup' && (
          <>
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-medium mb-2">Scan QR Code</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Use your authenticator app to scan this QR code
                </p>
                {qrCodeUrl && (
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <QRCode value={qrCodeUrl} size={200} />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Secret Key</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type={showSecret ? 'text' : 'password'}
                    value={generatedSecret}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSecret(!showSecret)}
                  >
                    {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generatedSecret)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  If you can't scan the QR code, enter this secret manually
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Backup Codes</Label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {generatedBackupCodes.map((code, index) => (
                    <div key={index} className="bg-slate-100 dark:bg-slate-800 p-2 rounded font-mono">
                      {code}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generatedBackupCodes.join('\n'))}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadBackupCodes}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  Save these backup codes in a secure location
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="verification-code" className="text-sm font-medium">
                  Verification Code
                </Label>
                <Input
                  id="verification-code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="text-center text-lg font-mono"
                />
                <p className="text-xs text-slate-500">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>

              <Button 
                onClick={handleSetup}
                disabled={isLoading || verificationCode.length !== 6}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Enable 2FA'
                )}
              </Button>
            </div>
          </>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-medium mb-2">Verify Your Identity</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Enter the verification code from your authenticator app
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verify-code" className="text-sm font-medium">
                Verification Code
              </Label>
              <Input
                id="verify-code"
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="text-center text-lg font-mono"
              />
            </div>

            <Button 
              onClick={handleSetup}
              disabled={isLoading || verificationCode.length !== 6}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 