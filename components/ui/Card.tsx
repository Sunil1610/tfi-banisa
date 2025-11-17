import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'bg-bg-secondary border border-border-primary rounded-lg'
  const hoverStyles = hover ? 'hover:border-border-secondary transition-colors duration-200' : ''
  const combinedClassName = `${baseStyles} ${hoverStyles} ${className}`

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  )
}

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}
