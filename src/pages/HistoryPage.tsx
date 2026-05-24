import { useState, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { generateId, deleteRecord, saveRecord } from '../utils/storage'
import { exportRecordsToCSV } from '../utils/export'
import Modal from '../components/shared/Modal'
import ImageUploader from '../components/shared/ImageUploader'
import FloatingButton from '../components/shared/FloatingButton'
import type { DishRecord } from '../types'

const emptyRecord: DishRecord = {
  id: '',
  userId: '',
  dishName: '',
  calories: 0,
  image: '',
  ingredients: [],
  createdAt: new Date().toISOString().slice(0, 16),
  mealType: 'lunch',
}

export default function HistoryPage() {
  const [records, setRecords] = useLocalStorage<DishRecord[]>('lfm_records', [])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<DishRecord>({ ...emptyRecord })
  const [ingredientInput, setIngredientInput] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const sortedRecords = useMemo(
    () => [...records].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [records]
  )

  const stats = useMemo(() => {
    const now = new Date()
    const todayStr = now.toDateString()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const todayRecords = records.filter(r => new Date(r.createdAt).toDateString() === todayStr)
    const weekRecords = records.filter(r => new Date(r.createdAt) >= weekAgo)

    const todayCals = todayRecords.reduce((s, r) => s + r.calories, 0)
    const weekDays = new Set(weekRecords.map(r => new Date(r.createdAt).toDateString())).size || 1
    const weekAvg = Math.round(weekRecords.reduce((s, r) => s + r.calories, 0) / weekDays)

    return { todayCals, weekAvg }
  }, [records])

  const openAdd = () => {
    setEditing({
      ...emptyRecord,
      id: generateId(),
      userId: 'user_001',
      createdAt: new Date().toISOString().slice(0, 16),
    })
    setIngredientInput('')
    setShowModal(true)
  }

  const openEdit = (record: DishRecord) => {
    setEditing({ ...record })
    setIngredientInput('')
    setShowModal(true)
  }

  const handleSave = () => {
    if (!editing.dishName.trim()) return
    saveRecord(editing)
    setRecords(prev => {
      const idx = prev.findIndex(r => r.id === editing.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = editing
        return next
      }
      return [editing, ...prev]
    })
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    deleteRecord(id)
    setRecords(prev => prev.filter(r => r.id !== id))
    setDeleteConfirm(null)
  }

  const addIngredient = () => {
    const val = ingredientInput.trim()
    if (!val) return
    if (editing.ingredients.includes(val)) {
      setIngredientInput('')
      return
    }
    setEditing(prev => ({ ...prev, ingredients: [...prev.ingredients, val] }))
    setIngredientInput('')
  }

  const removeIngredient = (index: number) => {
    setEditing(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const mealTypeLabel: Record<string, string> = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    snack: '加餐',
  }

  return (
    <div className="page-transition px-4 pt-4 pb-4">
      <h1 className="text-lg font-bold mb-3">📋 饮食记录</h1>

      {/* Stats — today + weekly */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        <div className="card text-center py-3">
          <p className="text-xs text-gray-400">今日摄入</p>
          <p className="text-2xl font-bold text-primary-500">{stats.todayCals}</p>
          <p className="text-xs text-gray-400">kcal</p>
        </div>
        <div className="card text-center py-3">
          <p className="text-xs text-gray-400">本周日均</p>
          <p className="text-2xl font-bold text-primary-500">{stats.weekAvg}</p>
          <p className="text-xs text-gray-400">kcal</p>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-gray-400">
          共 {records.length} 条记录
        </span>
      </div>

      {/* Records list */}
      {sortedRecords.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-gray-400">还没有记录</p>
          <p className="text-sm text-gray-400 mt-1">点击右下角 + 开始记录</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedRecords.map(record => (
            <div key={record.id} className="card animate-slide-up">
              {record.image && (
                <img
                  src={record.image}
                  alt={record.dishName}
                  className="w-full h-44 rounded-xl object-cover mb-3"
                />
              )}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-1.5 py-0.5 rounded bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                      {mealTypeLabel[record.mealType]}
                    </span>
                    <h3 className="font-semibold truncate">{record.dishName}</h3>
                  </div>
                  {record.ingredients.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {record.ingredients.map((ing, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                          {ing}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-gray-400">
                      {new Date(record.createdAt).toLocaleString('zh-CN', {
                        month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                    <button onClick={() => openEdit(record)} className="text-xs text-gray-400 hover:text-primary-500">
                      ✏️ 编辑
                    </button>
                    <button onClick={() => setDeleteConfirm(record.id)} className="text-xs text-gray-400 hover:text-red-500">
                      🗑 删除
                    </button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xl font-bold text-primary-500">{record.calories}</span>
                  <span className="text-xs text-gray-400 ml-0.5 block">kcal</span>
                </div>
              </div>
            </div>
          ))}

          {/* CSV export at bottom */}
          <div className="text-center pt-2">
            <button
              onClick={() => exportRecordsToCSV(records)}
              className="text-sm text-gray-400 hover:text-primary-500 transition-colors"
            >
              📥 导出CSV
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing.id && records.some(r => r.id === editing.id) ? '编辑记录' : '添加记录'}>
        <div className="space-y-4">
          <ImageUploader
            value={editing.image}
            onChange={base64 => setEditing(prev => ({ ...prev, image: base64 }))}
          />

          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">
              菜品名称 *
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="如：鸡胸肉藜麦沙拉"
              value={editing.dishName}
              onChange={e => setEditing(prev => ({ ...prev, dishName: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                卡路里 (kcal)
              </label>
              <input
                type="number"
                className="input-field"
                placeholder="300"
                value={editing.calories || ''}
                onChange={e => setEditing(prev => ({ ...prev, calories: Number(e.target.value) }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                餐食类型
              </label>
              <select
                className="input-field"
                value={editing.mealType}
                onChange={e => setEditing(prev => ({ ...prev, mealType: e.target.value as DishRecord['mealType'] }))}
              >
                <option value="breakfast">早餐</option>
                <option value="lunch">午餐</option>
                <option value="dinner">晚餐</option>
                <option value="snack">加餐</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">
              日期时间
            </label>
            <input
              type="datetime-local"
              className="input-field"
              value={editing.createdAt}
              onChange={e => setEditing(prev => ({ ...prev, createdAt: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">
              食材标签
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="input-field flex-1"
                placeholder="输入食材名称"
                value={ingredientInput}
                onChange={e => setIngredientInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addIngredient()
                  }
                }}
              />
              <button
                onClick={addIngredient}
                className="w-12 h-12 rounded-xl bg-primary-400 text-white text-xl font-bold active:scale-90 transition-all flex-shrink-0 flex items-center justify-center"
              >
                +
              </button>
            </div>
            {editing.ingredients.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {editing.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="tag gap-2 cursor-pointer"
                    onClick={() => removeIngredient(i)}
                  >
                    {ing}
                    <span className="text-xs opacity-60">✕</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">
              取消
            </button>
            <button onClick={handleSave} className="btn-primary flex-1">
              保存
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="确认删除">
        <p className="text-gray-500 dark:text-gray-400 mb-4">确定要删除这条记录吗？此操作不可撤销。</p>
        <div className="flex gap-2">
          <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1">取消</button>
          <button
            onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold active:scale-95 transition-all"
          >
            确认删除
          </button>
        </div>
      </Modal>

      <FloatingButton onClick={openAdd} />
    </div>
  )
}
