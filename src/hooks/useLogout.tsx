import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import authApi from 'src/api/auth.api'
import { purchaseStatus } from 'src/constants/purchase'
import { useAuthenticatedStore } from 'src/stores/useAuthenticatedStore'
import { useChatHistoryStore } from 'src/stores/useChatHistoryStore'
import { useProfileStore } from 'src/stores/useProfileStore'

export default function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const logoutAccountMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      useAuthenticatedStore.setState({ isAuthenticated: false })
      useProfileStore.setState({ profile: null })
      useChatHistoryStore.setState({ chatHistory: [] })
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatus.cartPending }] })
      setTimeout(() => {
        navigate('/')
      }, 0)
    }
  })

  const handleLogout = () => {
    logoutAccountMutation.mutate()
  }
  return handleLogout
}
