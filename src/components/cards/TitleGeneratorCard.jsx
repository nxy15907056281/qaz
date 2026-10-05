import React, { useState } from 'react'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import { callDoubaoTitle, fallbackTitle } from '../../services/mockApi.js'

export default function TitleGeneratorCard() {
  const [keyword, setKeyword] = useState('')
  const [titles, setTitles] = useState([])
  const [loading, setLoading] = useState(false)
  const [usedFallback, setUsedFallback] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    setTitles([])
    setUsedFallback(false)
    try {
      const result = await callDoubaoTitle(keyword)
      setTitles(result)
    } catch {
      const result = fallbackTitle(keyword)
      setTitles(result)
      setUsedFallback(true)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text)
  }

  return (
    <Card
      title="标题生成器"
      icon="🏷️"
      subtitle="数字 + 异常证据 + 「我发现XX」句式：一键生成 5 个候选"
      action={usedFallback && (
        <span className="text-xs px-2 py-1 rounded bg-amber-50 text-amber-600 border border-amber-100">
          已降级到本地模板
        </span>
      )}
    >
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="可选：输入关键词（如：豪门弃女）"
          className="input-base"
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleGenerate()}
        />
        <Button variant="primary" loading={loading} onClick={handleGenerate} disabled={loading}>
          {loading ? '生成中...' : '生成 5 个标题'}
        </Button>
      </div>

      {/* Results */}
      <div className="space-y-2">
        {loading && (
          <div className="py-8 flex flex-col items-center gap-3 text-gray-400">
            <span className="spinner" style={{ width: 28, height: 28 }} />
            <span className="text-sm">正在调用豆包生成...</span>
          </div>
        )}

        {!loading && titles.length > 0 && titles.map((t, i) => (
          <div
            key={i}
            className="group flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-brand-50 transition-all duration-200 animate-fadeInUp"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="w-6 h-6 rounded-md bg-brand-100 text-brand-600 text-xs font-semibold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700 truncate">{t}</span>
            </div>
            <button
              onClick={() => copyToClipboard(t)}
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs text-brand-500 hover:text-brand-700 shrink-0"
            >
              复制
            </button>
          </div>
        ))}

        {!loading && titles.length === 0 && (
          <div className="py-8 text-center text-sm text-gray-300">
            点击「生成 5 个标题」开始
          </div>
        )}
      </div>
    </Card>
  )
}
