import React, { useState } from 'react'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import { callDoubaoChar, fallbackChar } from '../../services/mockApi.js'

export default function CharacterSeedCard() {
  const [seed, setSeed] = useState(null)
  const [loading, setLoading] = useState(false)
  const [usedFallback, setUsedFallback] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    setSeed(null)
    setUsedFallback(false)
    try {
      const result = await callDoubaoChar()
      setSeed(result)
    } catch {
      const result = fallbackChar()
      setSeed(result)
      setUsedFallback(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      title="人物种子生成器"
      icon="👤"
      subtitle="随机组合「职业 × 反差 × 秘密」"
      action={usedFallback && (
        <span className="text-xs px-2 py-1 rounded bg-amber-50 text-amber-600 border border-amber-100">
          已降级到本地模板
        </span>
      )}
    >
      <div className="mb-4">
        <Button variant="primary" loading={loading} onClick={handleGenerate} disabled={loading}>
          {loading ? '生成中...' : '生成一个种子'}
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-8 flex flex-col items-center gap-3 text-gray-400">
          <span className="spinner" style={{ width: 28, height: 28 }} />
          <span className="text-sm">正在组合元素...</span>
        </div>
      )}

      {/* Seed Display */}
      {!loading && seed && (
        <div className="animate-scaleIn">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 p-4 text-center">
              <div className="text-xs text-blue-400 mb-1 font-medium">职业</div>
              <div className="text-sm font-semibold text-blue-700 leading-tight">{seed.profession}</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-100 p-4 text-center">
              <div className="text-xs text-amber-500 mb-1 font-medium">反差</div>
              <div className="text-sm font-semibold text-amber-700 leading-tight">{seed.contrast}</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-100 p-4 text-center">
              <div className="text-xs text-brand-500 mb-1 font-medium">秘密</div>
              <div className="text-sm font-semibold text-brand-700 leading-tight">{seed.secret}</div>
            </div>
          </div>

          {/* Seed Summary */}
          <div className="mt-3 px-3 py-2.5 rounded-lg bg-gray-50 text-sm text-gray-600">
            <span className="text-gray-400">人设梗概：</span>
            <span className="text-gray-700">
              {seed.profession} · {seed.contrast} · {seed.secret}
            </span>
          </div>

          {/* Example hint */}
          <div className="mt-2 text-xs text-gray-300 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            示例：外科医生 × 偏执型恋爱脑 × 祖传玉佩
          </div>
        </div>
      )}

      {!loading && !seed && (
        <div className="py-8 text-center">
          <div className="text-sm text-gray-300 mb-2">点击「生成一个种子」开始</div>
          <div className="text-xs text-gray-300">
            示例：外科医生 × 偏执型恋爱脑 × 祖传玉佩
          </div>
        </div>
      )}
    </Card>
  )
}
