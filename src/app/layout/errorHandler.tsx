import React, { ErrorInfo } from 'react';
import { ErrorMessage } from '../message/errorMessage';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error boundary caught exception: ', error, errorInfo);
    this.setState({ hasError: true, message: `An error occured - ${(error && error.message) || ''}` });
  }

  render(): JSX.Element | React.ReactNode {
    if (this.state.hasError) {
      return <ErrorMessage message={this.state.message} />;
    }

    return this.props.children;
  }
}
