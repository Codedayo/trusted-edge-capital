import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  TrendingUp, 
  Globe, 
  Sparkles, 
  Target, 
  Coins, 
  FileText,
  Users,
  Star
} from 'lucide-react';
import { ICOData } from '@/hooks/use-ico';

interface ICOHeroProps {
  icoData: ICOData;
}

export default function ICOHero({ icoData }: ICOHeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const calculateTimeLeft = () => {
      const endDate = new Date('2024-12-31T23:59:59');
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-trusted-navy via-trusted-blue to-trusted-navy p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-trusted-navy/90 via-trusted-blue/80 to-trusted-navy/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-4 sm:top-10 right-4 sm:right-10 animate-bounce">
        <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-trusted-gold/40" />
      </div>
      <div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-10 animate-bounce delay-1000">
        <Target className="h-4 w-4 sm:h-6 sm:w-6 text-trusted-gold/30" />
      </div>
      <div className="absolute top-1/2 right-4 sm:right-20 animate-bounce delay-2000">
        <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-trusted-gold/35" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Status Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Badge className="bg-gradient-to-r from-trusted-success to-green-500 text-white shadow-lg">
            <Star className="h-3 w-3 mr-1" />
            ICO LIVE
          </Badge>
          <Badge variant="outline" className="border-white/80 text-white backdrop-blur-sm bg-white/30 shadow-lg">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending
          </Badge>
          <Badge variant="outline" className="border-trusted-gold/90 text-trusted-gold backdrop-blur-sm bg-trusted-gold/30 shadow-lg">
            <Globe className="h-3 w-3 mr-1" />
            Global
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Left Side - Hero Text */}
          <div className={`space-y-4 sm:space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-trusted-gold via-yellow-400 to-trusted-gold bg-clip-text text-transparent animate-pulse drop-shadow-lg">
                {icoData.tokenName}
              </span>
              <br />
              <span className="text-white drop-shadow-lg font-bold">Token Sale</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-white max-w-lg leading-relaxed drop-shadow-lg font-medium">
              Join the future of decentralized trading with TRST tokens. 
              Secure your position in the next generation of financial technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-trusted-gold to-yellow-500 text-trusted-navy hover:from-yellow-500 hover:to-trusted-gold font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Coins className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Buy Tokens Now
              </Button>
              
              <Button variant="outline" size="lg" className="border-white/80 text-white hover:bg-white/40 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 bg-white/30 shadow-lg">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                View Whitepaper
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white font-medium">
              <div className="flex items-center space-x-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-trusted-gold" />
                <span>1,247 participants</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-trusted-gold" />
                <span>$8.8M raised</span>
              </div>
            </div>
          </div>

          {/* Right Side - Countdown & Price */}
          <div className={`space-y-4 sm:space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 flex items-center justify-center drop-shadow-lg">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-trusted-gold" />
                Sale Ends In
              </h3>
              
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/60 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-trusted-gold drop-shadow-lg">
                    {formatNumber(timeLeft.days)}
                  </div>
                  <div className="text-xs text-white drop-shadow-sm font-medium">Days</div>
                </div>
                
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/60 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-trusted-gold drop-shadow-lg">
                    {formatNumber(timeLeft.hours)}
                  </div>
                  <div className="text-xs text-white drop-shadow-sm font-medium">Hours</div>
                </div>
                
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/60 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-trusted-gold drop-shadow-lg">
                    {formatNumber(timeLeft.minutes)}
                  </div>
                  <div className="text-xs text-white drop-shadow-sm font-medium">Minutes</div>
                </div>
                
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/60 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-trusted-gold drop-shadow-lg">
                    {formatNumber(timeLeft.seconds)}
                  </div>
                  <div className="text-xs text-white drop-shadow-sm font-medium">Seconds</div>
                </div>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/40 shadow-lg">
              <div className="text-center space-y-2 sm:space-y-3">
                <h4 className="text-base sm:text-lg font-semibold text-white drop-shadow-lg">Token Price</h4>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-trusted-gold to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                  ${icoData.tokenPrice}
                </div>
                <p className="text-xs sm:text-sm text-white drop-shadow-sm font-medium">
                  Fixed price during ICO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 