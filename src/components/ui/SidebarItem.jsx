import React from 'react'

export default function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
  badge,
}) {
  return (
    <div
      onClick={onClick}
      className={`sidebar-item ${active ? 'sidebar-item-active' : ''}`}
    >
      {icon && <span className="text-base leading-none">{icon}</span>}
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="text-xs px-1.5 py-0.5 rounded bg-brand-100 text-brand-600">
          {badge}
        </span>
      )}
    </div>
  )
}
