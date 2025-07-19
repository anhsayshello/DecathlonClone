import { ChatHistory } from 'src/stores/useChatHistoryStore'
import { User } from 'src/types/user.type'

export const setAccessTokenToLS = (access_token: string) => localStorage.setItem('access_token', access_token)
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const localStorageEventTarget = new EventTarget()
export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  localStorage.removeItem('chat_history')
  const clearLSEvent = new Event('clearLS')
  localStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const setProfileToLS = (profile: User) => localStorage.setItem('profile', JSON.stringify(profile))
export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setChatHistoryToLS = (chat_history: ChatHistory[]) =>
  localStorage.setItem('chat_history', JSON.stringify(chat_history))
export const getChatHistoryFromLS = () => {
  const result = localStorage.getItem('chat_history')
  return result ? JSON.parse(result) : null
}
