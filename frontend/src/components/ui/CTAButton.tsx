import { tokens } from '../../styles/tokens';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export function CTAButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
}: CTAButtonProps) {
  const backgroundColor = variant === 'primary' ? tokens.colors.primary : tokens.colors.secondary;
  const pressedColor = variant === 'primary' ? tokens.colors.primary_dark : tokens.colors.secondary_light;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? tokens.colors.text_secondary : backgroundColor,
        color: tokens.colors.text_on_primary,
        border: 'none',
        borderRadius: tokens.border_radius.md,
        padding: '12px 24px',
        fontSize: tokens.typography.button.size,
        fontWeight: tokens.typography.button.weight,
        lineHeight: tokens.typography.button.line_height,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : tokens.shadows.sm,
        transition: 'all 200ms ease-in-out',
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = pressedColor;
      }}
      onMouseUp={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = backgroundColor;
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = backgroundColor;
      }}
    >
      {children}
    </button>
  );
}