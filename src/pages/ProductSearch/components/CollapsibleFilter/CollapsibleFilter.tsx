import { Collapsible } from '@base-ui-components/react/collapsible'

interface Props {
  title: string
  children: React.ReactNode
}
export default function CollapsibleFilter({ children, title }: Props) {
  return (
    <Collapsible.Root className='flex w-full flex-col justify-center text-gray-900'>
      <Collapsible.Trigger className='group flex items-center justify-between px-6 py-6 border-b border-[#d9dde1] data-[panel-open]:border-0 font-medium focus-visible:outline-2 focus-visible:outline-blue-800'>
        <div className='font-bold'>{title}</div>
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
      <Collapsible.Panel className='flex h-[var(--collapsible-panel-height)] border-b border-[#d9dde1] flex-col justify-end overflow-hidden transition-all ease-out data-[ending-style]:h-0 data-[starting-style]:h-0'>
        <div className='pb-3 pt-1'>{children}</div>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
