import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlants } from '../hooks/usePlants';
import { InputField } from '../components/ui/InputField';
import { CTAButton } from '../components/ui/CTAButton';
import { Modal } from '../components/ui/Modal';
import { PrimaryNavigation } from '../components/ui/PrimaryNavigation';
import { tokens } from '../styles/tokens';
import type { PlantCreate } from '../types/plant';

interface RegistroDePlantaProps {
  onNavigate: (path: string) => void;
}

const navItems = [
  { label: 'Dashboard', icon: '🏠', path: '/dashboard' },
  { label: 'Registro', icon: '🌱', path: '/registro' },
  { label: 'Monitoreo', icon: '📊', path: '/monitoreo' },
  { label: 'Reportes', icon: '📄', path: '/reportes' },
  { label: 'Usuarios', icon: '👤', path: '/usuarios' },
];

export function RegistroDePlanta({ onNavigate }: RegistroDePlantaProps) {
  const navigate = useNavigate();
  const { createPlant, loading, error } = usePlants();

  const [form, setForm] = useState<PlantCreate>({
    name: '',
    species: '',
    datePlanted: new Date().toISOString().split('T')[0],
    notes: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PlantCreate, string>>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PlantCreate, string>> = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!form.species.trim()) newErrors.species = 'La especie es requerida';
    if (!form.datePlanted) newErrors.datePlanted = 'La fecha es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createPlant(form);
      setShowSuccess(true);
    } catch {
      // error handled by hook
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setForm({ name: '', species: '', datePlanted: new Date().toISOString().split('T')[0], notes: null });
    onNavigate('/dashboard');
  };

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
          Registro de Planta
        </h1>
      </header>

      <main style={{ padding: tokens.spacing.md }}>
        <div
          style={{
            backgroundColor: tokens.colors.surface,
            borderRadius: tokens.border_radius.lg,
            padding: tokens.spacing.lg,
            boxShadow: tokens.shadows.md,
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          <form onSubmit={handleSubmit}>
            <InputField
              label="Nombre de la Planta"
              value={form.name}
              onChange={(v) => setForm(f => ({ ...f, name: v }))}
              error={errors.name}
              required
            />
            <InputField
              label="Especie"
              value={form.species}
              onChange={(v) => setForm(f => ({ ...f, species: v }))}
              error={errors.species}
              required
            />
            <InputField
              label="Fecha de Plantado"
              value={form.datePlanted}
              onChange={(v) => setForm(f => ({ ...f, datePlanted: v }))}
              type="date"
              error={errors.datePlanted}
              required
            />
            <InputField
              label="Notas (opcional)"
              value={form.notes || ''}
              onChange={(v) => setForm(f => ({ ...f, notes: v || null }))}
            />

            {error && (
              <div style={{ color: tokens.colors.error, marginBottom: tokens.spacing.md }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: tokens.spacing.md, marginTop: tokens.spacing.lg }}>
              <CTAButton type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Registrar Planta'}
              </CTAButton>
              <CTAButton
                type="button"
                variant="secondary"
                onClick={() => onNavigate('/dashboard')}
              >
                Cancelar
              </CTAButton>
            </div>
          </form>
        </div>
      </main>

      <Modal isOpen={showSuccess} onClose={handleSuccessClose} title="¡Éxito!">
        <p style={{ fontSize: tokens.typography.body.body1.size, color: tokens.colors.text_primary }}>
          La planta ha sido registrada correctamente.
        </p>
        <div style={{ marginTop: tokens.spacing.lg }}>
          <CTAButton onClick={handleSuccessClose}>Aceptar</CTAButton>
        </div>
      </Modal>

      <PrimaryNavigation items={navItems} activePath="/registro" onNavigate={onNavigate} />
    </div>
  );
}