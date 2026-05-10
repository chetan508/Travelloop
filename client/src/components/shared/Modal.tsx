import React, { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  '2xl': 'max-w-4xl',
  '3xl': 'max-w-5xl',
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: React.ReactNode
  children?: React.ReactNode
  size?: string
  footer?: React.ReactNode
  hideCloseButton?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footer,
  hideCloseButton = false,
}: ModalProps) {
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEsc])

  const mouseDownTarget = useRef<EventTarget | null>(null)

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 modal-backdrop traveloop-backdrop-enter"
      style={{ backgroundColor: 'rgba(5, 12, 24, 0.58)', paddingBottom: 'calc(1rem + var(--bottom-nav-h))', overflow: 'hidden', backdropFilter: 'blur(14px) saturate(140%)', WebkitBackdropFilter: 'blur(14px) saturate(140%)' }}
      onMouseDown={e => { mouseDownTarget.current = e.target }}
      onClick={e => {
        if (e.target === e.currentTarget && mouseDownTarget.current === e.currentTarget) onClose()
        mouseDownTarget.current = null
      }}
    >
      <div
        className={`
          traveloop-modal-enter
          traveloop-modal-centered
          rounded-2xl overflow-hidden shadow-2xl w-full ${sizeClasses[size] || sizeClasses.md}
          flex flex-col
          max-h-[calc(100dvh-var(--bottom-nav-h)-2rem)]
        `}
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-faint)', boxShadow: 'var(--shadow-elevated)', backdropFilter: 'blur(24px) saturate(170%)', WebkitBackdropFilter: 'blur(24px) saturate(170%)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header — stays put even while the body scrolls */}
        <div className="flex items-center justify-between p-6 flex-shrink-0" style={{ borderBottom: '1px solid var(--border-secondary)' }}>
          <h2 className="text-lg font-bold tracking-[-0.01em]" style={{ color: 'var(--text-primary)' }}>{title}</h2>
          {!hideCloseButton && (
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body — scrolls when content overflows. min-h-0 lets the flex child shrink below its intrinsic height. */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          {children}
        </div>

        {/* Footer — sticky at the bottom of the modal, never compressed */}
        {footer && (
          <div className="p-6 flex-shrink-0" style={{ borderTop: '1px solid var(--border-secondary)' }}>
            {footer}
          </div>
        )}
      </div>

    </div>
    ,
    document.body,
  )
}
