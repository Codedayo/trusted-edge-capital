import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  FileText,
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Activity,
  Target,
  Coins,
  Globe
} from 'lucide-react';

export default function KYCForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    idType: '',
    idNumber: '',
    passportNumber: '',
    occupation: '',
    sourceOfFunds: '',
    annualIncome: '',
    investmentExperience: '',
    riskTolerance: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToMarketing: false
  });

  const [kycStatus, setKycStatus] = useState<'not-started' | 'in-progress' | 'submitted' | 'approved' | 'rejected'>('not-started');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{
    idDocument?: File;
    proofOfAddress?: File;
    selfie?: File;
  }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (type: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate KYC submission
    setTimeout(() => {
      setKycStatus('submitted');
      setIsSubmitting(false);
    }, 3000);
  };

  const getStatusBadge = () => {
    switch (kycStatus) {
      case 'not-started':
        return <Badge className="bg-trusted-navy">Not Started</Badge>;
      case 'in-progress':
        return <Badge className="bg-trusted-warning">In Progress</Badge>;
      case 'submitted':
        return <Badge className="bg-trusted-blue">Submitted</Badge>;
      case 'approved':
        return <Badge className="bg-trusted-success">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-trusted-error">Rejected</Badge>;
      default:
        return <Badge className="bg-trusted-navy">Unknown</Badge>;
    }
  };

  const getStatusIcon = () => {
    switch (kycStatus) {
      case 'not-started':
        return <AlertCircle className="h-4 w-4 text-trusted-text-secondary dark:text-slate-400" />;
      case 'in-progress':
        return <Loader2 className="h-4 w-4 text-trusted-warning animate-spin" />;
      case 'submitted':
        return <CheckCircle className="h-4 w-4 text-trusted-blue" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-trusted-success" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-trusted-error" />;
      default:
        return <AlertCircle className="h-4 w-4 text-trusted-text-secondary dark:text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* KYC Status */}
      <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
        <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-trusted-gold to-yellow-500 rounded-lg">
              <Shield className="h-5 w-5 text-trusted-navy" />
            </div>
            <span className="text-trusted-text-primary dark:text-slate-100">KYC Verification</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <div className="font-medium text-trusted-text-primary dark:text-slate-100">Verification Status</div>
                <div className="text-sm text-trusted-text-secondary dark:text-slate-400">
                  {kycStatus === 'not-started' && 'Complete your KYC to participate in the token sale'}
                  {kycStatus === 'in-progress' && 'Your verification is being processed'}
                  {kycStatus === 'submitted' && 'Your documents have been submitted for review'}
                  {kycStatus === 'approved' && 'Your KYC has been approved'}
                  {kycStatus === 'rejected' && 'Your KYC was rejected. Please review and resubmit'}
                </div>
              </div>
            </div>
            {getStatusBadge()}
          </div>
        </CardContent>
      </Card>

      {/* KYC Form */}
      <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
        <CardHeader className="border-b border-slate-200/50 dark:border-slate-700/50">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-trusted-gold to-yellow-500 rounded-lg">
              <User className="h-5 w-5 text-trusted-navy" />
            </div>
            <span className="text-trusted-text-primary dark:text-slate-100">Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2 text-trusted-text-primary dark:text-slate-100">
                <Activity className="h-5 w-5 text-trusted-gold" />
                <span>Personal Details</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    required
                    className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Nationality *</Label>
                  <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                    <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60">
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                      <SelectItem value="JP">Japan</SelectItem>
                      <SelectItem value="SG">Singapore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2 text-trusted-text-primary dark:text-slate-100">
                <MapPin className="h-5 w-5 text-trusted-gold" />
                <span>Address Information</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                    className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                      className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="JP">Japan</SelectItem>
                        <SelectItem value="SG">Singapore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      required
                      className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Identity Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2 text-trusted-text-primary dark:text-slate-100">
                <Target className="h-5 w-5 text-trusted-gold" />
                <span>Identity Verification</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idType" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">ID Type *</Label>
                  <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
                    <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="drivers-license">Driver's License</SelectItem>
                      <SelectItem value="national-id">National ID</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">ID Number *</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange('idNumber', e.target.value)}
                    required
                    className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60"
                  />
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2 text-trusted-text-primary dark:text-slate-100">
                <Upload className="h-5 w-5 text-trusted-gold" />
                <span>Document Upload</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">ID Document *</Label>
                  <div className="border-2 border-dashed border-slate-300/60 dark:border-slate-600/60 rounded-xl p-6 text-center bg-white/70 dark:bg-slate-800/70 hover:border-trusted-gold/60 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-trusted-text-secondary dark:text-slate-400 mb-2" />
                    <p className="text-sm text-trusted-text-secondary dark:text-slate-400 mb-2">
                      Upload a clear photo of your ID document
                    </p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('idDocument', file);
                      }}
                      className="hidden"
                      id="idDocument"
                    />
                    <label htmlFor="idDocument" className="cursor-pointer">
                      <Button variant="outline" size="sm" className="border-trusted-gold text-trusted-gold hover:bg-trusted-gold hover:text-white">
                        Choose File
                      </Button>
                    </label>
                    {uploadedFiles.idDocument && (
                      <p className="text-xs text-trusted-success mt-2">
                        ✓ {uploadedFiles.idDocument.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Proof of Address *</Label>
                  <div className="border-2 border-dashed border-slate-300/60 dark:border-slate-600/60 rounded-xl p-6 text-center bg-white/70 dark:bg-slate-800/70 hover:border-trusted-gold/60 transition-colors">
                    <FileText className="h-8 w-8 mx-auto text-trusted-text-secondary dark:text-slate-400 mb-2" />
                    <p className="text-sm text-trusted-text-secondary dark:text-slate-400 mb-2">
                      Upload a recent utility bill or bank statement
                    </p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('proofOfAddress', file);
                      }}
                      className="hidden"
                      id="proofOfAddress"
                    />
                    <label htmlFor="proofOfAddress" className="cursor-pointer">
                      <Button variant="outline" size="sm" className="border-trusted-gold text-trusted-gold hover:bg-trusted-gold hover:text-white">
                        Choose File
                      </Button>
                    </label>
                    {uploadedFiles.proofOfAddress && (
                      <p className="text-xs text-trusted-success mt-2">
                        ✓ {uploadedFiles.proofOfAddress.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Selfie with ID *</Label>
                  <div className="border-2 border-dashed border-slate-300/60 dark:border-slate-600/60 rounded-xl p-6 text-center bg-white/70 dark:bg-slate-800/70 hover:border-trusted-gold/60 transition-colors">
                    <Camera className="h-8 w-8 mx-auto text-trusted-text-secondary dark:text-slate-400 mb-2" />
                    <p className="text-sm text-trusted-text-secondary dark:text-slate-400 mb-2">
                      Take a selfie holding your ID document
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('selfie', file);
                      }}
                      className="hidden"
                      id="selfie"
                    />
                    <label htmlFor="selfie" className="cursor-pointer">
                      <Button variant="outline" size="sm" className="border-trusted-gold text-trusted-gold hover:bg-trusted-gold hover:text-white">
                        Choose File
                      </Button>
                    </label>
                    {uploadedFiles.selfie && (
                      <p className="text-xs text-trusted-success mt-2">
                        ✓ {uploadedFiles.selfie.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2 text-trusted-text-primary dark:text-slate-100">
                <Coins className="h-5 w-5 text-trusted-gold" />
                <span>Financial Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Occupation *</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    required
                    className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sourceOfFunds" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Source of Funds *</Label>
                  <Select value={formData.sourceOfFunds} onValueChange={(value) => handleInputChange('sourceOfFunds', value)}>
                    <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employment">Employment Income</SelectItem>
                      <SelectItem value="business">Business Income</SelectItem>
                      <SelectItem value="investment">Investment Returns</SelectItem>
                      <SelectItem value="inheritance">Inheritance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncome" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Annual Income *</Label>
                  <Select value={formData.annualIncome} onValueChange={(value) => handleInputChange('annualIncome', value)}>
                    <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60">
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-50k">Under $50,000</SelectItem>
                      <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                      <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                      <SelectItem value="over-500k">Over $500,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investmentExperience" className="text-sm font-medium text-trusted-text-primary dark:text-slate-100">Investment Experience *</Label>
                  <Select value={formData.investmentExperience} onValueChange={(value) => handleInputChange('investmentExperience', value)}>
                    <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-700/60">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2 text-trusted-text-primary dark:text-slate-100">
                <Globe className="h-5 w-5 text-trusted-gold" />
                <span>Terms & Conditions</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                    required
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm text-trusted-text-primary dark:text-slate-100">
                    I agree to the Terms of Service and Privacy Policy *
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToPrivacy"
                    checked={formData.agreeToPrivacy}
                    onCheckedChange={(checked) => handleInputChange('agreeToPrivacy', checked as boolean)}
                    required
                  />
                  <Label htmlFor="agreeToPrivacy" className="text-sm text-trusted-text-primary dark:text-slate-100">
                    I consent to the processing of my personal data for KYC purposes *
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToMarketing"
                    checked={formData.agreeToMarketing}
                    onCheckedChange={(checked) => handleInputChange('agreeToMarketing', checked as boolean)}
                  />
                  <Label htmlFor="agreeToMarketing" className="text-sm text-trusted-text-primary dark:text-slate-100">
                    I agree to receive marketing communications (optional)
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting || kycStatus === 'approved'}
                className="bg-gradient-to-r from-trusted-gold to-yellow-500 text-trusted-navy hover:from-yellow-500 hover:to-trusted-gold font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Submit KYC Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-trusted-warning/20 rounded-lg">
              <Lock className="h-5 w-5 text-trusted-warning" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-trusted-warning mb-2">Security & Privacy</div>
              <div className="text-trusted-text-secondary dark:text-slate-400 space-y-1">
                <p>• All documents are encrypted and stored securely</p>
                <p>• Your personal information is protected under GDPR regulations</p>
                <p>• KYC verification typically takes 1-3 business days</p>
                <p>• You will be notified via email once verification is complete</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 