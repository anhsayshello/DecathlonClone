import { Dialog } from '@base-ui-components/react/dialog'
import { useContext } from 'react'
import AlerDialog from 'src/components/AlerDialog'
import BasePopover from 'src/components/BasePopover'
import Button from 'src/components/Button'
import { AppContext } from 'src/context/app.context'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency } from 'src/utils/utils'

interface Props {
  isPending: boolean
  purchase: Purchase
  handleDelete: (purchaseId: string) => void
}

export default function ConfirmationRemovePurchaseDialog({ isPending, purchase, handleDelete }: Props) {
  const { viewport } = useContext(AppContext)
  return (
    <>
      {!viewport.tablet && (
        <>
          <BasePopover
            trigger={
              <button
                aria-label='xóa'
                className='text-blue px-6 py-2 text-xs flex items-center gap-1 cursor-pointer hover:bg-blue-soft transition-all duration-350 ease-in-out'
              >
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  strokeWidth='1.5'
                  aria-hidden='true'
                >
                  <path
                    d='M17.2 4.8V3.8C17.2 3.2 16.8 2.8 16.2 2.8H7.8C7.2 2.8 6.8 3.2 6.8 3.8V4.8M9.8 9.2V18.4M14.2 9.2V18.4M19.5 6.5L17.7 20.4C17.6 20.9 17.2 21.3 16.7 21.3H7.3C6.8 21.3 6.4 20.9 6.3 20.4L4.5 6.5H19.5Z'
                    stroke='currentColor'
                  ></path>
                </svg>
                <span className='uppercase font-medium'>xóa</span>
              </button>
            }
            backdropClassName='bg-black/10'
          >
            <div className='w-full p-6 absolute bottom-0 bg-white'>
              <div className='flex flex-col gap-6.5'>
                <div className='flex items-center justify-between'>
                  <div className='text-[20px] font-bold'>Bạn muốn xóa sản phẩm khỏi giỏ hàng?</div>
                  <Dialog.Close className='hover:bg-[#deddde] border border-[#deddde] p-3 rounded-full cursor-pointer transition-all duration-350 ease-in-out'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                      className='size-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                    </svg>
                  </Dialog.Close>
                </div>
                <div className='flex gap-5'>
                  <div className='aspect-1/1 w-25 relative shrink-0'>
                    <img
                      className='absolute w-full h-full object-cover'
                      src={purchase.product.image}
                      alt={purchase.product.name}
                    />
                  </div>
                  <div className='flex flex-col justify-between'>
                    <div>{purchase.product.name}</div>
                    <div className='flex flex-col'>
                      <div className='font-bold text-xl -mb-0.5'>{formatCurrency(purchase.price)}&nbsp;₫</div>
                      <div className='flex items-center gap-1.5'>
                        <div className='text-xs line-through decoration-[#616161] text-[#616161] font-normal'>
                          {formatCurrency(purchase.price_before_discount)}&nbsp;₫
                        </div>
                        <div className='bg-[#ffcd4e] text-xs px-1 py-[2px] heading-4'>
                          -
                          {Math.floor(
                            ((purchase.price_before_discount - purchase.price) / purchase.price_before_discount) * 100
                          )}
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='pt-4 pb-2 flex items-center justify-between gap-4'>
                  <Dialog.Close className='flex-1 py-2.5 px-6 bg-white border uppercase text-sm font-medium'>
                    Hủy
                  </Dialog.Close>
                  <Button
                    isPending={isPending}
                    disabled={isPending}
                    onClick={() => handleDelete(purchase._id)}
                    className='flex-1 py-2.5 px-6 bg-[#d70321] text-white uppercase text-sm font-medium'
                  >
                    xóa
                  </Button>
                </div>
              </div>
            </div>
          </BasePopover>
        </>
      )}
      {viewport.tablet && (
        <AlerDialog
          trigger={
            <button
              aria-label='xóa'
              className='text-blue px-6 py-2 text-xs flex items-center gap-1 cursor-pointer hover:bg-blue-soft transition-all duration-350 ease-in-out'
            >
              <svg
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                strokeWidth='1.5'
                aria-hidden='true'
              >
                <path
                  d='M17.2 4.8V3.8C17.2 3.2 16.8 2.8 16.2 2.8H7.8C7.2 2.8 6.8 3.2 6.8 3.8V4.8M9.8 9.2V18.4M14.2 9.2V18.4M19.5 6.5L17.7 20.4C17.6 20.9 17.2 21.3 16.7 21.3H7.3C6.8 21.3 6.4 20.9 6.3 20.4L4.5 6.5H19.5Z'
                  stroke='currentColor'
                ></path>
              </svg>
              <span className='uppercase font-medium'>xóa</span>
            </button>
          }
          title='Bạn muốn xóa sản phẩm khỏi giỏ hàng?'
          desciption={
            <div className='flex gap-5'>
              <div className='aspect-1/1 w-25 relative shrink-0'>
                <img
                  className='absolute w-full h-full object-cover'
                  src={purchase.product.image}
                  alt={purchase.product.name}
                />
              </div>
              <div className='flex flex-col justify-between'>
                <div>{purchase.product.name}</div>
                <div className='flex flex-row mb-1.5 gap-2.5'>
                  <div className='font-bold text-xl -mb-0.5'>{formatCurrency(purchase.price)}&nbsp;₫</div>
                  <div className='flex items-center gap-1.5'>
                    <div className='text-xs line-through decoration-[#616161] text-[#616161] font-normal'>
                      {formatCurrency(purchase.price_before_discount)}&nbsp;₫
                    </div>
                    <div className='bg-[#ffcd4e] text-xs px-1 py-[2px] heading-4'>
                      -
                      {Math.floor(
                        ((purchase.price_before_discount - purchase.price) / purchase.price_before_discount) * 100
                      )}
                      %
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          isPending={isPending}
          handleEvent={() => handleDelete(purchase._id)}
        />
      )}
    </>
  )
}
