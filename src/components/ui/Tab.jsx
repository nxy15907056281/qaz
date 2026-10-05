import React from 'react'

export default function Tab({ label, active = false, onClick, onClose }) {
  return (
    <div
      onClick={onClick}
      className={`tab-item group ${active ? 'tab-item-active' : 'tab-item-inactive'}`}
    >
      <span className="truncate max-w-40">{label}</span>
      {onClose && (
        <span
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="ml-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-black/10 text-xs opacity-60 hover:opacity-100 transition-all"
        >
          ×
        </span>
      )}
    </div>
  )
}
