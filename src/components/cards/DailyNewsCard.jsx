import React, { useState } from 'react'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'

export default function DailyNewsCard() {
  const [news, setNews] = useState([])
  const [showPasteModal, setShowPasteModal] = useState(false)
  const [pasteText, setPasteText] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newItem, setNewItem] = useState({ title: '', source: '', content: '' })

  const today = new Date()
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const handlePasteImport = () => {
    setShowPasteModal(true)
    setPasteText('')
  }

  const confirmPaste = () => {
    if (!pasteText.trim()) return
    const lines = pasteText.trim().split(/\n\n+|\n/).filter((l) => l.trim())
    const items = lines.map((line) => {
      const m = line.match(/^(.+?)[—–\-]\s*(.+)$/)
      return {
        title: m ? m[1].trim() : line.slice(0, 40),
        source: m ? m[2].trim() : '',
        content: line,
        date: dateStr,
        id: Date.now() + Math.random(),
      }
    })
    setNews((prev) => [...items, ...prev])
    setShowPasteModal(false)
    setPasteText('')
  }

  const confirmAdd = () => {
    if (!newItem.title.trim()) return
    setNews((prev) => [{
      title: newItem.title,
      source: newItem.source,
      content: newItem.content || newItem.title,
      date: dateStr,
      id: Date.now() + Math.random(),
    }, ...prev])
    setShowAddModal(false)
    setNewItem({ title: '', source: '', content: '' })
  }

  const clearAll = () => {
    if (news.length === 0) return
    if (confirm('确定清空全部新闻吗？')) setNews([])
  }

  const exportNews = () => {
    if (news.length === 0) return
    const text = news.map((n, i) =>
      `${i + 1}. ${n.title}${n.source ? ` — ${n.source}` : ''}\n   ${n.content}\n   (${n.date})\n`
    ).join('\n')
    const blob = new Blob([`每日短剧新闻 — ${dateStr}\n\n${text}`], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `短剧新闻_${dateStr}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Card
        title="每日短剧新闻"
        icon="📰"
        subtitle="行业资讯的粘贴、管理、导出"
        action={
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" onClick={handlePasteImport}>粘贴导入</Button>
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(true)}>手动添加</Button>
            <Button variant="ghost" size="sm" onClick={clearAll}>清空</Button>
            <Button variant="secondary" size="sm" onClick={exportNews}>导出</Button>
          </div>
        }
      >
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {news.length > 0 && (
            <div className="text-xs text-gray-400 px-1 pb-1">
              {dateStr} · 共 {news.length} 条
            </div>
          )}
          {news.map((n) => (
            <div key={n.id} className="group px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-brand-50 transition-all duration-200 animate-fadeInUp">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-700 truncate">{n.title}</div>
                  {n.source && <div className="text-xs text-gray-400 mt-0.5 truncate">{n.source}</div>}
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{n.content}</div>
                </div>
                <button
                  onClick={() => setNews((prev) => prev.filter((x) => x.id !== n.id))}
                  className="opacity-0 group-hover:opacity-100 text-xs text-gray-400 hover:text-red-500 transition-all shrink-0"
                >
                  删除
                </button>
              </div>
            </div>
          ))}

          {news.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-300">
              <div className="text-3xl mb-2 opacity-40">📭</div>
              <div>暂无新闻内容</div>
              <div className="text-xs mt-1">点击「粘贴导入」或「手动添加」开始</div>
            </div>
          )}
        </div>
      </Card>

      {/* Paste Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fadeIn" onClick={() => setShowPasteModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-gray-800 mb-2">粘贴导入</h3>
            <p className="text-xs text-gray-400 mb-3">每行一条新闻，格式：标题 — 来源 / 或直接粘贴正文，系统会自动识别</p>
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              rows={10}
              placeholder={`红果爆款榜TOP1《契约娇妻》昨日新增充值破百万 — DataEye\n抖音短剧大爆款拆解：替嫁萌宝赛道饱和 — 新榜\n...`}
              className="input-base font-mono text-xs resize-none"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={() => setShowPasteModal(false)}>取消</Button>
              <Button variant="primary" onClick={confirmPaste}>导入</Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fadeIn" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-gray-800 mb-4">手动添加</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">标题 *</label>
                <input value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="如：红果新增短剧《XX》破亿" className="input-base" autoFocus />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">来源</label>
                <input value={newItem.source} onChange={(e) => setNewItem({ ...newItem, source: e.target.value })}
                  placeholder="如：DataEye / 新榜 / 瞎看" className="input-base" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">内容</label>
                <textarea value={newItem.content} onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                  rows={4} placeholder="正文内容..." className="input-base resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={() => setShowAddModal(false)}>取消</Button>
              <Button variant="primary" onClick={confirmAdd} disabled={!newItem.title.trim()}>添加</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
