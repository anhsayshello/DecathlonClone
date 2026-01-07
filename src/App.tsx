import 'src/index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ToastContainer } from 'react-toastify'

import ErrorBoundary from './components/ErrorBoundary'
import PageLoader from './components/PageLoader'
import Popup from './components/Popup'
import TimeOut from './components/TimeOut'
import useReset from './hooks/useReset'
import { useAuthenticatedStore } from './stores/useAuthenticatedStore'
import useRouteElements from './useRouteElements'
import { localStorageEventTarget } from './utils/auth'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

function App() {
  const element = useRouteElements()
  const reset = useReset()
  const { isAuthenticated } = useAuthenticatedStore((state) => state)

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset)
    return () => localStorageEventTarget.removeEventListener('clearLS', reset)
  }, [reset])

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <>
          <ToastContainer />
          {element}
          {isAuthenticated &&
            createPortal(
              <TimeOut delay={300}>
                <Popup />
              </TimeOut>,
              document.body
            )}
          {!isAuthenticated &&
            createPortal(
              <TimeOut delay={300}>
                <Popup />
              </TimeOut>,
              document.body
            )}
          <PageLoader />
        </>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
