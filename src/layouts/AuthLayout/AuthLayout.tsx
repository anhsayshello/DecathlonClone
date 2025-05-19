import { Link, Outlet } from 'react-router'
import path from 'src/constants/path'

export default function AuthLayout() {
  return (
    <>
      <div className='bg-white py-6 px-16 flex items-center'>
        <Link to={path.home} className='flex items-center flex-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>
          <div className='ml-2 text-sm hidden sm:block'>Quay lại</div>
        </Link>
        <div className='flex flex-1 justify-center'>
          <div className='w-30 xs:w-38 md:w-[192px] aspect-96/19 relative'>
            <img
              className='absolute w-full h-full object-cover'
              src='https://login.decathlon.net/assets/decathlon-logo-vp-DDH3S1xy.svg'
              alt='logo'
            />
          </div>
        </div>
        <div className='flex flex-1'></div>
      </div>
      <div className='flex h-[calc(100vh-86px)]'>
        <div className='flex-1 hidden xl:block'>
          <img
            className='object-cover h-full max-w-full align-middle'
            src='https://login.decathlon.net/assets/side_picture-q3YSYl53.webp'
            alt='side_picture'
          />
        </div>
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>
    </>
  )
}
