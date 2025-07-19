import { AlertDialog as AlertDialogWrapper } from '@base-ui-components/react/alert-dialog'
import classNames from 'classnames'
import { JSXElementConstructor, ReactElement } from 'react'
import { Link } from 'react-router'

import Button from '../Button'

interface Props {
  trigger: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReactElement<Record<string, unknown>, string | JSXElementConstructor<any>> | undefined
  title: string
  desciption?: string | React.ReactElement
  handleEvent?: () => void
  isPending?: boolean
  pathName?: string
}
export default function AlertDialog({
  trigger,
  title,
  desciption = 'Đi đến trang Đăng nhập',
  handleEvent,
  isPending,
  pathName
}: Props) {
  return (
    <AlertDialogWrapper.Root>
      <AlertDialogWrapper.Trigger render={trigger} />
      <AlertDialogWrapper.Portal>
        <AlertDialogWrapper.Backdrop className='fixed inset-0 bg-black/25 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 z-26' />
        <AlertDialogWrapper.Popup className='fixed z-30 top-1/2 left-1/2 -mt-8 w-[576px] lg:w-[500px] max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 text-gray-900 outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300'>
          <div
            className={classNames('flex flex-col', {
              'gap-2.5': pathName,
              'gap-6': !pathName
            })}
          >
            <div className='flex items-center justify-between'>
              <AlertDialogWrapper.Title className='text-xl font-semibold'>{title}</AlertDialogWrapper.Title>
              <AlertDialogWrapper.Close className='hover:bg-[#deddde] border border-[#deddde] p-3 rounded-full cursor-pointer transition-all duration-350 ease-in-out'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-5.5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                </svg>
              </AlertDialogWrapper.Close>
            </div>
            <div className='text-base'>{desciption}</div>
            <div className='pt-4 pb-2 flex items-center justify-between gap-4'>
              <AlertDialogWrapper.Close className='flex-1 py-2.5 px-6 bg-white border uppercase text-sm hover:bg-blue-soft cursor-pointer transition-all duration-350 ease-in-out'>
                Hủy
              </AlertDialogWrapper.Close>
              {!pathName && (
                <Button
                  isPending={isPending}
                  disabled={isPending}
                  onClick={handleEvent}
                  className='flex-1 py-2.5 px-6 bg-[#d70321] text-white uppercase text-sm hover:bg-[#af061e] cursor-pointer transition-all duration-350 ease-in-out'
                >
                  xác nhận
                </Button>
              )}
              {pathName && (
                <Link
                  to={pathName}
                  className='flex-1 py-2.5 px-6 bg-[#d70321] text-white text-center uppercase text-sm hover:bg-[#af061e] cursor-pointer transition-all duration-350 ease-in-out'
                >
                  xác nhận
                </Link>
              )}
            </div>
          </div>
        </AlertDialogWrapper.Popup>
      </AlertDialogWrapper.Portal>
    </AlertDialogWrapper.Root>
  )
}
