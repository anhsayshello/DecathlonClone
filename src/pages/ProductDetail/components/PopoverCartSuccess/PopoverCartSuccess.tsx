import { Dialog } from '@base-ui-components/react/dialog'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import BasePopover from 'src/components/BasePopover'
import path from 'src/constants/path'
import { Product } from 'src/types/product.type'

interface Props {
  product: Product
  purchaseId: string
  open: boolean
  handleCartReset: () => void
}

export default function PopoverCartSuccess({ product, purchaseId, handleCartReset, open }: Props) {
  return (
    <div>
      <BasePopover
        open={open}
        onOpenChange={(open) => {
          if (!open) handleCartReset()
        }}
      >
        <motion.div
          className='bg-white py-5 px-3 md:px-4 h-screen w-full md:w-114 lg:w-125 lg:px-7 absolute top-0 right-0'
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: '0', opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.25 }}
        >
          <div className='relative h-full'>
            <div id='cartNavigation'>
              <motion.div
                className='flex items-center pb-[14px] justify-between border-b border-[#e1e0df]'
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className='text-lg font-bold md:text-xl'>Đã thêm vào giỏ hàng!</div>
                <Dialog.Close>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    stroke='currentColor'
                    className='size-5 cursor-pointer'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                  </svg>
                </Dialog.Close>
              </motion.div>
              <div className='pt-4'>
                <div className='p-3 bg-[#f5f4f5]'>
                  <div className='flex py-[10px] gap-3'>
                    <div className='relative shrink-0 w-18 h-18 mx-2'>
                      <img className='absolute object-cover w-full h-full' src={product.image} alt={product.name} />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <div>{product.name}</div>
                      <div className='flex gap-1.5 items-center'>
                        <div className='bg-[#149b65] w-[13px] h-[13px] flex justify-center rounded-full items-center'>
                          <svg
                            className='text-white'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            aria-hidden='true'
                          >
                            <path d='M19.8 7L9.79995 17L4.19995 11.4' stroke='currentColor'></path>
                          </svg>
                        </div>
                        <div className='text-sm'>Đã thêm vào giỏ hàng</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='pt-4 bg-white flex flex-col bottom-0 absolute gap-4 w-full'>
                <Dialog.Close className='cursor-pointer hover:bg-[#e1e3f5] border-[0.8px] transition-all duration-350 ease-in-out uppercase py-2.5 w-full text-sm font-medium'>
                  Tiếp tục mua sắm
                </Dialog.Close>
                <Link
                  to={{ pathname: path.cart }}
                  state={{ purchaseId: purchaseId }}
                  className='cursor-pointer hover:bg-blue-hard text-center transition-all duration-350 ease-in-out uppercase bg-blue py-2.5 w-full text-white text-sm font-medium'
                >
                  Đến giỏ hàng
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </BasePopover>
    </div>
  )
}
