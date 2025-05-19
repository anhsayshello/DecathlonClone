import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

interface Props {
  scrollRef: React.RefObject<HTMLDivElement>
  direction: 'left' | 'right'
}

export default function ScrollButton({ scrollRef, direction }: Props) {
  const [canScroll, setCanScroll] = useState(true)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const checkScroll = () => {
      if (direction === 'left') {
        setCanScroll(container.scrollLeft > 0)
      } else {
        setCanScroll(container.scrollLeft + container.clientWidth < container.scrollWidth)
      }
    }

    checkScroll()

    container.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)

    return () => {
      container.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [scrollRef, direction])

  const handleClick = () => {
    const container = scrollRef.current
    if (container && canScroll) {
      const scrollAmount = container.firstChild instanceof HTMLElement ? container.firstChild.offsetWidth + 20 : 300
      container.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <button
      aria-label={`button-${direction}`}
      onClick={handleClick}
      style={{ boxShadow: 'rgba(26, 26, 26, 0.2) 0px 4px 8px' }}
      className={classNames(
        'rounded-full bg-white flex justify-center items-center w-[35px] h-[35px] z-10 cursor-pointer absolute top-1/2 -translate-y-1/2 transition-colors',
        {
          'cursor-not-allowed': !canScroll,
          '-left-4.5': direction === 'left',
          '-right-4.5': direction !== 'left'
        }
      )}
      disabled={!canScroll}
    >
      {direction === 'left' ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className={classNames('size-4', {
            'text-[#e1e0df]': !canScroll
          })}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className={classNames('size-4', {
            'text-[#e1e0df]': !canScroll
          })}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
        </svg>
      )}
    </button>
  )
}
