import { Collapsible } from '@base-ui-components/react/collapsible'
import classNames from 'classnames'

interface Props {
  title: string
  svg: React.ReactElement
  links: string[]
  first?: boolean
}

export default function CollapsibleFooter({ title, svg, links, first }: Props) {
  return (
    <Collapsible.Root className='flex w-full flex-col justify-center text-gray-900'>
      <Collapsible.Trigger
        className={classNames(
          'group flex items-center justify-between bg-[#f5f4f5] px-6 py-5 data-[panel-open]:border-b-0 border-b text-sm font-medium focus-visible:outline-2 focus-visible:outline-blue-800',
          {
            'border-t': first
          }
        )}
      >
        <div className='flex items-center gap-2'>
          {svg}
          <div className='font-bold capitalize'>{title}</div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='size-4 transition-all ease-out group-data-[panel-open]:rotate-180'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
        </svg>
      </Collapsible.Trigger>
      <Collapsible.Panel className='flex h-[var(--collapsible-panel-height)] flex-col justify-end border-b overflow-hidden text-sm transition-all ease-out data-[ending-style]:h-0 data-[starting-style]:h-0'>
        <div className='ml-4 flex cursor-text flex-col gap-3 rounded-sm bg-[#f5f4f5] pb-3 pl-7'>
          {links.map((link) => (
            <div key={link} className='flex gap-0.5 items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='size-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
              <div className='capitalize'>{link}</div>
            </div>
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
