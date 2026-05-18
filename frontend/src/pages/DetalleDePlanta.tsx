import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePlants } from '../hooks/usePlants';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { DataTable } from '../components/ui/DataTable';
import { Modal } from '../components/ui/Modal';
import { CTAButton } from '../components/ui/CTAButton';
import { PrimaryNavigation } from '../components/ui/PrimaryNavigation';
import { InputField } from '../components/ui/InputField';
import { tokens } from '../styles/tokens';
import type { Plant, PlantUpdate } from '../types/plant';

interface DetalleDePlantaProps {
  onNavigate: (path: string) => void;
}

const navItems = [
  { label: 'Dashboard', icon: '🏠', path: '/dashboard' },
  { label: 'Registro', icon: '🌱', path: '/registro' },
  { label: 'Monitoreo', icon: '📊', path: '/monitoreo' },
  { label: 'Reportes', icon: '📄', path: '/reportes' },
  { label: 'Usuarios', icon: '👤', path: '/usuarios' },
];

export function DetalleDePlanta({ onNavigate }: DetalleDePlantaProps) {
  const { id } = useParams<{ id: string }>();
  const { getPlant, updatePlant, deletePlant, loading, error } = usePlants();

  const [plant, setPlant] = useState<Plant | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editForm, setEditForm] = useState<Partial<PlantUpdate>>({});

  useEffect(() => {
    if (id) {
      getPlant(Number(id))
        .then(setPlant)
        .catch(() => {});
    }
  }, [id, getPlant]);

  const handleEdit = () => {
    if (plant) {
      setEditForm({
        name: plant.name,
        species: plant.species,
        datePlanted: plant.datePlanted,
        notes: plant.notes,
        germinationStatus: plant.germinationStatus,
      });
      setIsEditing(true);
    }
  };

  const handleSaveEdit = async () => {
    if (!id) return;
    try {
      const updated = await updatePlant(Number(id), editForm);
      setPlant(updated);
      setIsEditing(false);
    } catch {
      // error handled by hook
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deletePlant(Number(id));
      setShowDeleteConfirm(false);
      onNavigate('/dashboard');
    } catch {
      // error handled by hook
    }
  };

  if (loading && !plant) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: tokens.colors.background }}>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: tokens.colors.background }}>
        <p>Planta no encontrada</p>
      </div>
    );
  }

  const statusColumns = [
    { key: 'status', label: 'Estado' },
    { key: 'date', label: 'Fecha' },
  ];

  const statusHistory = [
    { id: 1, status: 'pending', date: plant.datePlanted },
    ...(plant.germinationStatus !== 'pending' ? [{ id: 2, status: plant.germinationStatus, date: plant.updatedAt }] : []),
  ];

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
          Detalle de Planta
        </h1>
      </header>

      <main style={{ padding: tokens.spacing.md }}>
        {error && (
          <div style={{ color: tokens.colors.error, marginBottom: tokens.spacing.md }}>
            {error}
          </div>
        )}

        <Card title={plant.name} subtitle={plant.species}>
          <div style={{ marginBottom: tokens.spacing.md }}>
            <StatusBadge status={plant.germinationStatus} />
          </div>
          <p style={{ fontSize: tokens.typography.body.body1.size, color: tokens.colors.text_secondary, marginBottom: tokens.spacing.sm }}>
            <strong>Fecha de Plantado:</strong> {new Date(plant.datePlanted).toLocaleDateString()}
          </p>
          {plant.notes && (
            <p style={{ fontSize: tokens.typography.body.body2.size, color: tokens.colors.text_primary, marginBottom: tokens.spacing.md }}>
              <strong>Notas:</strong> {plant.notes}
            </p>
          )}
          <p style={{ fontSize: tokens.typography.caption.size, color: tokens.colors.text_secondary }}>
            Creado: {new Date(plant.createdAt).toLocaleString()}
          </p>
          <p style={{ fontSize: tokens.typography.caption.size, color: tokens.colors.text_secondary }}>
            Actualizado: {new Date(plant.updatedAt).toLocaleString()}
          </p>

          <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }}>
            <CTAButton onClick={handleEdit}>Editar</CTAButton>
            <CTAButton variant="secondary" onClick={() => setShowDeleteConfirm(true)}>Eliminar</CTAButton>
          </div>
        </Card>

        <Card title="Historial de Estados" style={{ marginTop: tokens.spacing.md }}>
          <DataTable
            columns={[
              {
                key: 'status',
                label: 'Estado',
                render: (item: { status: string }) => <StatusBadge status={item.status as 'pending' | 'germinated' | 'failed'} />,
              },
              {
                key: 'date',
                label: 'Fecha',
                render: (item: { date: string }) => new Date(item.date).toLocaleDateString(),
              },
            ]}
            data={statusHistory}
            keyField="id"
          />
        </Card>
      </main>

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Editar Planta">
        <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
          <InputField
            label="Nombre"
            value={editForm.name || ''}
            onChange={(v) => setEditForm(f => ({ ...f, name: v }))}
          />
          <InputField
            label="Especie"
            value={editForm.species || ''}
            onChange={(v) => setEditForm(f => ({ ...f, species: v }))}
          />
          <InputField
            label="Fecha de Plantado"
            value={editForm.datePlanted || ''}
            onChange={(v) => setEditForm(f => ({ ...f, datePlanted: v }))}
            type="date"
          />
          <InputField
            label="Notas"
            value={editForm.notes || ''}
            onChange={(v) => setEditForm(f => ({ ...f, notes: v || null }))}
          />
          <div style={{ display: 'flex', gap: tokens.spacing.md, marginTop: tokens.spacing.lg }}>
            <CTAButton type="submit" disabled={loading}>Guardar</CTAButton>
            <CTAButton type="button" variant="secondary" onClick={() => setIsEditing(false)}>Cancelar</CTAButton>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Confirmar Eliminación">
        <p style={{ fontSize: tokens.typography.body.body1.size, color: tokens.colors.text_primary }}>
          ¿Está seguro de que desea eliminar esta planta? Esta acción no se puede deshacer.
        </p>
        <div style={{ display: 'flex', gap: tokens.spacing.md, marginTop: tokens.spacing.lg }}>
          <CTAButton onClick={handleDelete} disabled={loading}>Eliminar</CTAButton>
          <CTAButton type="button" variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancelar</CTAButton>
        </div>
      </Modal>

      <PrimaryNavigation items={navItems} activePath="/monitoreo" onNavigate={onNavigate} />
    </div>
  );
}