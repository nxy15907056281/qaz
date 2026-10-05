import React, { useState } from 'react'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import { callDoubaoTrack, fallbackTrack, trackOptions } from '../../services/mockApi.js'

export default function TrackTopicCard() {
  const [trackId, setTrackId] = useState('female_suspense')
  const [elements, setElements] = useState('')
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(false)
  const [usedFallback, setUsedFallback] = useState(false)
  const [apiStatus, setApiStatus] = useState('idle')

  const handleGenerate = async () => {
    setLoading(true)
    setStories([])
    setUsedFallback(false)
    setApiStatus('calling')
    try {
      const result = await callDoubaoTrack(trackId, elements)
      setStories(result)
      setApiStatus('success')
    } catch {
      const result = fallbackTrack(trackId, elements)
      setStories(result)
      setUsedFallback(true)
      setApiStatus('fallback')
    } finally {
      setLoading(false)
    }
  }

  const currentTrack = trackOptions.find((t) => t.id === trackId)

  return (
    <Card
      title="赛道选题生成器"
      icon="🎯"
      subtitle="选择赛道 → 输入元素 → 调用豆包 API 生成 3 个故事梗概（含降级策略）"
      action={usedFallback && (
        <span className="text-xs px-2 py-1 rounded bg-amber-50 text-amber-600 border border-amber-100">
          已降级到本地模板
        </span>
      )}
    >
      <div className="space-y-3 mb-4">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">赛道</label>
          <select
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            className="input-base cursor-pointer"
          >
            {trackOptions.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">可选：想写的元素</label>
          <input
            type="text"
            value={elements}
            onChange={(e) => setElements(e.target.value)}
            placeholder="如：豪门、替嫁、萌宝、马甲、复仇..."
            className="input-base"
            onKeyDown={(e) => e.key === 'Enter' && !loading && handleGenerate()}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" loading={loading} onClick={handleGenerate} disabled={loading}>
            {loading ? '生成中...' : '生成 3 个故事'}
          </Button>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-400">API 状态：</span>
            {apiStatus === 'idle' && (
              <span className="flex items-center gap-1 text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />待命
              </span>
            )}
            {apiStatus === 'calling' && (
              <span className="flex items-center gap-1 text-blue-500">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />调用中
              </span>
            )}
            {apiStatus === 'success' && (
              <span className="flex items-center gap-1 text-brand-600">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />豆包API
              </span>
            )}
            {apiStatus === 'fallback' && (
              <span className="flex items-center gap-1 text-amber-500">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />本地模板
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2">
        {loading && (
          <div className="py-8 flex flex-col items-center gap-3 text-gray-400">
            <span className="spinner" style={{ width: 28, height: 28 }} />
            <span className="text-sm">正在调用豆包 API 生成「{currentTrack?.label}」故事...</span>
          </div>
        )}

        {!loading && stories.length > 0 && stories.map((s, i) => (
          <div
            key={i}
            className="px-3 py-3 rounded-lg bg-gray-50 hover:bg-brand-50 transition-all duration-200 animate-fadeInUp"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start gap-2">
              <span className="w-6 h-6 rounded-md bg-brand-100 text-brand-600 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">{s}</p>
            </div>
          </div>
        ))}

        {!loading && stories.length === 0 && (
          <div className="py-8 text-center text-sm text-gray-300">
            选择赛道并点击「生成 3 个故事」
          </div>
        )}
      </div>
    </Card>
  )
}
