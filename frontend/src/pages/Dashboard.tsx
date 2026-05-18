import { useEffect, useState } from 'react';
import { usePlants } from '../hooks/usePlants';
import { useNotifications } from '../hooks/useNotifications';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { DataTable } from '../components/ui/DataTable';
import { PrimaryNavigation } from '../components/ui/PrimaryNavigation';
import { CTAButton } from '../components/ui/CTAButton';
import { tokens } from '../styles/tokens';
import type { Plant } from '../types/plant';

interface DashboardProps {
  onNavigate: (path: string) => void;
  onPlantClick: (id: number) => void;
}

const navItems = [
  { label: 'Dashboard', icon: '🏠', path: '/dashboard' },
  { label: 'Registro', icon: '🌱', path: '/registro' },
  { label: 'Monitoreo', icon: '📊', path: '/monitoreo' },
  { label: 'Reportes', icon: '📄', path: '/reportes' },
  { label: 'Usuarios', icon: '👤', path: '/usuarios' },
];

export function Dashboard({ onNavigate, onPlantClick }: DashboardProps) {
  const { plants, fetchPlants, loading: plantsLoading, error: plantsError } = usePlants();
  const { notifications, fetchNotifications, loading: notifLoading } = useNotifications();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchPlants();
    fetchNotifications();
  }, [fetchPlants, fetchNotifications]);

  const columns = [
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'species', label: 'Especie', sortable: true },
    {
      key: 'germinationStatus',
      label: 'Estado',
      render: (plant: Plant) => (
        <StatusBadge status={plant.germinationStatus} />
      ),
    },
    { key: 'datePlanted', label: 'Fecha de Plantado', sortable: true },
    {
      key: 'actions',
      label: 'Acciones',
      render: (plant: Plant) => (
        <CTAButton onClick={() => onPlantClick(plant.id)}>Ver Detalle</CTAButton>
      ),
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background, paddingBottom: 80 }}>
      <header
        style={{
          backgroundColor: tokens.colors.primary,
          color: tokens.colors.text_on_primary,
          padding: tokens.spacing.lg,
          boxShadow: tokens.shadows.md,
        }}
      >
        <h1 style={{ fontSize: tokens.typography.headings.h1.size, fontWeight: tokens.typography.headings.h1.weight, margin: 0 }}>
          Dashboard
        </h1>
        {unreadCount > 0 && (
          <span style={{ backgroundColor: tokens.colors.secondary, padding: '4px 8px', borderRadius: tokens.border_radius.full, fontSize: 12, marginTop: tokens.spacing.sm, display: 'inline-block' }}>
            {unreadCount} notificaciones
          </span>
        )}
      </header>

      <main style={{ padding: tokens.spacing.md }}>
        {plantsError && (
          <div style={{ color: tokens.colors.error, marginBottom: tokens.spacing.md }}>
            {plantsError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: tokens.spacing.md, marginBottom: tokens.spacing.lg }}>
          <Card title="Total de Plantas" subtitle={`${plants.length} plantas registradas`}>
            <div style={{ fontSize: tokens.typography.headings.h1.size, fontWeight: 700, color: tokens.colors.primary }}>
              {plants.length}
            </div>
          </Card>
          <Card title="Germinadas" subtitle="Plantas que han germinado">
            <div style={{ fontSize: tokens.typography.headings.h1.size, fontWeight: 700, color: tokens.colors.success }}>
              {plants.filter(p => p.germinationStatus === 'germinated').length}
            </div>
          </Card>
          <Card title="Pendientes" subtitle="Plantas esperando germinar">
            <div style={{ fontSize: tokens.typography.headings.h1.size, fontWeight: 700, color: tokens.colors.warning }}>
              {plants.filter(p => p.germinationStatus === 'pending').length}
            </div>
          </Card>
        </div>

        <Card title="Plantas Recientes">
          <DataTable
            columns={columns}
            data={plants.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            keyField="id"
            loading={plantsLoading}
            pagination={{
              page: currentPage,
              pageSize,
              total: plants.length,
              onPageChange: setCurrentPage,
            }}
          />
        </Card>
      </main>

      <PrimaryNavigation items={navItems} activePath="/dashboard" onNavigate={onNavigate} />
    </div>
  );
}