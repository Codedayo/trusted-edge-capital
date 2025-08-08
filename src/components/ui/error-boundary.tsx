import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Bug, 
  Copy, 
  Send,
  ArrowLeft
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      showDetails: false
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to external service (e.g., Sentry, LogRocket)
    this.logError(error, errorInfo);
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    try {
      // In production, send to your error tracking service
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };

      // Example: Send to your API endpoint
      // fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorData)
      // });

      console.error('Error logged:', errorData);
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleGoBack = () => {
    window.history.back();
  };

  private handleCopyError = () => {
    const errorText = `
Error: ${this.state.error?.message}
Stack: ${this.state.error?.stack}
Component Stack: ${this.state.errorInfo?.componentStack}
URL: ${window.location.href}
Timestamp: ${new Date().toISOString()}
    `.trim();

    navigator.clipboard.writeText(errorText);
    toast({
      title: "Error Details Copied",
      description: "Error information has been copied to clipboard.",
    });
  };

  private handleReportError = () => {
    const errorData = {
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };

    // In production, send to your support system
    console.log('Error report:', errorData);
    
    toast({
      title: "Error Reported",
      description: "Thank you for reporting this error. Our team will investigate.",
    });
  };

  private toggleDetails = () => {
    this.setState(prev => ({
      showDetails: !prev.showDetails
    }));
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Something went wrong
              </CardTitle>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                We encountered an unexpected error. Please try again or contact support if the problem persists.
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={this.handleRetry} className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={this.handleGoBack} className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={this.handleGoHome} className="flex-1">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
                <Button variant="outline" onClick={this.handleReportError} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Report Error
                </Button>
              </div>

              {this.state.error && (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={this.toggleDetails}
                    className="w-full justify-between"
                  >
                    <span className="flex items-center">
                      <Bug className="h-4 w-4 mr-2" />
                      {this.state.showDetails ? 'Hide' : 'Show'} Error Details
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {this.state.showDetails ? 'Hide' : 'Show'}
                    </Badge>
                  </Button>

                  {this.state.showDetails && (
                    <div className="space-y-2">
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Error Message
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={this.handleCopyError}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-mono break-all">
                          {this.state.error.message}
                        </p>
                      </div>

                      {this.state.error.stack && (
                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
                            Stack Trace
                          </span>
                          <pre className="text-xs text-slate-600 dark:text-slate-400 overflow-auto max-h-32">
                            {this.state.error.stack}
                          </pre>
                        </div>
                      )}

                      {this.state.errorInfo?.componentStack && (
                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
                            Component Stack
                          </span>
                          <pre className="text-xs text-slate-600 dark:text-slate-400 overflow-auto max-h-32">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="text-center text-xs text-slate-500">
                <p>Error ID: {this.state.error?.message?.slice(0, 8) || 'unknown'}</p>
                <p>Time: {new Date().toLocaleTimeString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for functional components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// Hook for functional components to throw errors
export function useErrorHandler() {
  return (error: Error) => {
    console.error('Error thrown from hook:', error);
    throw error;
  };
} 