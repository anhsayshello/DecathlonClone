import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import authApi from 'src/api/auth.api'
import Button from 'src/components/Button'
import { ChatbotInfo } from 'src/components/ChatbotAi/Components/ChatbotInfo/ChatbotInfo'
import Input from 'src/components/Input'
import Metadata from 'src/components/Metadata'
import path from 'src/constants/path'
import { useAuthenticatedStore } from 'src/stores/useAuthenticatedStore'
import { useChatHistoryStore } from 'src/stores/useChatHistoryStore'
import { useProfileStore } from 'src/stores/useProfileStore'
import { ErrorResponse } from 'src/types/utils.type'
import { LoginSchema, loginSchema } from 'src/utils/schema'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

export default function Login() {
  const { setChatHistory } = useChatHistoryStore((state) => state)
  const { setProfile } = useProfileStore((state) => state)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: authApi.login
  })

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        useAuthenticatedStore.setState({ isAuthenticated: true })
        setProfile(data.data.data.user)
        setChatHistory([{ hideInChat: true, role: 'model', text: ChatbotInfo }])
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<LoginSchema>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginSchema, {
                message: formError[key as keyof LoginSchema],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  }
  return (
    <>
      <Metadata title='Đăng nhập' content='Đăng nhập vào tài khoản của bạn để mua hàng và quản lý đơn hàng.' />
      <div className='my-8 px-10 xl:px-0 xl:overflow-y-scroll xl:max-h-[560px]'>
        <div className='max-w-[500px] h-screen xl:h-full mx-auto flex flex-col justify-between'>
          <div>
            <div className='text-[26px] font-medium'>Đăng nhập</div>
            <div className='mt-7 mb-2.5'>Nhập địa chỉ email</div>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4.5'>
                <Input
                  className='border inset-shadow-xs py-3 pl-3 pr-9 w-full hover:shadow-xs hover:outline-3 hover:outline-offset-0 hover:outline-[#ecedf8] '
                  register={register}
                  type='email'
                  name='email'
                  placeholder='Email'
                  autoComplete='on'
                  errorMessage={errors.email?.message}
                />
              </div>
              <div className='mb-4.5'>
                <Input
                  className='border inset-shadow-xs py-3 pl-3 pr-9 w-full hover:shadow-xs hover:outline-3 hover:outline-offset-0 hover:outline-[#ecedf8] '
                  register={register}
                  type='password'
                  name='password'
                  placeholder='Password'
                  autoComplete='on'
                  errorMessage={errors.password?.message}
                />
              </div>
              <div className='mt-2'>
                <Button
                  isPending={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                  errorMessage={Boolean(errors.email?.message || errors.password?.message)}
                  className='px-6 py-3.5 bg-blue hover:bg-blue-hard uppercase text-white text-sm w-full'
                >
                  Đăng nhập
                </Button>
              </div>
            </form>
            <div className='mt-10'>
              <div className='font-semibold'>Bạn chưa có tài khoản Decathlon? Đăng ký ngay!</div>
              <div className='mt-3'>
                <Link to={path.register} className='text-base font-light underline decoration-1 underline-offset-5'>
                  Tạo tài khoản
                </Link>
              </div>
            </div>
            <div className='mt-7 font-medium'>Đăng nhập để luôn nắm bắt thông tin mới nhất từ Decathlon</div>
            <div className='mt-4'>
              <div className='flex items-center mb-2'>
                <img src='https://login.decathlon.net/assets/checkbox-circle-wDQUNnIb.svg' alt='checkbox-circle' />
                <div className='ml-1.5'>Tham gia Chương trình tích điểm miễn phí</div>
              </div>
              <div className='flex items-center mb-2'>
                <img src='https://login.decathlon.net/assets/checkbox-circle-wDQUNnIb.svg' alt='checkbox-circle' />
                <div className='ml-1.5'>Chương trình giảm giá và ưu đãi độc quyền</div>
              </div>
              <div className='flex items-center mb-2'>
                <img src='https://login.decathlon.net/assets/checkbox-circle-wDQUNnIb.svg' alt='checkbox-circle' />
                <div className='ml-1.5'>365 ngày đổi trả miễn phí với sản phẩm Decathlon.</div>
              </div>
            </div>
          </div>
          <div>
            <div className='mt-8'>
              <div className='flex items-center'>
                <div className='mr-5'>Hỗ trợ</div>
                <div className='mr-5'>Bảo mật</div>
                <div className='mr-5'>Thông tin</div>
              </div>
            </div>
            <div className='my-5'>
              <div className='flex items-center'>
                <div className='w-8 h-8 bg-[url(https://login.decathlon.net/assets/flags-Ck9rBLLL.png)] bg-no-repeat bg-[position:-256px_-448px]'></div>
                <div className='ml-2'>Tiếng Việt</div>
              </div>
            </div>
            <div className='text-xs text-[#616161]'>
              Trang này được bảo vệ bởi reCaptcha. Chính Sách Bảo Mật của Google áp dụng cùng Điều khoản
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
