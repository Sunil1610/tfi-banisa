import React from 'react'

export interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
}) => {
  const baseStyles = 'animate-pulse bg-bg-tertiary'

  const variantStyles = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  const style: React.CSSProperties = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'circular' ? width : undefined),
  }

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
    />
  )
}

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-bg-secondary border border-border-primary rounded-xl p-8">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circular" width={48} height={48} />
        <Skeleton width="60%" height={28} />
      </div>
      <Skeleton width="100%" height={20} className="mb-4" />
      <div className="space-y-2.5">
        <Skeleton width="90%" height={16} />
        <Skeleton width="85%" height={16} />
        <Skeleton width="80%" height={16} />
      </div>
    </div>
  )
}

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="bg-bg-secondary border border-border-primary rounded-lg overflow-hidden">
      <Skeleton variant="rectangular" height={300} />
      <div className="p-4">
        <Skeleton width="80%" height={24} className="mb-2" />
        <Skeleton width="60%" height={16} className="mb-3" />
        <div className="flex gap-2">
          <Skeleton width={60} height={24} className="rounded-full" />
          <Skeleton width={60} height={24} className="rounded-full" />
        </div>
      </div>
    </div>
  )
}

export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 p-4 bg-bg-secondary border border-border-primary rounded-lg">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1">
            <Skeleton width="40%" height={20} className="mb-2" />
            <Skeleton width="60%" height={16} />
          </div>
        </div>
      ))}
    </div>
  )
}
