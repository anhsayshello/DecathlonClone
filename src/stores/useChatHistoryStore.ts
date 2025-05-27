import { getChatHistoryFromLS } from 'src/utils/auth'
import { create } from 'zustand'

export interface ChatHistory {
  hideInChat?: boolean
  role: string
  text: string
}

type ChatHistoryStore = {
  chatHistory: ChatHistory[]
  setChatHistory: (nextChatHistory: ChatHistory[] | ((currentChatHistory: ChatHistory[]) => ChatHistory[])) => void
}

export const useChatHistoryStore = create<ChatHistoryStore>((set) => ({
  chatHistory: getChatHistoryFromLS(),
  setChatHistory: (nextChatHistory) =>
    set((state) => ({
      chatHistory: typeof nextChatHistory === 'function' ? nextChatHistory(state.chatHistory) : nextChatHistory
    }))
}))
