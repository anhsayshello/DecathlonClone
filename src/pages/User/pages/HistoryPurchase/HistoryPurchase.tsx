import { Select } from '@base-ui-components/react/select'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import * as React from 'react'
import { createSearchParams, Link } from 'react-router'
import purchaseApi from 'src/apis/purchase.api'
import Metadata from 'src/components/Metadata'
import Spinner from 'src/components/Spinner'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency } from 'src/utils/utils'

const purchaseTabs = [
  {
    status: purchaseStatus.allProducts,
    name: 'Tất cả'
  },
  {
    status: purchaseStatus.pendingConfirmation,
    name: 'Chờ xác nhận'
  },
  {
    status: purchaseStatus.preparingOrder,
    name: 'Chờ lấy hàng'
  },
  {
    status: purchaseStatus.shipping,
    name: 'Đang giao hàng'
  },
  {
    status: purchaseStatus.delivered,
    name: 'Đã giao'
  },
  {
    status: purchaseStatus.cancelled,
    name: 'Đã hủy'
  }
]

export default function HisrotyPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchaseStatus.allProducts
  const { data, isPending } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchase({ status: status as PurchaseListStatus })
  })
  const historyPurchaseData = data?.data.data

  console.log(historyPurchaseData)

  const purchaseTabLinks = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      className={classNames('', {
        'text-blue': tab.status === status
      })}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
    >
      <Select.Item
        className='grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:bg-gray-900'
        value={tab.name}
      >
        <Select.ItemIndicator className='col-start-1'>
          <CheckIcon className='size-3' />
        </Select.ItemIndicator>
        <Select.ItemText className='col-start-2'>{tab.name}</Select.ItemText>
      </Select.Item>
    </Link>
  ))
  return (
    <div>
      <Metadata title='Lịch sử mua hàng' content='Xem lại các đơn hàng đã đặt và chi tiết giao dịch.' />
      <div className='h-screen lg:h-160 overflow-y-scroll'>
        <div className='bg-white/98.5 pl-5 pr-4 md:pl-15 md:pr-10 lg:pl-0 lg:mr-4 pt-3 lg:pt-7 pb-3 sticky top-0 border-b-[0.1px] border-gray-200'>
          <div className='flex items-center gap-3 xs:gap-4 md:gap-6'>
            <div className='capitalize xs:text-lg md:text-xl text-md font-semibold'>Lịch sử mua hàng</div>
            <Select.Root defaultValue='Tất cả'>
              <Select.Trigger className='flex h-8 w-37 gap-2 px-3 xs:h-9 md:h-10 md:min-w-42 items-center justify-between  border border-gray-200 text-sm md:text-base text-gray-900 select-none hover:bg-gray-100 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100 data-[popup-open]:bg-gray-100'>
                <Select.Value placeholder='Tất cả' />
                <Select.Icon className='flex'>
                  <ChevronUpDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner align='start' className='outline-none z-[999]' sideOffset={8}>
                  <Select.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]" />
                  <Select.Popup className='group [max-height:var(--available-height)] origin-[var(--transform-origin)] overflow-y-auto bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:scale-100 data-[ending-style]:opacity-0 data-[ending-style]:opacity-100 data-[ending-style]:transition-none data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300'>
                    {purchaseTabLinks}
                  </Select.Popup>
                  <Select.ScrollDownArrow className="bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]" />
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>
        <div className='mt-3 pl-4 md:pl-15 md:pr-10 lg:pl-0 lg:pr-4'>
          {historyPurchaseData &&
            historyPurchaseData.map((purchase) => {
              return (
                <div
                  className='py-4 px-4 md:px-6 bg-white border-x border-[#00537d1a] shadow-md shadow-[#00537d1a] mb-4'
                  key={purchase._id}
                >
                  <div className='flex gap-4 justify-between'>
                    <div className='flex'>
                      <img
                        className='w-16 h-16 md:w-20 md:h-20 shrink-0 border border-gray-100'
                        src={purchase.product.image}
                        alt={purchase.product.name}
                      />
                      <div className='ml-3'>
                        <div className='line-clamp-2 text-sm lg:text-base font-medium'>{purchase.product.name}</div>
                        <div className='text-xs lg:text-sm mt-2 font-normal'>Số lượng: {purchase.buy_count}</div>
                      </div>
                    </div>
                    <div className='flex flex-col lg:flex-row lg:items-start gap-1 lg:gap-3.5 leading-6'>
                      <div className='font-medium'>{formatCurrency(purchase.price)}&nbsp;₫</div>
                      <div className='flex items-center gap-1.5 lg:mt-0.5'>
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
                  <div className='mt-2 flex justify-end text-sm font-semibold'>
                    <div>Tổng:</div>
                    <div className='ml-2 text-orange'>{formatCurrency(purchase.price * purchase.buy_count)}&nbsp;₫</div>
                  </div>
                </div>
              )
            })}
        </div>
        {isPending && (
          <div className='w-full mt-40 md:mt-30 flex items-center justify-center'>
            <Spinner />
          </div>
        )}
        {!isPending && historyPurchaseData?.length === 0 && (
          <div className='mt-20 md:mt-16 lg:mt-12 flex flex-col items-center justify-center gap-10'>
            <div className='text-lg font-bold'>Chưa có đơn hàng</div>
            <div className='flex justify-center items-center w-full h-full'>
              <img
                className='w-[287px] aspect-287/200 md:w-[399px] md:aspect-399/300 lg:w-[443px] lg:aspect-443/340 object-contain'
                src='https://contents.mediadecathlon.com/s1069005/k$adcac81ed2e6e39ceacac52937f221c3/apacc%20vp%20woman%20mat.png?format=auto'
                alt='empty'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ChevronUpDownIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width='8' height='12' viewBox='0 0 8 12' fill='none' stroke='currentcolor' strokeWidth='1.5' {...props}>
      <path d='M0.5 4.5L4 1.5L7.5 4.5' />
      <path d='M0.5 7.5L4 10.5L7.5 7.5' />
    </svg>
  )
}

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg fill='currentcolor' width='10' height='10' viewBox='0 0 10 10' {...props}>
      <path d='M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z' />
    </svg>
  )
}
