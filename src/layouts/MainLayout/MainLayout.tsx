import { useIsFetching } from '@tanstack/react-query'
import { Outlet } from 'react-router'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

export default function MainLayout() {
  const isFetching = useIsFetching()
  return (
    <>
      <Header />
      {isFetching > 0 && (
        <div className='pt-19 lg:pt-22 px-5 lg:px-10'>
          <div className='skeleton h-screen w-full rounded-sm'></div>
        </div>
      )}
      <Outlet />
      <Footer />
    </>
  )
}
