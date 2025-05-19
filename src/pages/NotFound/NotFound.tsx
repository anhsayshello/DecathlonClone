import Metadata from 'src/components/Metadata'

export default function NotFound() {
  return (
    <main className='grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <Metadata title='404 - Không tìm thấy trang' content='Trang bạn tìm không tồn tại hoặc đã bị xoá.' />
      <div className='text-center'>
        <p className='text-base font-semibold text-blue'>404</p>
        <h1 className='mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl'>
          Page not found
        </h1>
        <p className='mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8'>
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <a
            href='/'
            className='rounded-md bg-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-hard transition-all duration-250 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Go back home
          </a>
        </div>
      </div>
    </main>
  )
}
