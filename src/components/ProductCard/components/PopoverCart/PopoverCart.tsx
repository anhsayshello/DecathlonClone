import { Dialog } from '@base-ui-components/react/dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router'
import purchaseApi from 'src/apis/purchase.api'
import BasePopover from 'src/components/BasePopover'
import Button from 'src/components/Button'
import QuantityField from 'src/components/QuantityField'
import Spinner from 'src/components/Spinner'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { Product } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'

interface Props {
  product: Product
}

export default function PopoverCart({ product }: Props) {
  const [quantity, setQuantity] = useState(1)
  const queryClient = useQueryClient()
  const [purchaseId, setPurchaseId] = useState('')

  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })
  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { product_id: product?._id as string, buy_count: quantity },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ['purchases', { status: purchaseStatus.cartPending }]
          })
          setPurchaseId(data.data.data._id)
        }
      }
    )
  }

  const handleQuantity = (value: number) => {
    setQuantity(value)
  }

  const handleCartReset = () => {
    addToCartMutation.reset()
  }
  return (
    <>
      <BasePopover
        modal={true}
        onOpenChange={(open) => {
          if (!open) {
            handleCartReset()
          }
        }}
        trigger={
          <button className='p-3 rounded-full hover:bg-[#deddde] cursor-pointer' aria-label='thêm vào giỏ hàng'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              strokeWidth='1.5'
              aria-hidden='true'
            >
              <path
                d='M8.20002 8.49999C8.20002 4.99999 9.90002 2.79999 12 2.79999C14.1 2.79999 15.8 5.09999 15.8 8.49999M20.1 15L21 10.8H2.90002L5.00002 20.5C5.10002 21 5.50002 21.3 6.00002 21.3H15M17.8 14.8V20.8M20.8 17.8H14.8'
                stroke='currentColor'
              ></path>
            </svg>
          </button>
        }
      >
        <motion.div
          className='bg-white py-5 px-3 md:px-4 h-screen w-full md:w-114 lg:w-125 lg:px-7 absolute top-0 right-0'
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: '0', opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <div className='relative h-full'>
            {!addToCartMutation.isSuccess && (
              <div id='quickAddToCart'>
                <div className='flex items-center gap-6 pb-[14px] text-blue'>
                  <Dialog.Close>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                      className='size-5 cursor-pointer'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                    </svg>
                  </Dialog.Close>
                  <div className='text-lg font-bold'>Thay đổi lựa chọn</div>
                </div>
                {!product && (
                  <div className='mt-30 flex justify-center'>
                    <Spinner />
                  </div>
                )}
                {product && (
                  <>
                    <div className='flex gap-4'>
                      <div className='aspect-1/1 w-25 shrink-0 relative'>
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex flex-col xs:flex-row xs:items-center font-semibold gap-1 xs:gap-3'>
                          <div className='text-[22px]'>{formatCurrency(product.price)}&nbsp;₫</div>
                          <div className='flex xs:flex-col gap-2 xs:gap-0.5'>
                            <div className='text-xs line-through decoration-[#616161] decoration-auto text-[#616161] font-normal'>
                              {formatCurrency(product.price_before_discount)}&nbsp;₫
                            </div>
                            <div className='bg-[#ffcd4e] text-xs px-1 py-[2px] heading-4 font-normal w-10'>
                              -
                              {Math.floor(
                                ((product.price_before_discount - product.price) / product.price_before_discount) * 100
                              )}
                              %
                            </div>
                          </div>
                        </div>
                        <div className='mt-3'>{product.name}</div>
                      </div>
                    </div>
                    <div className='flex flex-col mt-4'>
                      <div className='mb-2 lg:mb-3 font-semibold text-sm'>Số lượng</div>
                      <QuantityField
                        handleQuantity={handleQuantity}
                        quantity={quantity}
                        maxQuantity={product.quantity}
                      />
                    </div>
                    <div className='pt-4 bg-white bottom-0 absolute w-full'>
                      <Button
                        isPending={addToCartMutation.isPending}
                        disabled={addToCartMutation.isPending}
                        onClick={handleAddToCart}
                        className='hover:bg-blue-hard transition-all duration-350 ease-in-out uppercase bg-blue py-2.5 w-full text-white text-sm font-medium'
                      >
                        Thêm vào giỏ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
            {addToCartMutation.isSuccess && (
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
            )}
          </div>
        </motion.div>
      </BasePopover>
    </>
  )
}
