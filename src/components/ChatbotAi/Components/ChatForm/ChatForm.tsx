import { useEffect, useRef } from 'react'

import { ChatHistory } from '../../ChatbotAi'

interface Props {
  isOpen: boolean
  chatHistory: ChatHistory[]
  setChatHistory: React.Dispatch<React.SetStateAction<ChatHistory[]>>
  generateBotResponse: (history: ChatHistory[]) => void
}

export default function ChatForm({ isOpen, chatHistory, setChatHistory, generateBotResponse }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (inputRef.current) {
      const userMessage = inputRef.current.value.trim()
      if (!userMessage) return
      inputRef.current.value = ''
      setChatHistory((history) => [...history, { role: 'user', text: userMessage }])

      setTimeout(() => {
        setChatHistory((history) => [...history, { role: 'model', text: 'Thinking...' }])
        generateBotResponse([
          ...chatHistory,
          {
            role: 'user',
            text: `Dựa trên thông tin đã cung cấp, hãy vào vai Orca trả lời câu hỏi từ người dùng: ${userMessage}`
          }
        ])
      }, 250)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='bg-gray-200 relative rounded-3xl flex items-center justify-between py-3 px-4'>
        <input
          ref={inputRef}
          className='outline-none text-sm w-[90%]'
          placeholder='Type your message here...'
          type='text'
        />
        <button
          aria-label='submmit'
          type='submit'
          className='py-3 px-3 absolute right-0 cursor-pointer hover:bg-rose-50 rounded-full'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5 text-rose-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
