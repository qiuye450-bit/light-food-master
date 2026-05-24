import { useEffect, type ReactNode } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function Modal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-lg max-h-[85vh] overflow-y-auto bg-[var(--color-card)] rounded-t-2xl sm:rounded-2xl p-5 animate-slide-up shadow-xl">
        {title && (
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
        )}
        {children}
      </div>
    </div>
  )
}
