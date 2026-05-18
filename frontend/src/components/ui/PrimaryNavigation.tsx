import { tokens } from '../../styles/tokens';

interface NavItem {
  label: string;
  icon: string;
  path: string;
}

interface PrimaryNavigationProps {
  items: NavItem[];
  activePath: string;
  onNavigate: (path: string) => void;
}

export function PrimaryNavigation({ items, activePath, onNavigate }: PrimaryNavigationProps) {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: tokens.colors.surface,
        boxShadow: tokens.shadows.lg,
        display: 'flex',
        justifyContent: 'space-around',
        padding: `${tokens.spacing.sm}px 0`,
        zIndex: 100,
      }}
    >
      {items.map(item => {
        const isActive = activePath === item.path;
        return (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: tokens.spacing.sm,
              color: isActive ? tokens.colors.primary : tokens.colors.text_secondary,
              transition: 'color 200ms ease-in-out',
            }}
          >
            <span style={{ fontSize: 24 }}>{item.icon}</span>
            <span
              style={{
                fontSize: tokens.typography.caption.size,
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}