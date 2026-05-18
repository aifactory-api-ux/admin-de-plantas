import React, { useState } from 'react';
import { tokens } from '../../styles/tokens';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'password' | 'email' | 'date';
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  required = false,
  disabled = false,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div style={{ position: 'relative', marginBottom: tokens.spacing.md }}>
      <label
        style={{
          position: 'absolute',
          left: 12,
          top: focused || hasValue ? -8 : 12,
          fontSize: focused || hasValue ? 12 : 16,
          color: error ? tokens.colors.error : focused ? tokens.colors.primary : tokens.colors.text_secondary,
          backgroundColor: tokens.colors.surface,
          padding: focused || hasValue ? '0 4px' : '0',
          transition: 'all 200ms ease-in-out',
          pointerEvents: 'none',
        }}
      >
        {label}
        {required && ' *'}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        placeholder={focused ? placeholder : ''}
        style={{
          width: '100%',
          padding: '12px',
          border: `1px solid ${error ? tokens.colors.error : focused ? tokens.colors.primary : tokens.colors.text_secondary}`,
          borderRadius: tokens.border_radius.sm,
          fontSize: tokens.typography.body.body1.size,
          color: tokens.colors.text_primary,
          backgroundColor: disabled ? tokens.colors.background : tokens.colors.surface,
          outline: 'none',
          transition: 'border-color 200ms ease-in-out',
          boxSizing: 'border-box',
        }}
      />
      {error && (
        <span style={{ color: tokens.colors.error, fontSize: 12, marginTop: 4, display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
}

