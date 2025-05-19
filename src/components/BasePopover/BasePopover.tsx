import { Dialog } from '@base-ui-components/react/dialog'
import { useState } from 'react'

interface BasePopoverProps {
  open?: boolean
  setOpen?: (open: boolean) => void
  modal?: boolean
  onOpenChange?: (open: boolean) => void
  dismissible?: boolean
  isBackdrop?: boolean
  backdropZIndex?: string
  isPositionFixed?: boolean
  positionerZIndex?: string
  backdropClassName?: string
  children: React.ReactNode
  trigger?: React.ReactElement<Record<string, unknown>>
  align?: 'center' | 'end' | 'start' | undefined
}

export default function BasePopover({
  open,
  setOpen,
  modal = true,
  onOpenChange,
  dismissible,
  isBackdrop = true,
  backdropZIndex = 'z-26',
  isPositionFixed = true,
  positionerZIndex = 'z-30',
  backdropClassName = 'bg-black opacity-50',
  children,
  trigger
}: BasePopoverProps) {
  const [openPopover, setOpenPopover] = useState(false)
  const handleOpenChange = (openValue: boolean) => {
    if (onOpenChange) {
      onOpenChange(openValue)
    }

    if (setOpen) {
      setOpen(openValue)
    } else {
      setOpenPopover(openValue)
    }
  }
  return (
    <Dialog.Root modal={modal} open={open || openPopover} onOpenChange={handleOpenChange} dismissible={dismissible}>
      {trigger && <Dialog.Trigger render={trigger} />}
      {isBackdrop && (
        <Dialog.Backdrop
          onPointerDown={(e) => e.preventDefault()}
          render={<div className={`${backdropClassName} fixed inset-0 ${backdropZIndex}`}></div>}
        />
      )}
      <Dialog.Portal>
        {isPositionFixed ? (
          <div className={`fixed inset-0 ${positionerZIndex}`}>
            <Dialog.Popup>{children}</Dialog.Popup>
          </div>
        ) : (
          <Dialog.Popup>{children}</Dialog.Popup>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  )
}
