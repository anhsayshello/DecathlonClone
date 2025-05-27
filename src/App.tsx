import 'src/index.css'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ToastContainer } from 'react-toastify'

import ChabotAi from './components/ChatbotAi'
import PageLoader from './components/PageLoader'
import Popup from './components/Popup'
import TimeOut from './components/TimeOut'
import useReset from './hooks/useReset'
import { useAuthenticatedStore } from './stores/useAuthenticatedStore'
import useRouteElements from './useRouteElements'
import { localStorageEventTarget } from './utils/auth'

function App() {
  const element = useRouteElements()
  const reset = useReset()
  const { isAuthenticated } = useAuthenticatedStore((state) => state)

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset)
    return () => localStorageEventTarget.removeEventListener('clearLS', reset)
  }, [reset])

  return (
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
      {isAuthenticated && (
        <TimeOut delay={1500}>
          <ChabotAi />
        </TimeOut>
      )}
      <PageLoader />
    </>
  )
}

export default App
