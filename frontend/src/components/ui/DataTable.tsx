import { tokens } from '../../styles/tokens';

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  loading?: boolean;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  loading = false,
  onSort,
  sortKey,
  sortDirection,
  pagination,
}: DataTableProps<T>) {
  const handleSort = (key: string) => {
    if (onSort) {
      const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(key, newDirection);
    }
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: tokens.colors.background }}>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                style={{
                  padding: 12,
                  textAlign: 'left',
                  fontSize: tokens.typography.body.body2.size,
                  fontWeight: 600,
                  color: tokens.colors.text_primary,
                  borderBottom: `2px solid ${tokens.colors.text_secondary}`,
                  cursor: col.sortable ? 'pointer' : 'default',
                  userSelect: 'none',
                }}
              >
                {col.label}
                {col.sortable && sortKey === col.key && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: 24, textAlign: 'center', color: tokens.colors.text_secondary }}>
                Cargando...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: 24, textAlign: 'center', color: tokens.colors.text_secondary }}>
                No hay datos
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={String(item[keyField])}
                style={{ backgroundColor: index % 2 === 0 ? tokens.colors.surface : tokens.colors.background }}
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    style={{
                      padding: 12,
                      fontSize: tokens.typography.body.body2.size,
                      color: tokens.colors.text_primary,
                      borderBottom: `1px solid ${tokens.colors.background}`,
                    }}
                  >
                    {col.render ? col.render(item) : String(item[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagination && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
          <button
            onClick={() => pagination.onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            style={{
              padding: '8px 16px',
              backgroundColor: pagination.page <= 1 ? tokens.colors.background : tokens.colors.primary,
              color: pagination.page <= 1 ? tokens.colors.text_secondary : tokens.colors.text_on_primary,
              border: 'none',
              borderRadius: tokens.border_radius.sm,
              cursor: pagination.page <= 1 ? 'not-allowed' : 'pointer',
            }}
          >
            Anterior
          </button>
          <span style={{ fontSize: tokens.typography.body.body2.size, color: tokens.colors.text_primary }}>
            Página {pagination.page} de {Math.ceil(pagination.total / pagination.pageSize)}
          </span>
          <button
            onClick={() => pagination.onPageChange(pagination.page + 1)}
            disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
            style={{
              padding: '8px 16px',
              backgroundColor: pagination.page >= Math.ceil(pagination.total / pagination.pageSize) ? tokens.colors.background : tokens.colors.primary,
              color: pagination.page >= Math.ceil(pagination.total / pagination.pageSize) ? tokens.colors.text_secondary : tokens.colors.text_on_primary,
              border: 'none',
              borderRadius: tokens.border_radius.sm,
              cursor: pagination.page >= Math.ceil(pagination.total / pagination.pageSize) ? 'not-allowed' : 'pointer',
            }}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}