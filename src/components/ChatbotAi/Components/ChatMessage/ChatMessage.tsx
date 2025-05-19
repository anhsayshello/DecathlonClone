import { useEffect, useRef } from 'react'

import { ChatHistory } from '../../ChatbotAi'
import ChatbotIcon from '../ChatbotIcon'

interface Props {
  chatHistory: ChatHistory[]
}
export default function ChatMessage({ chatHistory }: Props) {
  const chatBodyRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [chatHistory])
  return (
    <div
      ref={chatBodyRef}
      className='py-4 pl-3.5 pr-3.5 lg:pr-3 h-80 overflow-y-scroll scrollbar-thin wrap-anywhere
'
    >
      <div className='pb-1 text-[13px] text-center leading-4.5 align-middle px-2 text-[#99a3ad]'>
        Bắt đầu trò chuyện nhanh với Decathlon Việt Nam. Thông tin của bạn được ẩn và tin nhắn trò chuyện chỉ lưu trên
        trình duyệt web.
      </div>
      <div className='flex items-start gap-2 mt-3.5'>
        <div className='p-1 rounded-full bg-rose-200 shadow-md'>
          <ChatbotIcon className='w-5.5 aspect-1/1 relative' />
        </div>
        <div className='bg-[#f3f4f5] p-3 text-sm rounded-xl shadow-sm'>
          Xin chào! Decathlon Việt Nam rất vui được hỗ trợ bạn.
        </div>
      </div>
      {chatHistory.map((chat, index) => {
        return (
          !chat.hideInChat &&
          (chat.role === 'model' ? (
            <div key={index} className='flex items-start gap-2 mt-3.5'>
              <div className='p-1 rounded-full bg-rose-200 shadow-md'>
                <ChatbotIcon className='w-5.5 aspect-1/1 relative' />
              </div>
              <div className='bg-[#f3f4f5] p-3 text-sm rounded-xl shadow-sm'>{chat.text}</div>
            </div>
          ) : (
            <div key={index} className='flex justify-end ml-10 mt-3.5'>
              <div className='bg-cyan-200 p-3 text-sm rounded-xl shadow-sm'>{chat.text}</div>
            </div>
          ))
        )
      })}
    </div>
  )
}
