import { tokens } from '../../styles/tokens';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: tokens.colors.surface,
          borderRadius: tokens.border_radius.lg,
          padding: tokens.spacing.lg,
          maxWidth: 500,
          width: '90%',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: tokens.spacing.md,
            right: tokens.spacing.md,
            background: 'none',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            color: tokens.colors.text_secondary,
          }}
        >
          ×
        </button>
        {title && (
          <h2 style={{ fontSize: tokens.typography.headings.h2.size, fontWeight: tokens.typography.headings.h2.weight, marginBottom: tokens.spacing.md }}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}