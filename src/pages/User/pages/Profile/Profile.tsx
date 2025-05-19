import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/api/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputFile from 'src/components/InputFile'
import Metadata from 'src/components/Metadata'
import { AppContext } from 'src/context/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { setProfileToLS } from 'src/utils/auth'
import { ProfileSchema, profileSchema } from 'src/utils/schema'
import { getURLAvatar, isAxiosUnprocessableEntityError } from 'src/utils/utils'

import DatePicker from '../../components/DatePicker'

type FormDataError = Omit<ProfileSchema, 'date_of_birth'> & {
  date_of_birth?: string
}

export default function Profile() {
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const { data: dataProfile, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = dataProfile?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: () => refetch()
  })
  const uploadAvatarMutation = useMutation({ mutationFn: userApi.updateAvatar })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
    setError
  } = useForm<ProfileSchema>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: undefined,
      avatar: ''
    },
    resolver: zodResolver(profileSchema)
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name ?? '')
      setValue('phone', profile.phone ?? '')
      setValue('address', profile.address ?? '')
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date())
    }
  }, [profile, setValue])

  const avatar = watch('avatar')
  const { setProfile } = useContext(AppContext)
  const handleUpdateProfile = async (data: ProfileSchema) => {
    let avatarName = avatar
    try {
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })

      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      toast.success(res.data.message, { autoClose: 300 })
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  }
  const handleFileChange = (file?: File) => {
    setFile(file)
  }

  return (
    <>
      <Metadata title='Thông tin cá nhân' content='Cập nhật họ tên, email và các thông tin tài khoản.' />
      <div className='pl-5 pr-4 md:pl-15 md:pr-10 lg:pl-0 lg:pr-4'>
        <div className='pt-3 lg:pt-7'>
          <div className='capitalize xs:text-lg md:text-xl text-md font-semibold'>hồ sơ của tôi</div>
          <div className='mt-1 text-sm text-gray-500'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        </div>
        <div className='my-4 w-full h-[0.1px] bg-gray-200'></div>
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className='flex flex-col md:flex-row items-center md:items-start'>
            <div className='text-sm pr-3 md:pr-12 flex flex-col gap-5 w-[86%]'>
              <div className='mt-2 mb-2 flex items-center'>
                <div className='w-[25%] text-right mr-5'>Email</div>
                <div className='w-[75%]'>{profile?.email}</div>
              </div>
              <div className='mb-1 flex'>
                <div className='w-[25%] mr-5 text-right pt-3'>Tên</div>
                <div className='w-[75%]'>
                  <Input
                    className='w-full py-3 px-3 outline-0 border border-gray-300 inset-shadow-xs text-sm'
                    name='name'
                    register={register}
                    errorMessage={errors.name?.message}
                  />
                </div>
              </div>
              <div className='mb-1 flex'>
                <div className='w-[25%] mr-5 text-right pt-0.5 xs:pt-3'>Số Điện Thoại</div>
                <div className='w-[75%]'>
                  <Input
                    className='w-full py-3 px-3 outline-0 border border-gray-300 inset-shadow-xs text-sm'
                    type='number'
                    name='phone'
                    register={register}
                    errorMessage={errors.phone?.message}
                  />
                </div>
              </div>
              <div className='mb-1 flex'>
                <div className='w-[25%] mr-5 text-right pt-3'>Địa Chỉ</div>
                <div className='w-[75%]'>
                  <Input
                    className='w-full py-3 px-3 outline-0 border border-gray-300 inset-shadow-xs text-sm'
                    name='address'
                    register={register}
                    errorMessage={errors.address?.message}
                  />
                </div>
              </div>
              <div className='mb-1 flex'>
                <div className='w-[25%] mr-5 text-right pt-3'>Ngày sinh</div>
                <div className='w-[75%]'>
                  <Controller
                    control={control}
                    name='date_of_birth'
                    render={({ field }) => (
                      <DatePicker
                        errorMessage={errors.date_of_birth?.message}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => field.onChange(date?.toDate())}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center justify-center md:px-12 md:border-l md:border-gray-200'>
              <div className='w-15 h-15 md:w-25 md:h-25 shrink-0 mt-5'>
                <img
                  className='object-cover w-full h-full rounded-full'
                  src={previewImage || getURLAvatar(profile?.avatar)}
                  alt='avatar'
                />
              </div>
              <InputFile onChange={handleFileChange} />
              <div className='text-sm text-gray-400 text-left'>
                <div>Dung lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
          <div className='mt-8 md:mt-10 mb-24 lg:mb-16 flex justify-center'>
            <Button type='submit' className='py-3 px-8 bg-blue text-white text-sm cursor-pointer hover:bg-blue-hard'>
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
