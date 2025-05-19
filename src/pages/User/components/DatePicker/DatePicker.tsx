import { DatePicker as DayPicker } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'

interface Props {
  value: dayjs.Dayjs | null | undefined
  onChange: ((date: dayjs.Dayjs, dateString: string | string[]) => void) | undefined
  errorMessage?: string
}

export default function DatePicker({ value, onChange, errorMessage }: Props) {
  return (
    <>
      <DayPicker
        className={classNames('!py-[11px] !px-3 !rounded-none w-full inset-shadow-xs', {
          'hover:!border-gray-300 focus-within:!outline-blue focus-within:!outline-2 focus-within:!-outline-offset-1':
            Boolean(!errorMessage)
        })}
        status={errorMessage ? 'error' : ''}
        format='DD/MM/YYYY'
        value={value}
        onChange={onChange}
        placement='bottomLeft'
      />
      {errorMessage && (
        <div className='flex mt-1.5 -mb-1.5'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5 text-red-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
            />
          </svg>
          <div className='ml-1 text-sm text-red-500'>{errorMessage}</div>
        </div>
      )}
    </>
  )
}
