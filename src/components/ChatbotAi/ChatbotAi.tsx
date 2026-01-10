// import { autoUpdate, flip, offset, shift, useClick, useFloating, useInteractions } from '@floating-ui/react'
// import { FloatingPortal } from '@floating-ui/react'
// import { useMutation } from '@tanstack/react-query'
// import { AnimatePresence, motion, useDragControls } from 'motion/react'
// import { useEffect, useRef, useState } from 'react'
// import chatbotApi from 'src/apis/chatbot.api'
// import useViewport from 'src/hooks/useViewport'
// import { ChatHistory, useChatHistoryStore } from 'src/stores/useChatHistoryStore'
// import { setChatHistoryToLS } from 'src/utils/auth'

// import ChatbotIcon from './Components/ChatbotIcon'
// import ChatForm from './Components/ChatForm'
// import ChatMessage from './Components/ChatMessage'

// export default function ChatbotAi() {
//   const controls = useDragControls()
//   const constraintsRef = useRef(null)
//   const viewport = useViewport()
//   const [isOpen, setIsOpen] = useState(false)
//   const { chatHistory, setChatHistory } = useChatHistoryStore((state) => state)

//   useEffect(() => {
//     setChatHistoryToLS(chatHistory)
//   }, [chatHistory])

//   const { refs, floatingStyles, context } = useFloating({
//     open: isOpen,
//     onOpenChange: setIsOpen,
//     middleware: [
//       offset({
//         mainAxis: viewport.tablet ? 5 : 3
//       }),
//       shift(),
//       flip({ fallbackAxisSideDirection: 'end' })
//     ],
//     whileElementsMounted: autoUpdate
//   })

//   const click = useClick(context)
//   const { getReferenceProps, getFloatingProps } = useInteractions([click])

//   const chatBotMutation = useMutation({
//     mutationFn: chatbotApi
//   })
//   const generateBotResponse = (history: ChatHistory[]) => {
//     const dataHistory = history.map(({ role, text }) => ({ role, parts: [{ text }] }))
//     chatBotMutation.mutate(dataHistory, {
//       onSuccess: (data) => {
//         setChatHistory((prev) => [
//           ...prev.filter((msg) => msg.text !== 'Thinking...'),
//           { role: 'model', text: data.data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1').trim() }
//         ])
//       },
//       onError: () =>
//         setChatHistory((prev) => [
//           ...prev.filter((msg) => msg.text !== 'Thinking...'),
//           {
//             role: 'model',
//             text: `Error! Please try again.`
//           }
//         ])
//     })
//   }
//   return (
//     <div>
//       <div ref={constraintsRef} className='fixed inset-0 -z-1'></div>
//       <motion.div
//         drag
//         dragControls={controls}
//         onPointerDown={(event) => {
//           controls.start(event)
//         }}
//         whileDrag={{ scale: 1.2 }}
//         dragConstraints={constraintsRef}
//         style={{ touchAction: 'auto' }}
//         ref={refs.setReference}
//         {...getReferenceProps()}
//         className='fixed top-26 xs:top-32 lg:top-142 right-2 md:right-3 lg:right-6 cursor-pointer z-50'
//       >
//         <div className='p-2 bg-white rounded-full shadow-xl border border-gray-100'>
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             width='24'
//             height='24'
//             viewBox='0 0 24 24'
//             fill='none'
//             stroke='currentColor'
//             strokeWidth='2'
//             strokeLinecap='round'
//             strokeLinejoin='round'
//             className='lucide lucide-message-circle-icon lucide-message-circle text-rose-500'
//           >
//             <path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />
//           </svg>
//         </div>
//       </motion.div>
//       <AnimatePresence>
//         {isOpen && (
//           <FloatingPortal>
//             <motion.div
//               ref={refs.setFloating}
//               style={floatingStyles}
//               {...getFloatingProps()}
//               className='z-50'
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ ease: 'easeInOut', duration: 0.2 }}
//               exit={{ opacity: 0 }}
//             >
//               <div className='w-80 bg-white rounded-md shadow-lg'>
//                 <div className='py-2 px-4 bg-rose-500 flex items-center justify-between rounded-t-sm shadow-md'>
//                   <div className='flex items-center gap-2'>
//                     <ChatbotIcon className='w-7 aspect-149/150 relative' />
//                     <div className='text-white'>chatbot</div>
//                   </div>
//                   <button
//                     aria-label='close-chatbot'
//                     onClick={() => setIsOpen(false)}
//                     className='bg-white/20 hover:bg-white/30 cursor-pointer rounded-full'
//                   >
//                     <svg
//                       xmlns='http://www.w3.org/2000/svg'
//                       fill='none'
//                       viewBox='0 0 24 24'
//                       strokeWidth={1.5}
//                       stroke='currentColor'
//                       className='size-7 text-white'
//                     >
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
//                       />
//                     </svg>
//                   </button>
//                 </div>
//                 <ChatMessage chatHistory={chatHistory} />

//                 <div
//                   style={{ boxShadow: '0 -1px 4px 0px rgba(0, 0, 0, 0.1)' }}
//                   className='w-full py-2 px-3 border-t border-gray-200'
//                 >
//                   <ChatForm
//                     isOpen={isOpen}
//                     chatHistory={chatHistory}
//                     setChatHistory={setChatHistory}
//                     generateBotResponse={generateBotResponse}
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           </FloatingPortal>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }
