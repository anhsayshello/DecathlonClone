import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/api/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import Metadata from 'src/components/Metadata'
import { ErrorResponse } from 'src/types/utils.type'
import { PasswordSchema, passwordSchema } from 'src/utils/schema'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

export default function UpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<PasswordSchema>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: zodResolver(passwordSchema)
  })

  const updatePasswordMutation = useMutation({
    mutationFn: userApi.updateProfile
  })
  const handleUpdateProfile = async (data: PasswordSchema) => {
    try {
      const res = await updatePasswordMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message, { autoClose: 300 })
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<PasswordSchema>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof PasswordSchema, {
              message: formError[key as keyof PasswordSchema],
              type: 'Server'
            })
          })
        }
      }
    }
  }
  return (
    <>
      <Metadata title='Đổi mật khẩu' content='Thay đổi mật khẩu để bảo mật tài khoản của bạn.' />
      <div className='h-full pl-5 pr-4 md:pl-15 md:pr-10 lg:pr-0 lg:pl-0 pt-3 lg:pt-7 pb-3 overflow-y-auto'>
        <div className='lg:pr-4'>
          <div className='capitalize xs:text-lg md:text-xl text-md font-semibold'>Đổi mật khẩu</div>
          <div className='mt-1 text-sm text-gray-500'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
          <div className='my-4 w-full h-[0.1px] bg-gray-200 pr-4'></div>
        </div>
        <form className='mt-2 md:mt-8' onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className='text-sm pr-2 md:pr-12 lg:pr-0 grow flex flex-col justify-center gap-3.5 md:gap-5 xl:ml-12'>
            <div className='mb-1 mt-3 flex flex-col xs:flex-row w-[90%] md:w-xl lg:w-lg xl:w-xl ml-3 xs:ml-6 md:ml-10 lg:ml-6'>
              <div className='xs:w-[25%] md:text-right text-[15px] mr-5 pt-0 pb-2 md:pb-0 md:pt-3'>
                Mật khẩu hiện tại
              </div>
              <div className='xs:w-[75%]'>
                <Input
                  className='w-full py-3 px-3 outline-0 border border-gray-300 inset-shadow-xs text-sm'
                  name='password'
                  type='password'
                  register={register}
                  errorMessage={errors.password?.message}
                />
              </div>
            </div>
            <div className='mb-1 flex flex-col xs:flex-row w-[90%] md:w-xl lg:w-lg xl:w-xl ml-3 xs:ml-6 md:ml-10 lg:ml-6'>
              <div className='xs:w-[25%] md:text-right text-[15px] mr-5 pt-0 pb-2 md:pb-0 md:pt-3'>Mật khẩu mới</div>
              <div className='xs:w-[75%]'>
                <Input
                  className='w-full py-3 px-3 outline-0 border border-gray-300 inset-shadow-xs text-sm'
                  type='password'
                  name='new_password'
                  register={register}
                  errorMessage={errors.new_password?.message}
                />
              </div>
            </div>
            <div className='mb-1 flex flex-col xs:flex-row w-[90%] md:w-xl lg:w-lg xl:w-xl ml-3 xs:ml-6 md:ml-10 lg:ml-6'>
              <div className='xs:w-[25%] md:text-right text-[15px] mr-5 pt-0 pb-2 md:pb-0 md:pt-3 lg:pt-0 xl:pt-3'>
                Nhập lại mật khẩu
              </div>
              <div className='xs:w-[75%]'>
                <Input
                  className='w-full py-3 px-3 outline-0 border border-gray-300 inset-shadow-xs text-sm'
                  type='password'
                  name='confirm_password'
                  register={register}
                  errorMessage={errors.confirm_password?.message}
                />
              </div>
            </div>

            <div className='mt-4 flex flex-col xs:flex-row w-[90%] md:w-xl lg:w-lg xl:w-xl ml-3 xs:ml-6 md:ml-10 lg:ml-6'>
              <div className='xs:w-[25%] mr-5'></div>
              <div className='xs:w-[75%] text-center xs:text-left'>
                <Button
                  type='submit'
                  className='py-3 px-8 bg-blue text-white text-sm cursor-pointer hover:bg-blue-hard'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
