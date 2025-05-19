import { Dialog } from '@base-ui-components/react/dialog'
import { useContext } from 'react'
import AlerDialog from 'src/components/AlerDialog'
import BasePopover from 'src/components/BasePopover'
import Button from 'src/components/Button'
import { AppContext } from 'src/context/app.context'

interface Props {
  isPending: boolean
  totalPurchases: number
  handleDeleteAll: () => void
}

export default function ConfirmationRemoveCartDialog({ isPending, totalPurchases, handleDeleteAll }: Props) {
  const { viewport } = useContext(AppContext)
  return (
    <>
      {!viewport.tablet && (
        <>
          <BasePopover
            trigger={
              <div className='py-2 px-5 text-blue text-xs uppercase cursor-pointer font-medium hover:bg-[#f5f5fb] transition-all duration-350 ease-in-out'>
                xóa giỏ hàng
              </div>
            }
            backdropClassName='bg-black/10'
          >
            <div className='w-full p-6 absolute bottom-0 bg-white'>
              <div className='flex flex-col gap-7'>
                <div className='flex items-center justify-between'>
                  <div className='text-[20px] font-bold'>Xóa giỏ hàng?</div>
                  <Dialog.Close>
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
                <div>Bạn có muốn bỏ {totalPurchases} sản phẩm khỏi giỏ hàng?</div>
                <div className='pt-4 pb-2 flex items-center justify-between gap-4'>
                  <Dialog.Close className='flex-1 py-3 px-6 bg-white border uppercase text-sm font-medium'>
                    Hủy
                  </Dialog.Close>
                  <Button
                    isPending={isPending}
                    disabled={isPending}
                    onClick={handleDeleteAll}
                    className='flex-1 py-3 px-6 bg-[#d70321] text-white uppercase text-sm font-medium'
                  >
                    xác nhận
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
            <div className='py-2 px-5 text-blue text-xs uppercase cursor-pointer font-medium hover:bg-[#f5f5fb] transition-all duration-350 ease-in-out'>
              xóa giỏ hàng
            </div>
          }
          title='Xóa giỏ hàng?'
          desciption={`Bạn có muốn bỏ ${totalPurchases} sản phẩm khỏi giỏ hàng?`}
          isPending={isPending}
          handleEvent={handleDeleteAll}
        />
      )}
    </>
  )
}
