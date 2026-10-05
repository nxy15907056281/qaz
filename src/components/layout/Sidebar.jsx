import React from 'react'
import SidebarItem from '../ui/SidebarItem.jsx'

const projectMenu = [
  { id: 'outline', icon: '📋', label: '分集大纲' },
  { id: 'script', icon: '✍️', label: '剧本创作' },
  { id: 'assistant', icon: '💬', label: '小助理' },
  { id: 'tools', icon: '🛠️', label: '辅助工具' },
  { id: 'version', icon: '📅', label: '版本管理' },
  { id: 'checkup', icon: '🔍', label: '剧本自检' },
  { id: 'analysis', icon: '🔥', label: '红果爆款拆解' },
  { id: 'memo', icon: '📝', label: '备忘录' },
  { id: 'mindmap', icon: '🗺️', label: '剧情导图' },
]

const materialMenu = [
  { id: 'title-gen', icon: '🏷️', label: '标题生成器' },
  { id: 'char-seed', icon: '👤', label: '人物种子' },
  { id: 'track-gen', icon: '🎯', label: '赛道选题' },
  { id: 'name-ancient', icon: '🏯', label: '古风取名' },
  { id: 'name-modern', icon: '🏙️', label: '现代取名' },
  { id: 'hooks', icon: '🪝', label: '名场面钩子库' },
  { id: 'news', icon: '📰', label: '每日短剧新闻' },
  { id: 'settings', icon: '⚙️', label: '设置' },
]

export default function Sidebar({ activeId, onSelect, collapsed }) {
  return (
    <aside className={`bg-white border-r border-gray-100 flex flex-col transition-all duration-200 shrink-0 ${collapsed ? 'w-0 overflow-hidden' : 'w-56'}`}>
      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {/* Project management */}
        <div>
          <div className="px-3 py-1 text-xs font-medium text-gray-400 uppercase tracking-wider">
            项目管理
          </div>
          <div className="mt-1 space-y-0.5">
            {projectMenu.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeId === item.id}
                onClick={() => onSelect(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Material tools */}
        <div>
          <div className="px-3 py-1 text-xs font-medium text-gray-400 uppercase tracking-wider">
            素材工具
          </div>
          <div className="mt-1 space-y-0.5">
            {materialMenu.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeId === item.id}
                onClick={() => onSelect(item.id)}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom status */}
      <div className="px-3 py-3 border-t border-gray-50">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-brand-50">
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="text-xs text-brand-700 font-medium">在线 · 已连接豆包API</span>
        </div>
      </div>
    </aside>
  )
}
