import { ButtonHTMLAttributes } from 'react'

import Spinner from '../Spinner'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isPending?: boolean
  errorMessage?: boolean
}
export default function Button({ errorMessage, isPending, children, disabled, className, onClick }: Props) {
  let newClassName = className || ''
  if (disabled || isPending) {
    newClassName += ' opacity-40'
  } else if (errorMessage) {
    newClassName += ' opacity-40 cursor-not-allowed'
  } else {
    newClassName += ' cursor-pointer'
  }
  return (
    <button
      className={newClassName}
      disabled={disabled}
      onClick={onClick}
      aria-label={typeof children === 'string' ? children : 'Button'}
    >
      {!isPending ? children : <Spinner />}
    </button>
  )
}
