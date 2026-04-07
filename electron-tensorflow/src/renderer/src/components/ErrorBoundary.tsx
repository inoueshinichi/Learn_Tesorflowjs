import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // エラー時に表示する独自のUIを渡せるように拡張
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  // エラーが発生した際にステートを更新する
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  // エラー情報をログ出力するなど
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 開発中のデバッグ用にエラーを出力
    console.error('Uncaught error:', error, errorInfo)
  }

  render(): React.JSX.Element | React.ReactNode {
    if (this.state.hasError) {
      // エラー時に表示するUI
      return this.props.fallback || <h1>申し訳ありません。エラーが発生しました。</h1>
    }

    return this.props.children
  }
}


export default ErrorBoundary