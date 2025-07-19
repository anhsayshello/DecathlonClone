import { Radio } from '@base-ui-components/react/radio'
import { RadioGroup } from '@base-ui-components/react/radio-group'
import omit from 'lodash/omit'
import { createSearchParams, Link } from 'react-router'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.type'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
export default function CategoryFilter({ categories, queryConfig }: Props) {
  return (
    <RadioGroup value={queryConfig.category ?? ''} className='flex flex-col items-start gap-1 lg:gap-2.5'>
      {categories.map((categoryItem) => {
        return (
          <Link
            key={categoryItem._id}
            to={{
              pathname: path.productSearch,
              search: createSearchParams(
                omit(
                  {
                    ...queryConfig,
                    category: categoryItem._id
                  },
                  ['name']
                )
              ).toString()
            }}
          >
            <label className='flex items-center gap-2 lg:text-sm'>
              <Radio.Root
                value={categoryItem._id}
                className='flex size-5 items-center justify-center cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 border border-blue focus-visible:white data-[checked]:bg-white data-[unchecked]:border data-[unchecked]:border-gray-300'
              >
                <Radio.Indicator className='flex before:size-2 before:rounded-full before:bg-blue data-[unchecked]:hidden ' />
              </Radio.Root>
              {categoryItem.name}
            </label>
          </Link>
        )
      })}
    </RadioGroup>
  )
}
