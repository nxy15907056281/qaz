import React, { useState, useCallback } from 'react'
import TopBar from './components/layout/TopBar.jsx'
import TabBar from './components/layout/TabBar.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import HelpButton from './components/layout/HelpButton.jsx'
import TitleGeneratorCard from './components/cards/TitleGeneratorCard.jsx'
import CharacterSeedCard from './components/cards/CharacterSeedCard.jsx'
import TrackTopicCard from './components/cards/TrackTopicCard.jsx'
import DailyNewsCard from './components/cards/DailyNewsCard.jsx'

// Placeholder pages for other sidebar items
function PlaceholderPage({ title, icon, desc }) {
  return (
    <div className="card-base p-12 flex flex-col items-center justify-center text-center animate-fadeIn">
      <div className="text-5xl mb-4 opacity-50">{icon}</div>
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-sm text-gray-400 max-w-md leading-relaxed">{desc}</p>
      <div className="mt-4 px-4 py-2 rounded-lg bg-brand-50 text-xs text-brand-600">
        🚧 功能开发中
      </div>
    </div>
  )
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [activePage, setActivePage] = useState('home')

  // Tabs state
  const [tabs, setTabs] = useState([
    { id: 'project-1', label: '我的新项目', closable: false },
    { id: 'project-2', label: '笑疯！妈宝换身后替姐嫁隐汉', closable: true },
  ])
  const [activeTabId, setActiveTabId] = useState('project-1')

  const handleNewTab = useCallback(() => {
    const id = `project-${Date.now()}`
    setTabs((prev) => [...prev, { id, label: `新项目 ${prev.length + 1}`, closable: true }])
    setActiveTabId(id)
  }, [])

  const handleCloseTab = useCallback((id) => {
    setTabs((prev) => {
      const filtered = prev.filter((t) => t.id !== id)
      if (id === activeTabId && filtered.length > 0) {
        setActiveTabId(filtered[filtered.length - 1].id)
      }
      return filtered
    })
  }, [activeTabId])

  // Page routing
  const renderMain = () => {
    // Home / Dashboard view
    if (activePage === 'home' || activePage === 'title-gen' || activePage === 'char-seed' || activePage === 'track-gen' || activePage === 'news') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TitleGeneratorCard />
          <CharacterSeedCard />
          <TrackTopicCard />
          <DailyNewsCard />
        </div>
      )
    }

    const pageMap = {
      outline:        { title: '分集大纲', icon: '📋', desc: '结构化拆解每集的钩子、冲突点、情绪节奏。' },
      script:         { title: '剧本创作', icon: '✍️', desc: '逐集撰写对白、动作、镜头提示，支持版本回滚。' },
      assistant:      { title: '小助理', icon: '💬', desc: '基于大模型的对话式助手，回答剧本、人设、桥段问题。' },
      tools:          { title: '辅助工具', icon: '🛠️', desc: '节奏卡尺、字数统计、对标分析等实用小工具集合。' },
      version:        { title: '版本管理', icon: '📅', desc: '版本快照、Diff 对比、一键回滚。' },
      checkup:        { title: '剧本自检', icon: '🔍', desc: '自动检查节奏失衡、人物前后矛盾、口播超时等。' },
      analysis:       { title: '红果爆款拆解', icon: '🔥', desc: '拆解爆款短剧的结构、人设、台词钩子，一键复用模板。' },
      memo:           { title: '备忘录', icon: '📝', desc: '随手记录灵感、台词片段、桥段草稿，支持标签分类。' },
      mindmap:        { title: '剧情导图', icon: '🗺️', desc: '可视化剧情分支，拖拽连线，标记关键转折点。' },
      'name-ancient': { title: '古风取名', icon: '🏯', desc: '诗经、楚辞、唐宋词等文源取角色名，支持性别/字数筛选。' },
      'name-modern':  { title: '现代取名', icon: '🏙️', desc: '结合时代潮流的现代角色取名工具。' },
      hooks:          { title: '名场面钩子库', icon: '🪝', desc: '行业精选的开场钩子、转折钩子、结尾钩子库，支持标签筛选。' },
      settings:       { title: '设置', icon: '⚙️', desc: '豆包 API Key 配置、主题切换、导出格式偏好等。' },
    }

    const info = pageMap[activePage]
    if (info) {
      return <PlaceholderPage {...info} />
    }
    return <PlaceholderPage title="页面" icon="📄" desc="未找到对应页面。" />
  }

  // Sidebar item select: all go to the page; but home-related items use home view
  const handleSelect = (id) => {
    setActivePage(id)
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8faf9]">
      <TopBar
        onToggleSidebar={() => setCollapsed(!collapsed)}
        onExecuteCommand={(cmd) => {
          // Simple command parsing for demo
          if (cmd.includes('新建项目') || cmd.includes('新建')) {
            handleNewTab()
          } else {
            alert(`已收到指令：${cmd}\n（演示版：暂未接入完整指令解析）`)
          }
        }}
      />
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={setActiveTabId}
        onCloseTab={handleCloseTab}
        onNewTab={handleNewTab}
      />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeId={activePage} onSelect={handleSelect} collapsed={collapsed} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderMain()}
        </main>
      </div>
      <HelpButton />
    </div>
  )
}
