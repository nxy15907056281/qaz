import React, { useState } from 'react'

export default function HelpButton() {
  const [open, setOpen] = useState(false)

  const shortcuts = [
    { cmd: '新建项目《项目名》N集', desc: '创建新项目并指定集数' },
    { cmd: '起个名字', desc: '调用取名工具生成随机角色名' },
    { cmd: '导出剧本', desc: '将当前项目剧本导出为 .txt / .docx' },
    { cmd: '生成5个标题', desc: '使用标题公式生成候选' },
    { cmd: '生成一个种子', desc: '随机组合"职业 × 反差 × 秘密"' },
  ]

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-brand-500 text-white shadow-lg hover:bg-brand-600 hover:shadow-xl transition-all duration-300 flex items-center justify-center text-xl font-bold z-50 active:scale-95"
        title="帮助"
      >
        ?
      </button>

      {/* Help panel */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-scaleIn overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50">
              <h4 className="text-sm font-semibold text-gray-800">全局指令速查</h4>
              <p className="text-xs text-gray-400 mt-0.5">在顶部输入框输入后点击「执行」</p>
            </div>
            <div className="p-3 space-y-2 max-h-72 overflow-y-auto">
              {shortcuts.map((s, i) => (
                <div key={i} className="px-3 py-2 rounded-lg hover:bg-gray-50 transition-all">
                  <div className="text-sm text-gray-700 font-medium">{s.cmd}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 bg-gray-50 text-xs text-gray-400 text-center">
              WorkBuddy AI · 短剧编剧工作台 v1.0
            </div>
          </div>
        </>
      )}
    </>
  )
}
