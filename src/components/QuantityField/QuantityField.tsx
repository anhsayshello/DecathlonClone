import { NumberField } from '@base-ui-components/react/number-field'
import classNames from 'classnames'
import React, { InputHTMLAttributes, useState } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isCart?: boolean
  maxQuantity?: number
  quantity: number
  handleQuantity?: (value: number) => void
}

export default function QuantityField({ isCart, maxQuantity, quantity, handleQuantity, ...rest }: Props) {
  const [currentValue, setCurrentValue] = useState(quantity)
  const { disabled } = rest
  const id = React.useId()
  return (
    <NumberField.Root
      id={id}
      className='flex flex-col items-start gap-1'
      disabled={disabled}
      min={maxQuantity && maxQuantity >= 1 ? 1 : maxQuantity}
      max={maxQuantity}
      value={currentValue}
      onValueChange={(value) => {
        if (value !== null) setCurrentValue(value)
        else value = currentValue
        if (currentValue !== value) return handleQuantity && handleQuantity(value as number)
      }}
    >
      <NumberField.Group className='flex'>
        <NumberField.Decrement
          className={classNames(
            'flex items-center justify-center border-y border-l text-gray-900 select-none hover:bg-[#f5f5fb] active:bg-gray-100',
            {
              'opacity-50 border-[#d3d7dc] cursor-not-allowed': currentValue === 1,
              'cursor-pointer': currentValue !== 1,
              'size-8': isCart,
              'size-12': !isCart
            }
          )}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='size-4 text-blue'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
          </svg>
        </NumberField.Decrement>
        <NumberField.Input
          aria-label='Số lượng sản phẩm'
          className={classNames(
            'inset-shadow-xs border text-center text-gray-900 tabular-nums focus:z-1 focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800',
            {
              'h-8 w-10 text-xs': isCart,
              'h-12 w-14 text-sm': !isCart
            }
          )}
        />
        <NumberField.Increment
          className={classNames(
            'flex items-center justify-center border-y border-r text-gray-900 select-none hover:bg-[#f5f5fb] active:bg-gray-100',
            {
              'opacity-50 border-[#d3d7dc] cursor-not-allowed': currentValue === maxQuantity,
              'cursor-pointer': currentValue !== maxQuantity,
              'size-8': isCart,
              'size-12': !isCart
            }
          )}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='size-4 text-blue'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  )
}
