import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Home, 
  TrendingUp, 
  BarChart3, 
  Wallet, 
  Star,
  Settings,
  HelpCircle,
  Play,
  SkipForward
} from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon: React.ComponentType<any>;
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Trusted Edge Capital',
    description: 'Your professional trading platform. Let\'s get you started with a quick tour.',
    target: 'body',
    position: 'top',
    icon: Home
  },
  {
    id: 'portfolio',
    title: 'Portfolio Overview',
    description: 'Track your investments, view performance, and manage your portfolio all in one place.',
    target: '[data-tour="portfolio"]',
    position: 'bottom',
    icon: BarChart3
  },
  {
    id: 'trading',
    title: 'Trading Panel',
    description: 'Execute trades with advanced order types, real-time pricing, and professional tools.',
    target: '[data-tour="trading"]',
    position: 'right',
    icon: TrendingUp
  },
  {
    id: 'markets',
    title: 'Market Data',
    description: 'Access real-time market data, watchlists, and comprehensive market analysis.',
    target: '[data-tour="markets"]',
    position: 'left',
    icon: Star
  },
  {
    id: 'wallet',
    title: 'Crypto Wallet',
    description: 'Secure crypto storage with multi-signature support and advanced security features.',
    target: '[data-tour="wallet"]',
    position: 'top',
    icon: Wallet
  },
  {
    id: 'security',
    title: 'Security Features',
    description: '2FA, biometric authentication, and enterprise-grade security to protect your assets.',
    target: '[data-tour="security"]',
    position: 'bottom',
    icon: Settings
  }
];

export default function OnboardingTour({ isOpen, onClose, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    onComplete();
  };

  if (!isVisible) return null;

  const currentTourStep = tourSteps[currentStep];
  const StepIcon = currentTourStep.icon;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Tour Content */}
        <div className="relative h-full flex items-center justify-center p-4">
          <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 shadow-2xl border-0">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <StepIcon className="h-5 w-5 text-trusted-gold" />
                  <Badge variant="outline" className="text-xs">
                    {currentStep + 1} of {tourSteps.length}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={skipTour}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {currentTourStep.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {currentTourStep.description}
                </p>
              </div>

              {/* Progress */}
              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  {tourSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 w-8 rounded-full transition-colors ${
                        index <= currentStep 
                          ? 'bg-trusted-gold' 
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={skipTour}
                    className="text-xs sm:text-sm"
                  >
                    Skip Tour
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="bg-trusted-gold-gradient text-white hover:opacity-90 flex items-center space-x-2"
                  >
                    {currentStep === tourSteps.length - 1 ? (
                      <>
                        <Play className="h-4 w-4" />
                        <span className="hidden sm:inline">Get Started</span>
                        <span className="sm:hidden">Start</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Next</span>
                        <span className="sm:hidden">Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 