"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);

    // Here you could send error to monitoring service
    // Example: Sentry.captureException(error, { contexts: { errorInfo } });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <div className="bg-destructive/10 mb-6 rounded-full p-4">
            <AlertTriangle className="text-destructive h-12 w-12" />
          </div>

          <h2 className="mb-2 text-2xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            We encountered an unexpected error. Please try refreshing the page
            or contact support if the problem persists.
          </p>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="bg-muted mb-6 w-full max-w-lg rounded-lg p-4 text-left">
              <summary className="cursor-pointer font-medium">
                Error Details
              </summary>
              <pre className="text-muted-foreground mt-2 overflow-auto text-xs">
                {this.state.error.stack}
              </pre>
            </details>
          )}

          <div className="flex gap-3">
            <Button onClick={this.handleReset} variant="outline">
              Try Again
            </Button>
            <Button onClick={this.handleReload}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
