import { InputHTMLAttributes, useState } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}
export default function Input({ register, errorMessage, className, name, rules, type, ...rest }: Props) {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const registerSchema = register && name ? register(name, rules) : null
  const newClassName = errorMessage
    ? className + ' outline-2 -outline-offset-2 outline-red-500'
    : className + ' focus:outline-blue focus:outline-2 focus:-outline-offset-1'

  const handleType = () => {
    if (type === 'password') {
      return isShowPassword ? 'text' : type
    }
    return type
  }
  return (
    <>
      <div className='relative'>
        <input className={newClassName} type={handleType()} {...registerSchema} {...rest} />
        {type === 'password' && (
          <button
            aria-label={isShowPassword ? 'show' : '!show'}
            className='cursor-pointer p-1 bg-transparent absolute right-3 top-1/2 -translate-y-1/2'
            onClick={(e) => {
              e.preventDefault()
              setIsShowPassword(!isShowPassword)
            }}
          >
            {!isShowPassword ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-5.5 text-gray-500'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                />
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-5.5 text-gray-500'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {errorMessage && (
        <div className='flex mt-1.5 -mb-1.5' role='alert'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5 text-red-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
            />
          </svg>
          <div className='ml-1 text-sm text-red-500'>{errorMessage}</div>
        </div>
      )}
    </>
  )
}
