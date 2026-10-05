import React, { useState } from 'react'
import Button from '../ui/Button.jsx'

export default function TopBar({ onExecuteCommand, onToggleSidebar }) {
  const [command, setCommand] = useState('')

  const handleExecute = () => {
    if (!command.trim()) return
    onExecuteCommand?.(command.trim())
    setCommand('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleExecute()
  }

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center gap-3 px-4 shrink-0 z-20">
      {/* Sidebar toggle */}
      <button
        onClick={onToggleSidebar}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-all"
        title="切换侧边栏"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* App Title */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-white text-sm font-bold">
          短
        </div>
        <span className="text-base font-semibold text-gray-800 hidden sm:block">
          短剧编剧工作台
        </span>
      </div>

      {/* Global Command Input */}
      <div className="flex-1 max-w-3xl mx-auto flex items-center gap-2">
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="试试：新建项目《契约娇妻》80集；起个名字；导出剧本"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:bg-white"
          />
        </div>
        <Button variant="primary" size="md" onClick={handleExecute}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          执行
        </Button>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-all" title="通知">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-medium">
          S
        </div>
      </div>
    </header>
  )
}
