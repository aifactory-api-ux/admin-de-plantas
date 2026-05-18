import { tokens } from '../../styles/tokens';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
  actions?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Card({ children, title, subtitle, image, actions, style }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: tokens.colors.surface,
        borderRadius: tokens.border_radius.md,
        padding: tokens.spacing.md,
        boxShadow: tokens.shadows.md,
        ...style,
      }}
    >
      {image && (
        <img
          src={image}
          alt={title || 'Card image'}
          style={{ width: '100%', borderRadius: tokens.border_radius.sm, marginBottom: tokens.spacing.md }}
        />
      )}
      {title && (
        <h3 style={{ fontSize: tokens.typography.headings.h3.size, fontWeight: tokens.typography.headings.h3.weight, marginBottom: tokens.spacing.xs }}>
          {title}
        </h3>
      )}
      {subtitle && (
        <p style={{ fontSize: tokens.typography.body.body2.size, color: tokens.colors.text_secondary, marginBottom: tokens.spacing.md }}>
          {subtitle}
        </p>
      )}
      {children}
      {actions && (
        <div style={{ marginTop: tokens.spacing.md, display: 'flex', gap: tokens.spacing.sm }}>
          {actions}
        </div>
      )}
    </div>
  );
}