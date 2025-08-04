import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3, 
  DollarSign,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Award,
  Lock,
  Quote,
  Target,
  Rocket,
  Crown,
  Gauge,
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Trading quotes data
const tradingQuotes = [
  {
    quote: "The stock market is a device for transferring money from the impatient to the patient.",
    author: "Warren Buffett",
    title: "Berkshire Hathaway",
    icon: Crown
  },
  {
    quote: "The most important quality for an investor is temperament, not intellect.",
    author: "Warren Buffett",
    title: "Investment Legend",
    icon: Target
  },
  {
    quote: "Risk comes from not knowing what you're doing.",
    author: "Warren Buffett",
    title: "Oracle of Omaha",
    icon: Shield
  },
  {
    quote: "The individual investor should act consistently as an investor and not as a speculator.",
    author: "John C. Bogle",
    title: "Vanguard Founder",
    icon: Gauge
  },
  {
    quote: "In the short run, the market is a voting machine, but in the long run, it is a weighing machine.",
    author: "Benjamin Graham",
    title: "Father of Value Investing",
    icon: BarChart3
  },
  {
    quote: "The best investment you can make is in yourself.",
    author: "Warren Buffett",
    title: "Investment Legend",
    icon: TrendingUp
  },
  {
    quote: "Price is what you pay. Value is what you get.",
    author: "Warren Buffett",
    title: "Berkshire Hathaway",
    icon: DollarSign
  },
  {
    quote: "The market can remain irrational longer than you can remain solvent.",
    author: "John Maynard Keynes",
    title: "Economist",
    icon: Activity
  }
];

export default function Index() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Auto-rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % tradingQuotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % tradingQuotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + tradingQuotes.length) % tradingQuotes.length);
  };

  const currentQuote = tradingQuotes[currentQuoteIndex];
  const IconComponent = currentQuote.icon;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/Trusted Edge Capital Logo.png" 
                alt="Trusted Edge Capital" 
                className="h-8 w-auto"
              />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Trusted Edge Capital
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Professional Trading Platform
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="outline" className="border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:opacity-90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-yellow-500 text-slate-900 font-semibold">
              Professional Trading Platform
            </Badge>
            
            {/* Sliding Quotes Carousel */}
            <div className="mb-8 relative">
              <div className="p-8 bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-yellow-500/20 backdrop-blur-sm transition-all duration-500 ease-in-out">
                <Quote className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
                <p className="text-lg md:text-xl text-slate-900 dark:text-slate-200 italic mb-4 min-h-[4rem] flex items-center justify-center">
                  "{currentQuote.quote}"
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-slate-900" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{currentQuote.author}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{currentQuote.title}</p>
                  </div>
                </div>
                
                {/* Navigation Dots */}
                <div className="flex justify-center space-x-2 mt-6">
                  {tradingQuotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuoteIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentQuoteIndex 
                          ? 'bg-yellow-500 w-6' 
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevQuote}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-700" />
                </button>
                <button
                  onClick={nextQuote}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronRight className="h-5 w-5 text-slate-700" />
                </button>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                Trade Crypto & Stocks
              </span>
              <br />
              <span className="text-slate-900 dark:text-slate-100">
                Like a Pro
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Advanced trading platform for cryptocurrency and stock markets. 
              Professional tools, real-time data, and secure trading environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:opacity-90 text-lg px-8 py-4 h-14">
                  Start Trading Now
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white text-lg px-8 py-4 h-14">
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Bank-Grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>Regulated Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>50K+ Traders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-slate-100">
              Why Choose Trusted Edge Capital?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Professional-grade trading tools designed for both beginners and experienced traders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-slate-50 to-blue-50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Advanced Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Professional trading tools with real-time market data, advanced order types, 
                  and comprehensive portfolio management.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Bank-grade security with multi-factor authentication, cold storage, 
                  and insurance protection for your assets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ultra-low latency trading with high-frequency execution and 
                  real-time price updates across all markets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Global Markets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Access to major cryptocurrency exchanges and global stock markets 
                  with competitive fees and deep liquidity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Professional charting tools, technical indicators, and 
                  portfolio analytics to make informed trading decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Competitive Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Low trading fees, transparent pricing, and volume-based discounts 
                  to maximize your trading profits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-slate-100">
              Trade Multiple Asset Classes
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Access to the world's most popular cryptocurrencies and stocks
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Cryptocurrency Trading</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-600 dark:text-slate-300">Bitcoin, Ethereum, and 100+ altcoins</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-600 dark:text-slate-300">Spot and margin trading</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-600 dark:text-slate-300">Advanced order types (limit, stop-loss)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-600 dark:text-slate-300">Real-time market data</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-600 dark:text-slate-300">Secure wallet integration</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Stock Trading</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-600 dark:text-slate-300">US and international stocks</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-600 dark:text-slate-300">Fractional share trading</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-600 dark:text-slate-300">Market and limit orders</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-600 dark:text-slate-300">Real-time quotes and charts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-600 dark:text-slate-300">Dividend tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
              <div className="text-4xl font-bold text-slate-900 dark:text-blue-600 mb-2">$2.5B+</div>
              <p className="text-slate-600 dark:text-slate-300">Trading Volume</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <p className="text-slate-600 dark:text-slate-300">Active Traders</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8">
              <div className="text-4xl font-bold text-yellow-600 mb-2">150+</div>
              <p className="text-slate-600 dark:text-slate-300">Trading Pairs</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <p className="text-slate-600 dark:text-slate-300">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of traders who trust our platform for their cryptocurrency 
            and stock trading needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:opacity-90 text-lg px-8 py-4 h-14">
                Create Free Account
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-4 h-14">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/Trusted Edge Capital Logo.png" 
                  alt="Trusted Edge Capital" 
                  className="h-8 w-auto"
                />
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">Trusted Edge Capital</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Professional Trading</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Professional trading platform for cryptocurrency and stock markets.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Platform</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>Trading</li>
                <li>Markets</li>
                <li>Analytics</li>
                <li>API</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Support</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Status</li>
                <li>Documentation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Legal</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Security</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-slate-700 mt-12 pt-8 text-center text-slate-500 dark:text-slate-300">
            <p>&copy; 2024 Trusted Edge Capital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
