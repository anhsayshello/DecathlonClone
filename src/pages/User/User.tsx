import useViewport from 'src/hooks/useViewport'

export default function User() {
  const viewport = useViewport()
  return (
    <>
      {viewport.tablet && (
        <div>
          <div className='flex flex-col justify-center items-center h-125'>
            <div className='w-[229px] aspect-1/1 relative'>
              <img
                className='w-full h-full object-cover absolute'
                src='https://contents.mediadecathlon.com/s1069003/k$2f79d37fabcce388b72455a2b66818b4/apacc%20vp%20beardman%20playing.png?format=auto'
                alt='info'
              />
            </div>
            <div className='px-10 py-5 flex flex-col items-center'>
              <div className='text-2xl text-blue font-bold text-center'>Chào mừng bạn đến với Decathlon</div>
              <div className='mt-[18px] text-lg text-center'>
                Để cập nhật cài đặt thông báo và các thông tin tài khoản khác, hãy chọn mục "Tài khoản"
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
