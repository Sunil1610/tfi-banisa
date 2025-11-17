import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-2 bg-bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-border-secondary transition-colors duration-200'
    const errorStyles = error ? 'border-red-500' : ''
    const combinedClassName = `${baseStyles} ${errorStyles} ${className}`

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {label}
          </label>
        )}
        <input ref={ref} className={combinedClassName} {...props} />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
