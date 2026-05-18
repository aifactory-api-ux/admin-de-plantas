import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { CTAButton } from '../components/ui/CTAButton';
import { InputField } from '../components/ui/InputField';
import { tokens } from '../styles/tokens';

interface LoginProps {
  onLoginSuccess?: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      onLoginSuccess?.();
    } catch {
      // error is handled by the hook
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: tokens.colors.background,
        padding: tokens.spacing.md,
      }}
    >
      <div
        style={{
          backgroundColor: tokens.colors.surface,
          borderRadius: tokens.border_radius.lg,
          padding: tokens.spacing.xl,
          width: '100%',
          maxWidth: 400,
          boxShadow: tokens.shadows.lg,
        }}
      >
        <h1
          style={{
            fontSize: tokens.typography.headings.h1.size,
            fontWeight: tokens.typography.headings.h1.weight,
            color: tokens.colors.text_primary,
            textAlign: 'center',
            marginBottom: tokens.spacing.lg,
          }}
        >
          Iniciar Sesión
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Usuario"
            value={username}
            onChange={setUsername}
            required
          />
          <InputField
            label="Contraseña"
            value={password}
            onChange={setPassword}
            type="password"
            required
          />
          {error && (
            <div
              style={{
                color: tokens.colors.error,
                fontSize: tokens.typography.body.body2.size,
                marginBottom: tokens.spacing.md,
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}
          <CTAButton type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Entrar'}
          </CTAButton>
        </form>
      </div>
    </div>
  );
}