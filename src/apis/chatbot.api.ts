import axios from 'axios'
import ChatbotResponse from 'src/types/chatbot.type'

const chatbotApi = (contents: { role: string; parts: { text: string }[] }[]) =>
  axios.post<ChatbotResponse>(import.meta.env.VITE_GEMINI_API_KEY, JSON.stringify({ contents }), {
    headers: { 'Content-Type': 'application/json' }
  })

export default chatbotApi
