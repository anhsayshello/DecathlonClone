import { Dialog } from '@base-ui-components/react/dialog'
import { FloatingOverlay, FloatingPortal, useClick, useFloating, useInteractions } from '@floating-ui/react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import AlerDialog from 'src/components/AlertDialog'
import path from 'src/constants/path'
import useSearchProduct from 'src/hooks/useSearchProduct'

interface Props {
  totalPurchases: number
  isAuthenticated: boolean
}
export default function MobileTabletHeader({ totalPurchases, isAuthenticated }: Props) {
  const [openSearcher, setOpenSearcher] = useState(false)
  const [openNavigation, setOpenNavigation] = useState(false)
  const { register, handleSearcher } = useSearchProduct()

  const { refs, floatingStyles, context } = useFloating({
    open: openSearcher,
    onOpenChange: setOpenSearcher
  })

  const click = useClick(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSearcher(e)
    setOpenSearcher(false)
  }

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(path.home)
    setOpenSearcher(false)
    setOpenNavigation(false)
  }

  return (
    <div id='mobileTabletHeader'>
      <div className='bg-white shadow-sm px-4 py-3.5 md:pl-14 md:pr-10 fixed top-0 w-full z-25'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center md:flex-2'>
            <div className='md:flex-1 pt-1 pl-1'>
              <Dialog.Root modal={true} open={openNavigation} onOpenChange={setOpenNavigation}>
                <Dialog.Trigger aria-label='navigation'>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    strokeWidth='1.5'
                    aria-hidden='false'
                  >
                    <path
                      d='M2.75 12H21.25M2.75 5.75H21.25M2.75 18.25H21.25'
                      stroke='currentColor'
                      strokeLinecap='square'
                    ></path>
                  </svg>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Backdrop
                    onPointerDown={(e) => e.preventDefault()}
                    render={<div className='bg-black opacity-50 fixed inset-0 z-26'></div>}
                  />
                  <div className='fixed inset-0 z-30'>
                    <Dialog.Popup>
                      <motion.div
                        className='bg-white h-screen w-[84%] absolute top-0 left-0'
                        key='modal'
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ x: '0', opacity: 1 }}
                        transition={{ ease: 'easeInOut', duration: 0.3 }}
                      >
                        <div className='px-6 pt-6 flex items-center justify-between'>
                          <svg
                            viewBox='0 0 188 28'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            height='28'
                            aria-hidden='true'
                          >
                            <path
                              d='M57.9108 23.8H71.1548V19.544H62.9508V15.974H70.2169V12.012H62.9508V8.442H71.1548V4.2H57.9108V23.8ZM87.5909 15.358C85.6728 18.41 83.8108 19.684 81.4168 19.684C78.3088 19.684 76.5028 17.5 76.5028 13.706C76.5028 10.108 78.1688 8.316 80.7309 8.316C82.4248 8.316 83.8248 9.072 84.2589 11.592H89.2989C88.7528 6.79 85.6869 3.808 80.7868 3.808C75.1028 3.808 71.3648 7.82599 71.3648 13.986C71.3648 20.188 75.1028 24.192 81.2488 24.192C85.2669 24.192 87.9968 22.512 89.8028 20.244H96.6768V23.8H101.689V4.2H94.5769L87.5909 15.358ZM96.6768 16.31H92.2388L96.6768 9.1V16.31ZM47.1588 4.2H39.7948V23.8H47.1588C52.9969 23.8 56.7628 19.95 56.7628 14C56.7628 8.05 52.9969 4.2 47.1588 4.2ZM47.0888 19.544H44.8348V8.442H47.0888C50.0008 8.442 51.6388 10.5 51.6388 14C51.6388 17.486 50.0008 19.544 47.0888 19.544ZM159.537 3.808C153.615 3.808 149.639 7.826 149.639 14C149.639 20.174 153.615 24.192 159.537 24.192C165.473 24.192 169.435 20.174 169.435 14C169.435 7.82601 165.473 3.808 159.537 3.808ZM159.537 19.684C156.625 19.684 154.791 17.738 154.791 14C154.791 10.262 156.625 8.316 159.537 8.316C162.463 8.316 164.283 10.262 164.283 14C164.283 17.738 162.463 19.684 159.537 19.684ZM102.949 8.442H107.891V23.8H112.931V8.442H117.873V4.2H102.949L102.949 8.442ZM182.301 4.2V14.994L175.805 4.2H170.583V23.8H175.455V12.558L182.217 23.8H187.173V4.2L182.301 4.2ZM142.499 4.2H137.459V23.8H150.101V19.558H142.499V4.2ZM130.963 11.676H124.173V4.2H119.133V23.8H124.173V15.904H130.963V23.8H136.003V4.2H130.963V11.676Z'
                              fill='#3643BA'
                            ></path>
                            <path
                              d='M25.5711 0C14.6267 0 1.01309 11.3236 1.01309 20.7085C1.01309 25.5554 4.73612 28 9.65333 28C13.264 28 17.6333 26.6794 21.848 24.1365V5.40893C20.7241 7.33366 15.4416 15.0888 11.1987 19.2193C9.03518 21.3266 7.32118 22.2398 5.84602 22.2398C4.18821 22.2398 3.40146 21.1159 3.40146 19.4441C3.40146 11.8575 16.1722 1.99498 24.6298 1.99498C28.114 1.99498 30.3618 3.54039 30.3618 6.54692C30.3618 9.30055 28.4933 12.7566 25.3041 15.9458V21.7481C30.8676 17.3507 34.1972 11.7451 34.1972 7.22127C34.1972 2.4586 30.4883 0 25.5711 0Z'
                              fill='#3643BA'
                            ></path>
                          </svg>
                          <Dialog.Close
                            render={
                              <svg
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                width='28'
                                height='28'
                                strokeWidth='1.5'
                                aria-hidden='true'
                              >
                                <path d='M17.7 6.3L6.30005 17.7M17.7 17.7L6.30005 6.3' stroke='currentColor'></path>
                              </svg>
                            }
                          />
                        </div>
                        <div className='mt-6 px-12 flex flex-col'>
                          <button onClick={handleNavigate} className='flex items-end justify-between'>
                            <div className='flex items-end gap-3'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.6}
                                stroke='currentColor'
                                className='size-7'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                                />
                              </svg>
                              <div className='text-2xl font-bold leading-6'>Home</div>
                            </div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.6}
                              stroke='currentColor'
                              className='size-7'
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    </Dialog.Popup>
                  </div>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
            <Link to={path.home} onClick={() => setOpenSearcher(false)} aria-label='Trang chủ' title='Trang chủ'>
              <svg
                className='ml-2 h-[23px] md:h-[28px] md:grow md:flex-1'
                viewBox='0 0 188 28'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
              >
                <path
                  d='M57.9108 23.8H71.1548V19.544H62.9508V15.974H70.2169V12.012H62.9508V8.442H71.1548V4.2H57.9108V23.8ZM87.5909 15.358C85.6728 18.41 83.8108 19.684 81.4168 19.684C78.3088 19.684 76.5028 17.5 76.5028 13.706C76.5028 10.108 78.1688 8.316 80.7309 8.316C82.4248 8.316 83.8248 9.072 84.2589 11.592H89.2989C88.7528 6.79 85.6869 3.808 80.7868 3.808C75.1028 3.808 71.3648 7.82599 71.3648 13.986C71.3648 20.188 75.1028 24.192 81.2488 24.192C85.2669 24.192 87.9968 22.512 89.8028 20.244H96.6768V23.8H101.689V4.2H94.5769L87.5909 15.358ZM96.6768 16.31H92.2388L96.6768 9.1V16.31ZM47.1588 4.2H39.7948V23.8H47.1588C52.9969 23.8 56.7628 19.95 56.7628 14C56.7628 8.05 52.9969 4.2 47.1588 4.2ZM47.0888 19.544H44.8348V8.442H47.0888C50.0008 8.442 51.6388 10.5 51.6388 14C51.6388 17.486 50.0008 19.544 47.0888 19.544ZM159.537 3.808C153.615 3.808 149.639 7.826 149.639 14C149.639 20.174 153.615 24.192 159.537 24.192C165.473 24.192 169.435 20.174 169.435 14C169.435 7.82601 165.473 3.808 159.537 3.808ZM159.537 19.684C156.625 19.684 154.791 17.738 154.791 14C154.791 10.262 156.625 8.316 159.537 8.316C162.463 8.316 164.283 10.262 164.283 14C164.283 17.738 162.463 19.684 159.537 19.684ZM102.949 8.442H107.891V23.8H112.931V8.442H117.873V4.2H102.949L102.949 8.442ZM182.301 4.2V14.994L175.805 4.2H170.583V23.8H175.455V12.558L182.217 23.8H187.173V4.2L182.301 4.2ZM142.499 4.2H137.459V23.8H150.101V19.558H142.499V4.2ZM130.963 11.676H124.173V4.2H119.133V23.8H124.173V15.904H130.963V23.8H136.003V4.2H130.963V11.676Z'
                  fill='#3643BA'
                ></path>
                <path
                  d='M25.5711 0C14.6267 0 1.01309 11.3236 1.01309 20.7085C1.01309 25.5554 4.73612 28 9.65333 28C13.264 28 17.6333 26.6794 21.848 24.1365V5.40893C20.7241 7.33366 15.4416 15.0888 11.1987 19.2193C9.03518 21.3266 7.32118 22.2398 5.84602 22.2398C4.18821 22.2398 3.40146 21.1159 3.40146 19.4441C3.40146 11.8575 16.1722 1.99498 24.6298 1.99498C28.114 1.99498 30.3618 3.54039 30.3618 6.54692C30.3618 9.30055 28.4933 12.7566 25.3041 15.9458V21.7481C30.8676 17.3507 34.1972 11.7451 34.1972 7.22127C34.1972 2.4586 30.4883 0 25.5711 0Z'
                  fill='#3643BA'
                ></path>
              </svg>
            </Link>
          </div>
          <div className='flex items-center gap-1.5 md:flex-1 md:justify-end'>
            <div>
              <div ref={refs.setReference} {...getReferenceProps()}>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  strokeWidth='1.5'
                >
                  <path
                    d='M21.4 21.4L17.5 17.5M17.8 10.2C17.8 14.3 14.4 17.7 10.3 17.7C6.20005 17.7 2.80005 14.3 2.80005 10.2C2.80005 6.10001 6.20005 2.70001 10.3 2.70001C14.4 2.70001 17.8 6.10001 17.8 10.2Z'
                    stroke='currentColor'
                  ></path>
                </svg>
              </div>
              {openSearcher && (
                <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                  <FloatingPortal>
                    <FloatingOverlay className='z-20' lockScroll>
                      <div onClick={() => setOpenSearcher(false)} className='bg-black/50 fixed inset-0 z-24'></div>
                      <div className='bg-white px-4 md:pl-14 md:pr-10 pt-4 pb-4 flex items-center absolute gap-2 top-15 left-0 right-0 z-30'>
                        <form className='w-full text-center relative' onSubmit={handleSubmit}>
                          <input
                            type='text'
                            {...register('name')}
                            className='py-2 pr-2 pl-12 bg-[#f5f4f5] rounded-full w-full h-10 xs:h-12 font-light focus:outline-0 focus:bg-[#e8e8e8] placeholder:text-black placeholder:italic'
                            placeholder='Tìm kiếm sản phẩm, môn thể thao'
                          />
                          <svg
                            className='absolute top-2 xs:top-3 left-4'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            strokeWidth='1.5'
                            aria-hidden='true'
                          >
                            <path
                              d='M21.4 21.4L17.5 17.5M17.8 10.2C17.8 14.3 14.4 17.7 10.3 17.7C6.20005 17.7 2.80005 14.3 2.80005 10.2C2.80005 6.10001 6.20005 2.70001 10.3 2.70001C14.4 2.70001 17.8 6.10001 17.8 10.2Z'
                              stroke='currentColor'
                            ></path>
                          </svg>
                        </form>
                        <button onClick={() => setOpenSearcher(false)}>
                          <svg
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            width='32'
                            height='32'
                            strokeWidth='2'
                            aria-hidden='true'
                          >
                            <path d='M17.7 6.3L6.30005 17.7M17.7 17.7L6.30005 6.3' stroke='currentColor'></path>
                          </svg>
                        </button>
                      </div>
                    </FloatingOverlay>
                  </FloatingPortal>
                </div>
              )}
            </div>
            <Link
              to={path.user}
              onClick={() => setOpenSearcher(false)}
              className='relative'
              aria-label={isAuthenticated ? 'Tài khoản' : 'Đăng nhập'}
            >
              <svg
                className='mx-2 md:mx-3.5'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                strokeWidth='1.5'
                aria-hidden='true'
              >
                <path
                  d='M5 22C5 16.1 8.1 12.3 12 12.2C15.9 12.1 19 16 19 21.9M12 2.79999C10.1 2.79999 8.5 4.39999 8.5 6.29999C8.5 8.19999 10.1 9.79999 12 9.79999C13.9 9.79999 15.5 8.19999 15.5 6.29999C15.5 4.39999 13.9 2.79999 12 2.79999Z'
                  stroke='currentColor'
                ></path>
              </svg>
              {isAuthenticated ? (
                <div className='bg-[#149b65] w-[13px] h-[13px] flex justify-center rounded-full items-center absolute -bottom-1.5 right-1 md:right-[9px]'>
                  <svg
                    className='text-white'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    width='8'
                    height='8'
                    aria-hidden='true'
                  >
                    <path d='M19.8 7L9.79995 17L4.19995 11.4' stroke='currentColor'></path>
                  </svg>
                </div>
              ) : (
                ''
              )}
            </Link>
            {isAuthenticated && (
              <Link to={path.cart} onClick={() => setOpenSearcher(false)} className='relative'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  strokeWidth='1.5'
                  aria-hidden='true'
                >
                  <path
                    d='M8.20002 8.49999C8.20002 4.99999 9.90002 2.79999 12 2.79999C14.1 2.79999 15.8 5.09999 15.8 8.49999M5.00002 20.5C5.10002 21 5.50002 21.3 6.00002 21.3H18C18.5 21.3 18.9 21 19 20.5L21.1 10.8H2.90002L5.00002 20.5Z'
                    stroke='currentColor'
                  ></path>
                </svg>
                {isAuthenticated ? (
                  <div className='w-[13px] h-[13px] text-[8px] bg-blue flex items-center justify-center text-white rounded-full absolute -bottom-1.5 -right-1'>
                    {totalPurchases}
                  </div>
                ) : (
                  ''
                )}
              </Link>
            )}
            {!isAuthenticated && (
              <AlerDialog
                title='Xem giỏ hàng?'
                trigger={
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    strokeWidth='1.5'
                    aria-hidden='true'
                  >
                    <path
                      d='M8.20002 8.49999C8.20002 4.99999 9.90002 2.79999 12 2.79999C14.1 2.79999 15.8 5.09999 15.8 8.49999M5.00002 20.5C5.10002 21 5.50002 21.3 6.00002 21.3H18C18.5 21.3 18.9 21 19 20.5L21.1 10.8H2.90002L5.00002 20.5Z'
                      stroke='currentColor'
                    ></path>
                  </svg>
                }
                pathName={path.login}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
