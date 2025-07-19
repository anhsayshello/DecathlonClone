import { Dialog } from '@base-ui-components/react/dialog'

export default function Popup() {
  return (
    <Dialog.Root defaultOpen={true} dismissible={false}>
      <Dialog.Portal>
        <Dialog.Backdrop className='fixed inset-0 z-100 bg-black opacity-60 transition-all duration-250 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70' />
        <Dialog.Popup
          aria-label='popup_ads'
          className='fixed z-101 w-74 xs:w-84 md:w-96 aspect-square top-1/2 left-1/2 -mt-8 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 data-[ending-style]:scale-80 data-[ending-style]:opacity-0 data-[starting-style]:scale-80 data-[starting-style]:opacity-0'
        >
          <img
            className='w-full h-full absolute object-cover'
            src='https://contents.mediadecathlon.com/s1245123/k$293987d313d778ab8a9a0afb2d69faf2/new-popup-VI.webp'
            alt='popup-ads'
          />
          <Dialog.Close className='absolute top-2 right-3 cursor-pointer' aria-label='close'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='size-6 text-white'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
            </svg>
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
