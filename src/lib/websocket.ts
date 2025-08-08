import { toast } from '@/hooks/use-toast';

export interface PriceUpdate {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  timestamp: number;
}

export interface TradeUpdate {
  symbol: string;
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
  timestamp: number;
}

export interface OrderBookUpdate {
  symbol: string;
  bids: [number, number][];
  asks: [number, number][];
  timestamp: number;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private subscribers: Map<string, Set<(data: any) => void>> = new Map();
  private isConnected = false;

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      // In production, use your actual WebSocket endpoint
      const wsUrl = import.meta.env.VITE_WEBSOCKET_URL || 'wss://echo.websocket.org';
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.subscribeToDefaultChannels();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('WebSocket message parsing error:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.isConnected = false;
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
      
      setTimeout(() => {
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error('Max reconnection attempts reached');
      toast({
        title: "Connection Error",
        description: "Unable to connect to real-time data. Please refresh the page.",
        variant: "destructive",
      });
    }
  }

  private subscribeToDefaultChannels() {
    // Subscribe to major crypto pairs
    const defaultSymbols = ['BTC/USD', 'ETH/USD', 'USDT/USD', 'AAPL', 'TSLA'];
    defaultSymbols.forEach(symbol => {
      this.subscribe('price', symbol);
    });
  }

  private handleMessage(data: any) {
    const { type, symbol, ...payload } = data;
    const channel = `${type}:${symbol}`;
    
    if (this.subscribers.has(channel)) {
      this.subscribers.get(channel)?.forEach(callback => {
        try {
          callback(payload);
        } catch (error) {
          console.error('Subscriber callback error:', error);
        }
      });
    }
  }

  public subscribe(type: 'price' | 'trades' | 'orderbook', symbol: string, callback: (data: any) => void) {
    const channel = `${type}:${symbol}`;
    
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, new Set());
    }
    
    this.subscribers.get(channel)?.add(callback);

    // Send subscription message to server
    if (this.isConnected && this.ws) {
      this.ws.send(JSON.stringify({
        action: 'subscribe',
        channel: type,
        symbol: symbol
      }));
    }

    return () => {
      this.subscribers.get(channel)?.delete(callback);
      if (this.subscribers.get(channel)?.size === 0) {
        this.subscribers.delete(channel);
      }
    };
  }

  public unsubscribe(type: 'price' | 'trades' | 'orderbook', symbol: string) {
    const channel = `${type}:${symbol}`;
    this.subscribers.delete(channel);

    if (this.isConnected && this.ws) {
      this.ws.send(JSON.stringify({
        action: 'unsubscribe',
        channel: type,
        symbol: symbol
      }));
    }
  }

  public sendMessage(message: any) {
    if (this.isConnected && this.ws) {
      this.ws.send(JSON.stringify(message));
    }
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
    this.subscribers.clear();
  }

  public getConnectionStatus() {
    return this.isConnected;
  }
}

// Create singleton instance
export const websocketService = new WebSocketService();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    websocketService.disconnect();
  });
} 