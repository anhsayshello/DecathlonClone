import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router'
import authApi from 'src/api/auth.api'
import { ChatHistory } from 'src/components/ChatbotAi/ChatbotAi'
import { purchaseStatus } from 'src/constants/purchase'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAcessTokenFromLS, getChatHistoryFromLS, getProfileFromLS } from 'src/utils/auth'
import { useMediaQuery } from 'usehooks-ts'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  chatHistory: ChatHistory[]
  setChatHistory: React.Dispatch<React.SetStateAction<ChatHistory[]>>
  handleLogout: () => void
  reset: () => void
  viewport: { desktop: boolean; tablet: boolean }
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAcessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchase: [],
  setExtendedPurchase: () => null,
  chatHistory: getChatHistoryFromLS(),
  setChatHistory: () => null,
  handleLogout: () => null,
  reset: () => null,
  viewport: { desktop: false, tablet: false }
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchase)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(initialAppContext.chatHistory)

  // handle logout
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const logoutAccountMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      setChatHistory([])
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatus.cartPending }] })
      setTimeout(() => {
        navigate('/')
      }, 0)
    }
  })
  const handleLogout = () => {
    logoutAccountMutation.mutate()
  }

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
    setChatHistory([])
    setExtendedPurchase([])
  }

  const viewport = {
    desktop: useMediaQuery('(min-width: 1024px)'),
    tablet: useMediaQuery('(min-width: 768px)')
  }

  return (
    <AppContext
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchase,
        setExtendedPurchase,
        chatHistory,
        setChatHistory,
        handleLogout,
        reset,
        viewport
      }}
    >
      {children}
    </AppContext>
  )
}
