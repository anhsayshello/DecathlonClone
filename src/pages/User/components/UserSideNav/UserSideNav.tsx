import { useContext } from 'react'
import path from 'src/constants/path'
import { AppContext } from 'src/context/app.context'
import { getURLAvatar } from 'src/utils/utils'

import HistoryPurchase from '../../pages/HistoryPurchase'
import Profile from '../../pages/Profile'
import UpdatePassword from '../../pages/UpdatePassword'
import FloatingElement from '../FloatingElement'

export default function UserSideNav() {
  const { profile, handleLogout } = useContext(AppContext)
  return (
    <div className='bg-[#f5f4f5]'>
      <div className='flex flex-col h-full justify-between'>
        <div>
          <div className='bg-blue px-[10px] mt-[10px] py-2 lg:py-5 flex items-center gap-3 text-white'>
            <div className='ml-4 w-10 h-10 rounded-full shrink-0 overflow-hidden relative'>
              <img
                className='w-full h-full object-cover absolute'
                src={getURLAvatar(profile?.avatar)}
                alt={profile?._id}
              />
            </div>
            <div className='flex flex-col justify-between'>
              <div className='text-lg font-bold'>{profile?.name ? profile.name : 'unnamed'}</div>
              <div className='text-sm'>Số tài khoản: {profile?._id}</div>
            </div>
          </div>
          <div className='mt-4'>
            <FloatingElement
              trigger={
                <>
                  <div className='col-span-1 flex justify-center items-center '>
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      strokeWidth='1.5'
                      aria-hidden='true'
                    >
                      <path
                        d='M5 22C5 16.1 8.1 12.3 12 12.2C15.9 12.1 19 16 19 21.9M12 2.79999C10.1 2.79999 8.5 4.39999 8.5 6.29999C8.5 8.19999 10.1 9.79999 12 9.79999C13.9 9.79999 15.5 8.19999 15.5 6.29999C15.5 4.39999 13.9 2.79999 12 2.79999Z'
                        stroke='currentColor'
                      ></path>
                    </svg>
                  </div>
                  <div className='col-span-3 flex font-bold items-center'>Tài khoản</div>
                </>
              }
              popup={<Profile />}
              pathName={path.profile}
            />
            <FloatingElement
              trigger={
                <>
                  <div className='col-span-1 flex justify-center items-center'>
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      strokeWidth='1.5'
                      aria-hidden='true'
                    >
                      <path
                        d='M1.75 3.75H3.89728C4.38858 3.75 4.8071 4.10688 4.88472 4.59201L5.23 6.75M5.23 6.75L6.61528 15.408C6.6929 15.8931 7.11142 16.25 7.60272 16.25H17.8035C18.2956 16.25 18.7145 15.892 18.7913 15.406L20.1537 6.75H5.23Z'
                        stroke='currentColor'
                        strokeLinecap='square'
                      ></path>
                      <path
                        d='M9.25 19.75C9.25 20.3023 8.80228 20.75 8.25 20.75C7.69772 20.75 7.25 20.3023 7.25 19.75C7.25 19.1977 7.69772 18.75 8.25 18.75C8.80228 18.75 9.25 19.1977 9.25 19.75Z'
                        fill='currentColor'
                      ></path>
                      <path
                        d='M18.25 19.75C18.25 20.3023 17.8023 20.75 17.25 20.75C16.6977 20.75 16.25 20.3023 16.25 19.75C16.25 19.1977 16.6977 18.75 17.25 18.75C17.8023 18.75 18.25 19.1977 18.25 19.75Z'
                        fill='currentColor'
                      ></path>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M9.5 19.75C9.5 20.4404 8.94036 21 8.25 21C7.55964 21 7 20.4404 7 19.75C7 19.0596 7.55964 18.5 8.25 18.5C8.94036 18.5 9.5 19.0596 9.5 19.75ZM18.5 19.75C18.5 20.4404 17.9404 21 17.25 21C16.5596 21 16 20.4404 16 19.75C16 19.0596 16.5596 18.5 17.25 18.5C17.9404 18.5 18.5 19.0596 18.5 19.75ZM8.25 20.75C8.80228 20.75 9.25 20.3023 9.25 19.75C9.25 19.1977 8.80228 18.75 8.25 18.75C7.69772 18.75 7.25 19.1977 7.25 19.75C7.25 20.3023 7.69772 20.75 8.25 20.75ZM17.25 20.75C17.8023 20.75 18.25 20.3023 18.25 19.75C18.25 19.1977 17.8023 18.75 17.25 18.75C16.6977 18.75 16.25 19.1977 16.25 19.75C16.25 20.3023 16.6977 20.75 17.25 20.75Z'
                        fill='currentColor'
                      ></path>
                    </svg>
                  </div>
                  <div className='col-span-3 flex font-bold items-center'>Lịch sử mua hàng</div>
                </>
              }
              popup={<HistoryPurchase />}
              pathName={path.historyPurchase}
            />
            <FloatingElement
              trigger={
                <>
                  <div className='col-span-1 flex justify-center items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.6}
                      stroke='currentColor'
                      className='size-5.5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                      />
                    </svg>
                  </div>
                  <div className='col-span-3 flex font-bold items-center'>Đổi mật khẩu</div>
                </>
              }
              popup={<UpdatePassword />}
              pathName={path.updatePassword}
            />
          </div>
        </div>
        <div className='md:hidden flex flex-col justify-center items-center bg-[#f5f4f5] lg:h-125'>
          <div className='w-[175px] aspect-1/1 relative'>
            <img
              className='w-full h-full object-cover absolute'
              src='https://contents.mediadecathlon.com/s1069003/k$2f79d37fabcce388b72455a2b66818b4/apacc%20vp%20beardman%20playing.png?format=auto'
              alt='info'
            />
          </div>
          <div className='px-5 pt-3 pb-4 flex flex-col items-center'>
            <div className='text-lg text-blue font-bold'>Chào mừng bạn đến với Decathlon</div>
            <div className='text-xs mt-[5px] text-center'>
              Để cập nhật cài đặt thông báo và các thông tin tài khoản khác, hãy chọn mục "Tài khoản"
            </div>
          </div>
        </div>
        <div className='ml-7 mb-10'>
          <button
            aria-label='đăng xuất'
            onClick={handleLogout}
            className='px-5 py-2 uppercase cursor-pointer bg-white border border-[#949494] rounded-full text-xs hover:bg-blue-soft transition-all duration-350 ease-in-out'
          >
            đăng xuất
          </button>
        </div>
      </div>
    </div>
  )
}
