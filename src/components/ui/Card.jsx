import React from 'react'

export default function Card({ title, subtitle, icon, action, children, className = '', bodyClassName = '' }) {
  return (
    <div className={`card-base animate-fadeInUp ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between px-5 pt-5 pb-3">
          <div className="flex-1 min-w-0">
            {title && (
              <div className="flex items-center gap-2">
                {icon && <span className="text-lg">{icon}</span>}
                <h3 className="text-base font-semibold text-gray-800">{title}</h3>
              </div>
            )}
            {subtitle && (
              <p className="mt-1 text-xs text-gray-400 leading-relaxed">{subtitle}</p>
            )}
          </div>
          {action && <div className="ml-3 shrink-0">{action}</div>}
        </div>
      )}
      <div className={`px-5 pb-5 ${bodyClassName}`}>{children}</div>
    </div>
  )
}
