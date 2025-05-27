import { Outlet } from 'react-router'
import Metadata from 'src/components/Metadata'
import useViewport from 'src/hooks/useViewport'

import UserSideNav from '../../components/UserSideNav'
import User from '../../User'

export default function UserLayout() {
  const viewport = useViewport()
  return (
    <>
      <Metadata title='Tài khoản' content='Quản lý thông tin cá nhân và các hoạt động mua sắm.' />
      <div className='grid grid-cols-1 md:grid-cols-[400px_auto] lg:gap-8 container'>
        <UserSideNav />
        {viewport.desktop && (
          <div className='lg:h-160'>
            <Outlet />
          </div>
        )}
        {!viewport.desktop && <User />}
      </div>
    </>
  )
}
