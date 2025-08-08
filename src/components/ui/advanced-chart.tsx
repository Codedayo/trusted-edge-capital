import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  LineChart, 
  CandlestickChart, 
  Activity,
  Settings,
  Fullscreen,
  Minimize,
  RefreshCw
} from 'lucide-react';

interface ChartData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface AdvancedChartProps {
  symbol: string;
  data: ChartData[];
  onTimeframeChange?: (timeframe: string) => void;
  onChartTypeChange?: (type: string) => void;
  className?: string;
}

export default function AdvancedChart({
  symbol,
  data,
  onTimeframeChange,
  onChartTypeChange,
  className = ''
}: AdvancedChartProps) {
  const [chartType, setChartType] = useState<'candlestick' | 'line' | 'area' | 'bar'>('candlestick');
  const [timeframe, setTimeframe] = useState('1D');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  const timeframes = [
    { value: '1m', label: '1m' },
    { value: '5m', label: '5m' },
    { value: '15m', label: '15m' },
    { value: '1h', label: '1h' },
    { value: '4h', label: '4h' },
    { value: '1D', label: '1D' },
    { value: '1W', label: '1W' },
    { value: '1M', label: '1M' }
  ];

  const chartTypes = [
    { value: 'candlestick', label: 'Candlestick', icon: CandlestickChart },
    { value: 'line', label: 'Line', icon: LineChart },
    { value: 'area', label: 'Area', icon: Activity },
    { value: 'bar', label: 'Bar', icon: BarChart3 }
  ];

  useEffect(() => {
    if (chartContainerRef.current && data.length > 0) {
      initializeChart();
    }
  }, [data, chartType, timeframe]);

  const initializeChart = () => {
    if (!chartContainerRef.current) return;

    // Clear existing chart
    if (chartRef.current) {
      chartRef.current.remove();
    }

    const container = chartContainerRef.current;
    container.innerHTML = '';

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple chart rendering (in production, use TradingView or Chart.js)
    renderChart(ctx, canvas.width, canvas.height);
  };

  const renderChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (data.length === 0) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate price range
    const prices = data.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Calculate time range
    const timeRange = data[data.length - 1].timestamp - data[0].timestamp;

    // Set up coordinate system
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Draw grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 5; i++) {
      const x = padding + (i / 5) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw price labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const price = maxPrice - (i / 5) * priceRange;
      const y = padding + (i / 5) * chartHeight;
      ctx.fillText(price.toFixed(2), padding - 5, y + 4);
    }

    // Draw chart based on type
    switch (chartType) {
      case 'candlestick':
        renderCandlestickChart(ctx, data, padding, chartWidth, chartHeight, minPrice, priceRange);
        break;
      case 'line':
        renderLineChart(ctx, data, padding, chartWidth, chartHeight, minPrice, priceRange);
        break;
      case 'area':
        renderAreaChart(ctx, data, padding, chartWidth, chartHeight, minPrice, priceRange);
        break;
      case 'bar':
        renderBarChart(ctx, data, padding, chartWidth, chartHeight, minPrice, priceRange);
        break;
    }

    // Draw volume bars at bottom
    renderVolumeChart(ctx, data, padding, chartWidth, chartHeight);
  };

  const renderCandlestickChart = (
    ctx: CanvasRenderingContext2D,
    data: ChartData[],
    padding: number,
    chartWidth: number,
    chartHeight: number,
    minPrice: number,
    priceRange: number
  ) => {
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length;

    data.forEach((d, i) => {
      const x = padding + i * barSpacing + barSpacing / 2 - barWidth / 2;
      const openY = padding + chartHeight - ((d.open - minPrice) / priceRange) * chartHeight;
      const closeY = padding + chartHeight - ((d.close - minPrice) / priceRange) * chartHeight;
      const highY = padding + chartHeight - ((d.high - minPrice) / priceRange) * chartHeight;
      const lowY = padding + chartHeight - ((d.low - minPrice) / priceRange) * chartHeight;

      // Draw wick
      ctx.strokeStyle = d.close >= d.open ? '#10b981' : '#ef4444';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + barWidth / 2, highY);
      ctx.lineTo(x + barWidth / 2, lowY);
      ctx.stroke();

      // Draw body
      ctx.fillStyle = d.close >= d.open ? '#10b981' : '#ef4444';
      ctx.fillRect(x, Math.min(openY, closeY), barWidth, Math.abs(closeY - openY));
    });
  };

  const renderLineChart = (
    ctx: CanvasRenderingContext2D,
    data: ChartData[],
    padding: number,
    chartWidth: number,
    chartHeight: number,
    minPrice: number,
    priceRange: number
  ) => {
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((d, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((d.close - minPrice) / priceRange) * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  };

  const renderAreaChart = (
    ctx: CanvasRenderingContext2D,
    data: ChartData[],
    padding: number,
    chartWidth: number,
    chartHeight: number,
    minPrice: number,
    priceRange: number
  ) => {
    // Draw area fill
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.beginPath();

    data.forEach((d, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((d.close - minPrice) / priceRange) * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((d, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((d.close - minPrice) / priceRange) * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  };

  const renderBarChart = (
    ctx: CanvasRenderingContext2D,
    data: ChartData[],
    padding: number,
    chartWidth: number,
    chartHeight: number,
    minPrice: number,
    priceRange: number
  ) => {
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length;

    data.forEach((d, i) => {
      const x = padding + i * barSpacing + barSpacing / 2 - barWidth / 2;
      const height = ((d.close - minPrice) / priceRange) * chartHeight;
      const y = padding + chartHeight - height;

      ctx.fillStyle = d.close >= d.open ? '#10b981' : '#ef4444';
      ctx.fillRect(x, y, barWidth, height);
    });
  };

  const renderVolumeChart = (
    ctx: CanvasRenderingContext2D,
    data: ChartData[],
    padding: number,
    chartWidth: number,
    chartHeight: number
  ) => {
    const maxVolume = Math.max(...data.map(d => d.volume));
    const volumeHeight = 60;
    const volumeY = padding + chartHeight + 20;

    ctx.fillStyle = '#64748b';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Volume', width / 2, volumeY - 5);

    data.forEach((d, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const height = (d.volume / maxVolume) * volumeHeight;
      const y = volumeY + volumeHeight - height;

      ctx.fillStyle = d.close >= d.open ? '#10b981' : '#ef4444';
      ctx.fillRect(x - 2, y, 4, height);
    });
  };

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
    onTimeframeChange?.(value);
  };

  const handleChartTypeChange = (value: string) => {
    setChartType(value as any);
    onChartTypeChange?.(value);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const refreshData = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className={`${className} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-lg font-semibold">{symbol}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {timeframe}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={timeframe} onValueChange={handleTimeframeChange}>
            <SelectTrigger className="w-24 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((tf) => (
                <SelectItem key={tf.value} value={tf.value}>
                  {tf.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={chartType} onValueChange={handleChartTypeChange}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {chartTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center space-x-2">
                    <type.icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Fullscreen className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div 
          ref={chartContainerRef}
          className="w-full h-96 bg-white dark:bg-slate-900 relative"
        >
          {data.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-500">
              No data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 