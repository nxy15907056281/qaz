import React from 'react'

const variantMap = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  outline: 'btn btn-outline',
  ghost: 'btn btn-ghost',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const sizeClass = size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : ''
  const disabledClass = (loading || disabled) ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${variantMap[variant]} ${sizeClass} ${disabledClass} ${className}`}
      {...props}
    >
      {loading && (
        <span className="spinner" style={{ width: 14, height: 14 }} />
      )}
      {children}
    </button>
  )
}
