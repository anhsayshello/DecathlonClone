import { preload } from 'react-dom'
import chatbotIcon from 'src/assets/images/cap.png'
interface Props {
  className: string
}
export default function ChatbotIcon({ className }: Props) {
  preload(chatbotIcon, { as: 'image' })
  return (
    <div className={className}>
      <img className='w-full h-full absolute object-cover' src={chatbotIcon} alt='chatbotIcon' />
    </div>
  )
}
