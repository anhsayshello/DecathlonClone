import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className='grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
          <div className='text-center'>
            <p className='text-base font-semibold text-blue'>500</p>
            <h1 className='mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl'>
              Error!
            </h1>
            <p className='mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8'>
              The page you are looking for does not exist.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <a
                href='/'
                className='rounded-md bg-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-hard transition-all duration-250 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Go back home
              </a>
            </div>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}
