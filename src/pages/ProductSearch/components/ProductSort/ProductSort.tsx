import { Radio } from '@base-ui-components/react/radio'
import { RadioGroup } from '@base-ui-components/react/radio-group'
import omit from 'lodash/omit'
import { createSearchParams, useNavigate } from 'react-router'
import path from 'src/constants/path'
import { order, sortBy } from 'src/constants/product'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ProductQueryParams } from 'src/types/product.type'

interface Props {
  queryConfig: QueryConfig
}

export default function ProductSort({ queryConfig }: Props) {
  const navigate = useNavigate()
  const handleSort = (sortByValue: Exclude<ProductQueryParams['sort_by'], undefined>) => {
    navigate({
      pathname: path.productSearch,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<ProductQueryParams['order'], undefined>) => {
    navigate({
      pathname: path.productSearch,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  return (
    <RadioGroup
      value={
        queryConfig.sort_by === 'price'
          ? queryConfig.order === 'asc'
            ? order.asc
            : order.desc
          : (queryConfig.sort_by ?? sortBy.view)
      }
      className='flex flex-col items-start gap-2 text-gray-900'
    >
      <label className='flex items-center gap-2 lg:text-xs' onClick={() => handleSort(sortBy.view)}>
        <Radio.Root
          value={sortBy.view}
          className='flex size-6 lg:size-4 items-center justify-center cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 border border-blue focus-visible:white data-[checked]:bg-wihte data-[unchecked]:border data-[unchecked]:border-gray-300'
        >
          <Radio.Indicator className='flex before:size-3 lg:before:size-2 before:rounded-full before:bg-blue data-[unchecked]:hidden' />
        </Radio.Root>
        Phổ biến
      </label>
      <label className='flex items-center gap-2 lg:text-xs' onClick={() => handleSort(sortBy.createdAt)}>
        <Radio.Root
          value={sortBy.createdAt}
          className='flex size-6 lg:size-4 items-center justify-center cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 border border-blue focus-visible:white data-[checked]:bg-wihte data-[unchecked]:border data-[unchecked]:border-gray-300'
        >
          <Radio.Indicator className='flex before:size-3 lg:before:size-2 before:rounded-full before:bg-blue data-[unchecked]:hidden' />
        </Radio.Root>
        Mới nhất
      </label>
      <label className='flex items-center gap-2 lg:text-xs' onClick={() => handleSort(sortBy.sold)}>
        <Radio.Root
          value={sortBy.sold}
          className='flex size-6 lg:size-4 items-center justify-center cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 border border-blue focus-visible:white data-[checked]:bg-wihte data-[unchecked]:border data-[unchecked]:border-gray-300'
        >
          <Radio.Indicator className='flex before:size-3 lg:before:size-2 before:rounded-full before:bg-blue data-[unchecked]:hidden' />
        </Radio.Root>
        Bán chạy
      </label>
      <label className='flex items-center gap-2 lg:text-xs' onClick={() => handlePriceOrder(order.asc)}>
        <Radio.Root
          value={order.asc}
          className='flex size-6 lg:size-4 items-center justify-center cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 border border-blue focus-visible:white data-[checked]:bg-wihte data-[unchecked]:border data-[unchecked]:border-gray-300'
        >
          <Radio.Indicator className='flex before:size-3 lg:before:size-2 before:rounded-full before:bg-blue data-[unchecked]:hidden' />
        </Radio.Root>
        Giá tăng dần
      </label>
      <label className='flex items-center gap-2 lg:text-xs' onClick={() => handlePriceOrder(order.desc)}>
        <Radio.Root
          value={order.desc}
          className='flex size-6 lg:size-4 items-center justify-center cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 border border-blue focus-visible:white data-[checked]:bg-wihte data-[unchecked]:border data-[unchecked]:border-gray-300'
        >
          <Radio.Indicator className='flex before:size-3 lg:before:size-2 before:rounded-full before:bg-blue data-[unchecked]:hidden' />
        </Radio.Root>
        Giá giảm dần
      </label>
    </RadioGroup>
  )
}
