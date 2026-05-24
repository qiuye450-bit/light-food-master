import { useState, useMemo, useEffect } from 'react'
import { useApp } from '../contexts/AppContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getCollections } from '../utils/storage'
import { recipes } from '../data/recipes'
import Modal from '../components/shared/Modal'
import DishCard from '../components/shared/DishCard'
import type { DishRecord } from '../types'

const quotes = [
  { text: '你吃下的每一口，都是未来的自己。', author: '轻食大师' },
  { text: '自律给我自由。', author: 'Keep' },
  { text: '身体是灵魂的庙宇，轻食是最好的供奉。', author: '轻食大师' },
  { text: '管住嘴，迈开腿，明天你会感谢今天的自己。', author: '健身谚语' },
  { text: '三分练，七分吃。', author: '健身圈' },
  { text: '吃干净的食物，过简单的生活。', author: '轻食大师' },
  { text: '最好的护肤品，是健康的饮食和充足的睡眠。', author: '轻食大师' },
  { text: '每一餐都是对自己身体的一次投票。', author: '营养学名言' },
  { text: '不要用食物填满空虚，用美食滋养身体。', author: '轻食大师' },
  { text: '轻食不是节食，是学会和食物做朋友。', author: '轻食大师' },
  { text: '人如其食。', author: 'Brillat-Savarin' },
  { text: '健康不是一切，但没有健康就没有一切。', author: '叔本华' },
  { text: '你今天的饮食习惯，决定十年后的体检报告。', author: '轻食大师' },
  { text: '少油少盐，多蔬多果，简单的道理坚持做。', author: '轻食大师' },
  { text: '美食不一定要油腻，清淡也可以很美味。', author: '轻食大师' },
  { text: '减肥不是目的，健康的生活方式才是。', author: '轻食大师' },
  { text: '每日轻食，轻盈人生。', author: '轻食大师' },
  { text: '人生如烹饪，火候到了自然香。', author: '轻食大师' },
  { text: '别让食物控制你，你来选择食物。', author: '轻食大师' },
  { text: '好身材是厨房里养出来的。', author: '健身谚语' },
]

function getQuoteIndex() {
  // Rotate every 10 minutes based on current time
  const tenMin = Math.floor(Date.now() / 600000)
  return tenMin % quotes.length
}

export default function ProfilePage() {
  const { user, updateUser, darkMode, toggleDarkMode } = useApp()
  const [records] = useLocalStorage<DishRecord[]>('lfm_records', [])
  const [showSettings, setShowSettings] = useState<'target' | 'preferences' | 'collections' | 'about' | null>(null)
  const [tempValue, setTempValue] = useState('')
  const [quoteIdx, setQuoteIdx] = useState(getQuoteIndex())

  useEffect(() => {
    const timer = setInterval(() => setQuoteIdx(getQuoteIndex()), 60000)
    return () => clearInterval(timer)
  }, [])

  const stats = useMemo(() => {
    const days = new Set(records.map(r => new Date(r.createdAt).toDateString())).size
    const totalCals = records.reduce((s, r) => s + r.calories, 0)
    const avgDaily = days > 0 ? Math.round(totalCals / days) : 0

    // Calculate streak
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      const dateStr = d.toDateString()
      const hasRecord = records.some(r => new Date(r.createdAt).toDateString() === dateStr)
      if (i === 0) {
        if (hasRecord) streak = 1
        else break
      } else {
        if (hasRecord) streak++
        else break
      }
    }
    return { days, totalCals, avgDaily, streak }
  }, [records])

  const collections = useMemo(() => {
    const ids = getCollections()
    return recipes.filter(r => ids.includes(r.id))
  }, [])

  const menuItems = [
    { key: 'collections' as const, icon: '⭐', label: '我的收藏', desc: `${collections.length} 道菜谱` },
    { key: 'preferences' as const, icon: '🍽️', label: '饮食偏好', desc: user.preferences.length ? user.preferences.slice(0, 3).join('、') : '未设置' },
    { key: 'target' as const, icon: '🎯', label: '目标卡路里', desc: `${user.targetCalories} kcal/天` },
    { key: 'about' as const, icon: 'ℹ️', label: '关于轻食大师', desc: 'v1.0.0' },
  ]

  const openSetting = (key: typeof showSettings) => {
    if (key === 'target') setTempValue(String(user.targetCalories))
    setShowSettings(key)
  }

  const saveSetting = () => {
    if (showSettings === 'target') {
      const val = Number(tempValue)
      if (val > 0) updateUser({ ...user, targetCalories: val })
    }
    setShowSettings(null)
  }

  const quote = quotes[quoteIdx]

  return (
    <div className="page-transition px-4 pt-4 pb-4">
      {/* Profile header */}
      <div className="card flex items-center gap-3 mb-3 py-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
          {user.avatar || user.nickname[0]}
        </div>
        <div>
          <h2 className="text-base font-bold">{user.nickname}</h2>
          <p className="text-xs text-gray-400">坚持健康饮食</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-3">
        <div className="card text-center py-2.5">
          <p className="text-lg font-bold text-primary-500">{stats.days}</p>
          <p className="text-xs text-gray-400">记录天数</p>
        </div>
        <div className="card text-center py-2.5">
          <p className="text-lg font-bold text-primary-500">{stats.avgDaily.toLocaleString()}</p>
          <p className="text-xs text-gray-400">日均摄入(kcal)</p>
        </div>
        <div className="card text-center py-2.5">
          <p className="text-lg font-bold text-primary-500">{stats.streak}</p>
          <p className="text-xs text-gray-400">连续天数</p>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="card mb-3 py-3 bg-gradient-to-r from-primary-50 to-green-50 dark:from-primary-900/20 dark:to-green-900/10 border-primary-100 dark:border-primary-800/30">
        <p className="text-sm text-primary-700 dark:text-primary-300 text-center leading-relaxed">
          「{quote.text}」
        </p>
        <p className="text-xs text-primary-400 dark:text-primary-500 text-center mt-1.5">
          —— {quote.author}
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-1.5">
        {menuItems.map(item => (
          <button
            key={item.key}
            onClick={() => openSetting(item.key)}
            className="card w-full flex items-center gap-3 text-left hover:border-primary-300 transition-colors py-3"
          >
            <span className="text-lg">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-xs text-gray-400 truncate">{item.desc}</p>
            </div>
            <span className="text-gray-300 text-sm">›</span>
          </button>
        ))}
      </div>

      {/* Dark mode toggle */}
      <div className="card mt-1.5 flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <span className="text-lg">🌙</span>
          <p className="font-medium text-sm">暗黑模式</p>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`w-11 h-6 rounded-full transition-colors relative ${
            darkMode ? 'bg-primary-500' : 'bg-gray-300'
          }`}
        >
          <span
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200"
            style={{ left: darkMode ? '22px' : '2px' }}
          />
        </button>
      </div>

      {/* Logout */}
      <button className="w-full mt-4 py-3 text-gray-400 text-xs hover:text-red-400 transition-colors">
        退出登录
      </button>

      {/* Settings modals */}
      <Modal open={showSettings === 'target'} onClose={() => setShowSettings(null)} title="目标卡路里设置">
        <div className="space-y-4">
          <p className="text-sm text-gray-400">设置每日卡路里摄入目标</p>
          <input
            type="number"
            className="input-field"
            placeholder="1200"
            value={tempValue}
            onChange={e => setTempValue(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={() => setShowSettings(null)} className="btn-secondary flex-1">取消</button>
            <button onClick={saveSetting} className="btn-primary flex-1">保存</button>
          </div>
        </div>
      </Modal>

      <Modal open={showSettings === 'preferences'} onClose={() => setShowSettings(null)} title="饮食偏好">
        <div className="space-y-4">
          <p className="text-sm text-gray-400">设置你的饮食偏好，我们将据此推荐菜单</p>
          <div className="flex flex-wrap gap-2">
            {['低卡', '高蛋白', '素食', '低碳水', '海鲜', '鸡肉', '牛肉', '辛辣'].map(pref => {
              const active = user.preferences.includes(pref)
              return (
                <button
                  key={pref}
                  onClick={() => {
                    const next = active
                      ? user.preferences.filter(p => p !== pref)
                      : [...user.preferences, pref]
                    updateUser({ ...user, preferences: next })
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    active
                      ? 'bg-primary-100 text-primary-700 border border-primary-300 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'bg-gray-100 text-gray-500 border border-transparent dark:bg-gray-700 dark:text-gray-400'
                  }`}
                >
                  {pref}
                </button>
              )
            })}
          </div>
          <button onClick={() => setShowSettings(null)} className="btn-primary w-full">完成</button>
        </div>
      </Modal>

      <Modal open={showSettings === 'collections'} onClose={() => setShowSettings(null)} title="我的收藏">
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {collections.length === 0 ? (
            <p className="text-center text-gray-400 py-8">还没有收藏菜谱</p>
          ) : (
            collections.map(recipe => (
              <DishCard key={recipe.id} recipe={recipe} />
            ))
          )}
        </div>
      </Modal>

      <Modal open={showSettings === 'about'} onClose={() => setShowSettings(null)} title="关于轻食大师">
        <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
          <p>🥗 轻食大师 v1.0.0</p>
          <p>遵循211饮食法，智能生成低卡菜单，帮助买菜做饭爱好者和减肥人群科学配餐、轻松减脂。</p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">211饮食法</p>
            <p>每餐中蔬菜占50%、蛋白质占25%、主食占25%，确保均衡营养的同时控制卡路里摄入。</p>
          </div>
          <p className="text-xs">数据存储于本地浏览器中，不会上传至服务器。</p>
        </div>
      </Modal>
    </div>
  )
}
