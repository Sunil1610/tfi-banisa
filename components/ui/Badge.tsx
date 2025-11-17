import React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'muted'
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium'

  const variantStyles = {
    default: 'bg-bg-tertiary text-text-secondary border border-border-primary',
    muted: 'bg-accent-subtle text-text-muted'
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  )
}
