import { tokens } from '../../styles/tokens';

type BadgeStatus = 'saludable' | 'atencion' | 'problema' | 'pending' | 'germinated' | 'failed';

interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
}

const statusColors: Record<BadgeStatus, string> = {
  saludable: tokens.colors.success,
 atencion: tokens.colors.warning,
  problema: tokens.colors.error,
  pending: tokens.colors.warning,
  germinated: tokens.colors.success,
  failed: tokens.colors.error,
};

const defaultLabels: Record<BadgeStatus, string> = {
  saludable: 'Saludable',
  atencion: 'Atención',
  problema: 'Problema',
  pending: 'Pendiente',
  germinated: 'Germinado',
  failed: 'Fallido',
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const backgroundColor = statusColors[status] || tokens.colors.text_secondary;

  return (
    <span
      style={{
        backgroundColor,
        color: tokens.colors.text_on_primary,
        padding: '4px 8px',
        borderRadius: tokens.border_radius.lg,
        fontSize: tokens.typography.caption.size,
        fontWeight: tokens.typography.caption.weight,
        display: 'inline-block',
      }}
    >
      {label || defaultLabels[status]}
    </span>
  );
}