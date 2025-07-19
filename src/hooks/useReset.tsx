import { useAuthenticatedStore } from 'src/stores/useAuthenticatedStore'
import { useChatHistoryStore } from 'src/stores/useChatHistoryStore'
import { useExtendedPurchaseStore } from 'src/stores/useExtendedPurchaseStore'
import { useProfileStore } from 'src/stores/useProfileStore'

export default function useReset() {
  const reset = () => {
    useAuthenticatedStore.setState({ isAuthenticated: false })
    useProfileStore.setState({ profile: null })
    useChatHistoryStore.setState({ chatHistory: [] })
    useExtendedPurchaseStore.setState({ extendedPurchase: [] })
  }
  return reset
}
