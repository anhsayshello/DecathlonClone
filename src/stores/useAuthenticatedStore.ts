import { getAccessTokenFromLS } from 'src/utils/auth'
import { create } from 'zustand'

type AuthenticatedStore = {
  isAuthenticated: boolean
}

export const useAuthenticatedStore = create<AuthenticatedStore>(() => ({
  isAuthenticated: Boolean(getAccessTokenFromLS())
}))
