import { FloatingOverlay, FloatingPortal, useClick, useFloating, useInteractions } from '@floating-ui/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import path from 'src/constants/path'
import useViewport from 'src/hooks/useViewport'

interface Props {
  trigger: React.ReactElement
  popup: React.ReactElement
  pathName: string
}

export default function FloatingElement({ trigger, popup, pathName }: Props) {
  const navigate = useNavigate()
  const viewport = useViewport()
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange(isOpen) {
      if (isOpen && !viewport.desktop) {
        setIsOpen(true)
      } else if (!isOpen) {
        setIsOpen(false)
      }
    }
  })
  const handleClose = () => {
    setIsOpen(false)
    navigate({ pathname: path.user })
  }

  const click = useClick(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([click])

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <NavLink
          to={pathName}
          className={({ isActive }) =>
            classNames('grid grid-cols-5 h-[45px]', {
              'text-blue': isActive
            })
          }
        >
          {trigger}
        </NavLink>
      </div>
      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
          <FloatingPortal>
            <FloatingOverlay lockScroll>
              <div className='bg-white w-full h-full fixed top-15'>
                <button onClick={handleClose} className='absolute top-3.5 md:top-5 right-5 md:right-10 z-10'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                  </svg>
                </button>
                {popup}
              </div>
            </FloatingOverlay>
          </FloatingPortal>
        </div>
      )}
    </>
  )
}
