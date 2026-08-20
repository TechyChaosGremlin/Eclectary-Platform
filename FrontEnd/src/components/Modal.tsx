import { useEffect, type CSSProperties, type ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeOnBackdropClick?: boolean;
  className?: string;
  ariaLabel?: string;
}

const modalSizes: Record<'sm' | 'md' | 'lg', string> = {
  sm: '420px',
  md: '560px',
  lg: '760px',
};

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(15, 23, 42, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.25rem',
  zIndex: 1000,
};

const panelStyle = (size: 'sm' | 'md' | 'lg'): CSSProperties => ({
  position: 'relative',
  width: 'min(100%, ' + modalSizes[size] + ')',
  maxWidth: '100%',
  background: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0 24px 80px rgba(15, 23, 42, 0.22)',
  border: '1px solid rgba(148, 163, 184, 0.25)',
  overflow: 'hidden',
});

const closeButtonStyle: CSSProperties = {
  position: 'absolute',
  top: '0.9rem',
  right: '0.9rem',
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: '999px',
  border: '1px solid rgba(148, 163, 184, 0.35)',
  background: '#f8fafc',
  color: '#0f172a',
  fontSize: '1.15rem',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  padding: '1.5rem 1.5rem 1rem',
  borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
};

const contentStyle: CSSProperties = {
  padding: '1.25rem 1.5rem',
  color: '#334155',
  lineHeight: 1.6,
};

const footerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.75rem',
  padding: '0 1.5rem 1.5rem',
  flexWrap: 'wrap',
};

function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdropClick = true,
  className,
  ariaLabel,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen || !onClose) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const dialogTitleId = title ? 'modal-title' : undefined;
  const hasHeader = Boolean(title || onClose);

  return (
    <div
      style={overlayStyle}
      onClick={closeOnBackdropClick && onClose ? onClose : undefined}
      aria-hidden={!isOpen}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        aria-label={ariaLabel}
        className={className}
        style={panelStyle(size)}
        onClick={(event) => event.stopPropagation()}
      >
        {hasHeader && (
          <div style={headerStyle}>
            {title ? (
              <h2 id={dialogTitleId} style={{ margin: 0, fontSize: '1.35rem', color: '#0f172a' }}>
                {title}
              </h2>
            ) : (
              <div />
            )}

            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                style={closeButtonStyle}
                aria-label="Close dialog"
              >
                ×
              </button>
            ) : null}
          </div>
        )}

        <div style={contentStyle}>{children}</div>

        {footer ? <div style={footerStyle}>{footer}</div> : null}
      </div>
    </div>
  );
}

export default Modal;
