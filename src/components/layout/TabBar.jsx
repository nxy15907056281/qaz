import React from 'react'
import Tab from '../ui/Tab.jsx'

export default function TabBar({ tabs, activeTabId, onSelectTab, onCloseTab, onNewTab }) {
  return (
    <div className="h-11 bg-white border-b border-gray-100 flex items-center gap-1 px-3 overflow-x-auto shrink-0">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          label={tab.label}
          active={tab.id === activeTabId}
          onClick={() => onSelectTab(tab.id)}
          onClose={tab.closable ? () => onCloseTab(tab.id) : null}
        />
      ))}
      <div
        onClick={onNewTab}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm cursor-pointer text-gray-400 hover:bg-gray-100 hover:text-brand-600 transition-all duration-150 whitespace-nowrap"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        新建项目
      </div>
    </div>
  )
}
