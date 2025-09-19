import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import { ChatbotInfo } from 'src/components/ChatbotAi/Components/ChatbotInfo/ChatbotInfo'
import Input from 'src/components/Input'
import Metadata from 'src/components/Metadata'
import path from 'src/constants/path'
import { useAuthenticatedStore } from 'src/stores/useAuthenticatedStore'
import { useChatHistoryStore } from 'src/stores/useChatHistoryStore'
import { useProfileStore } from 'src/stores/useProfileStore'
import { ErrorResponse } from 'src/types/utils.type'
import { RegisterSchema, registerSchema } from 'src/utils/schema'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

export default function Register() {
  const { setChatHistory } = useChatHistoryStore((state) => state)
  const { setProfile } = useProfileStore((state) => state)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  const navigate = useNavigate()

  const registerMutation = useMutation({
    mutationFn: authApi.register
  })

  const onSubmit = (data: RegisterSchema) => {
    registerMutation.mutate(data, {
      onSuccess: (data) => {
        useAuthenticatedStore.setState({ isAuthenticated: true })
        setProfile(data.data.data.user)
        setChatHistory([{ hideInChat: true, role: 'model', text: ChatbotInfo }])
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<RegisterSchema>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof RegisterSchema, {
                message: formError[key as keyof RegisterSchema],
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
      <Metadata title='Đăng ký' content='Tạo tài khoản mới để bắt đầu mua sắm cùng chúng tôi.' />
      <div className='px-5 sm:px-10 xl:px-0 xl:overflow-y-scroll flex h-full'>
        <div className='max-w-[500px] mx-auto grow flex flex-col justify-between'>
          <div>
            <div className='text-[26px] font-medium'>Tạo tài khoản</div>
            <div className='mt-7 mb-2.5'>Nhập địa chỉ email</div>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4.5'>
                <Input
                  register={register}
                  name='email'
                  errorMessage={errors.email?.message}
                  className='border inset-shadow-xs py-3 pl-3 pr-9 w-full hover:shadow-xs hover:outline-3 hover:outline-offset-0 hover:outline-[#ecedf8] '
                  type='email'
                  placeholder='Email'
                />
              </div>
              <div className='mb-4.5'>
                <Input
                  register={register}
                  name='password'
                  errorMessage={errors.password?.message}
                  className='border inset-shadow-xs py-3 pl-3 pr-9 w-full hover:shadow-xs hover:outline-3 hover:outline-offset-0 hover:outline-[#ecedf8] '
                  type='password'
                  placeholder='Password'
                />
              </div>
              <div className='mb-4.5'>
                <Input
                  register={register}
                  name='confirm_password'
                  errorMessage={errors.confirm_password?.message}
                  className='border inset-shadow-xs py-3 pl-3 pr-9 w-full hover:shadow-xs hover:outline-3 hover:outline-offset-0 hover:outline-[#ecedf8] '
                  type='password'
                  placeholder='Confirm Password'
                />
              </div>
              <div className='mt-2'>
                <Button
                  data-testid='register-button'
                  isPending={registerMutation.isPending}
                  disabled={registerMutation.isPending}
                  errorMessage={Boolean(
                    errors.email?.message || errors.password?.message || errors.confirm_password?.message
                  )}
                  className='px-6 py-3.5 bg-blue hover:bg-blue-hardc uppercase text-white text-sm w-full'
                >
                  Đăng ký
                </Button>
              </div>
            </form>
            <div className='mt-10'>
              <div className='font-semibold'>Bạn đã có tài khoản?</div>
              <div className='mt-3'>
                <Link to={path.login} className='text-base font-light underline decoration-1 underline-offset-5'>
                  Đăng nhập
                </Link>
              </div>
            </div>
            <div className='my-8 text-center text-sm text-[#616161] font-light leading-5'>
              <div>Liên hệ đội ngũ chăm sóc khách hàng</div>
              <div>Thứ 2 - Thứ 7: từ 9h đến 22h; Chủ Nhật: từ 10h đến 19h</div>
              <div>18009044</div>
            </div>
            <div className='mt-7 font-medium'>Đăng nhập để luôn nắm bắt thông tin mới nhất từ Decathlon</div>
            <div className='mt-4'>
              <div className='flex items-center mb-2'>
                <img src='https://login.decathlon.net/assets/checkbox-circle-wDQUNnIb.svg' alt='checkbox-circle-1' />
                <div className='ml-1.5'>Tham gia Chương trình tích điểm miễn phí</div>
              </div>
              <div className='flex items-center mb-2'>
                <img src='https://login.decathlon.net/assets/checkbox-circle-wDQUNnIb.svg' alt='checkbox-circle-2' />
                <div className='ml-1.5'>Chương trình giảm giá và ưu đãi độc quyền</div>
              </div>
              <div className='flex items-center mb-2'>
                <img src='https://login.decathlon.net/assets/checkbox-circle-wDQUNnIb.svg' alt='checkbox-circle-3' />
                <div className='ml-1.5'>365 ngày đổi trả miễn phí với sản phẩm Decathlon.</div>
              </div>
            </div>
          </div>
          <div className='xl:mt-10 xl:mb-16'>
            <div className='flex items-center'>
              <div className='mr-5'>Hỗ trợ</div>
              <div className='mr-5'>Bảo mật</div>
              <div className='mr-5'>Thông tin</div>
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
