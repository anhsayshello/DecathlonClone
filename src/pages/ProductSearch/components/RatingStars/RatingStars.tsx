import { Radio } from '@base-ui-components/react/radio'
import { RadioGroup } from '@base-ui-components/react/radio-group'
import { createSearchParams, useNavigate } from 'react-router'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
}

export default function RatingStars({ queryConfig }: Props) {
  const navigate = useNavigate()

  const handleRatingChange = (value: string) => {
    navigate({
      pathname: path.productSearch,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: value
      }).toString()
    })
  }

  return (
    <>
      <RadioGroup
        value={queryConfig.rating_filter ?? ''}
        onValueChange={(value) => handleRatingChange(value as string)}
        className='flex flex-col items-start gap-1 lg:gap-2.5 text-gray-900'
      >
        {Array(5)
          .fill(0)
          .map((_, indexLine) => {
            const ratingValue = 5 - indexLine
            return (
              <div key={indexLine} className='w-full'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <Radio.Root
                    value={String(ratingValue)}
                    className='flex size-5 items-center justify-center cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 border border-blue focus-visible:white data-[checked]:bg-white data-[unchecked]:border data-[unchecked]:border-gray-300'
                  >
                    <Radio.Indicator className='flex before:size-2 before:rounded-full before:bg-blue data-[unchecked]:hidden' />
                  </Radio.Root>
                  <div className='flex'>
                    {Array(5)
                      .fill(0)
                      .map((_, indexStar) => (
                        <svg
                          key={indexStar}
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          strokeWidth='1.25'
                          aria-hidden='true'
                        >
                          <path
                            d='M12 15.9L16.8 19.3L15 13.7L19.7 10.3H13.8L12 4.70001L10.2 10.3H4.30005L9.00005 13.7L7.20005 19.3L12 15.9Z'
                            fill={indexStar < ratingValue ? 'currentColor' : 'none'}
                            stroke='currentColor'
                          />
                        </svg>
                      ))}
                  </div>
                  <span className='ml-1 lg:text-sm'>
                    {ratingValue} star{ratingValue !== 1 ? 's' : ''}
                  </span>
                </label>
              </div>
            )
          })}
      </RadioGroup>
    </>
  )
}
