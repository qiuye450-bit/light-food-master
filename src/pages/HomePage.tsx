import { useState, useCallback, useEffect } from 'react'
import NutritionRing from '../components/shared/NutritionRing'
import DishCard from '../components/shared/DishCard'
import { generateDayMenu, getRecipesByIngredients } from '../data/recipes'
import { generateRecipeWithAI } from '../utils/ai'
import { useApp } from '../contexts/AppContext'
import type { Recipe, MenuItem, DishRecord } from '../types'
import { generateId, saveRecord, getItem, setItem } from '../utils/storage'

type ActivePanel = 'no-buy' | 'have-buy'

export default function HomePage() {
  const { user } = useApp()
  const [activePanel, setActivePanel] = useState<ActivePanel | null>(null)
  const [ingredients, setIngredients] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [totalCalories, setTotalCalories] = useState(0)
  const [totalNutrition, setTotalNutrition] = useState({ vegetables: 50, protein: 25, carbs: 25 })
  const [loading, setLoading] = useState(false)
  const [aiGenerated, setAiGenerated] = useState<Recipe[]>([])
  const [eatenIds, setEatenIds] = useState<Set<string>>(new Set())
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const onboarded = getItem('lfm_onboarded', false)
    if (!onboarded) {
      setShowOnboarding(true)
    }
  }, [])

  const dismissOnboarding = () => {
    setShowOnboarding(false)
    setItem('lfm_onboarded', true)
  }

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel(prev => (prev === panel ? null : panel))
  }

  const addIngredient = () => {
    const value = inputValue.trim()
    if (!value) return
    if (ingredients.includes(value)) {
      setInputValue('')
      return
    }
    setIngredients(prev => [...prev, value])
    setInputValue('')
  }

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addIngredient()
    }
  }

  const handleGenerateMenu = useCallback(async () => {
    setLoading(true)

    if (activePanel === 'no-buy') {
      const menu = generateDayMenu()
      const items: MenuItem[] = [
        { recipe: menu.breakfast, mealType: 'breakfast' },
        { recipe: menu.lunch, mealType: 'lunch' },
        { recipe: menu.dinner, mealType: 'dinner' },
      ]
      setMenuItems(items)
      setTotalCalories(menu.totalCalories)
      setTotalNutrition({
        vegetables: Math.round(items.reduce((s, i) => s + i.recipe.nutrition.vegetables, 0) / items.length),
        protein: Math.round(items.reduce((s, i) => s + i.recipe.nutrition.protein, 0) / items.length),
        carbs: Math.round(items.reduce((s, i) => s + i.recipe.nutrition.carbs, 0) / items.length),
      })
      setAiGenerated([])
    } else if (activePanel === 'have-buy' && ingredients.length > 0) {
      const matched = getRecipesByIngredients(ingredients)
      const menuItemsFromMatched: MenuItem[] = []

      const breakfast = matched.find(r => r.category === 'breakfast')
      const lunch = matched.find(r => r.category === 'lunch')
      const dinner = matched.find(r => r.category === 'dinner')
      const snacks = matched.filter(r => r.category === 'snack')

      if (breakfast) menuItemsFromMatched.push({ recipe: breakfast, mealType: 'breakfast' })
      if (lunch) menuItemsFromMatched.push({ recipe: lunch, mealType: 'lunch' })
      if (dinner) menuItemsFromMatched.push({ recipe: dinner, mealType: 'dinner' })
      snacks.slice(0, 2).forEach(s => menuItemsFromMatched.push({ recipe: s, mealType: 'snack' }))

      if (menuItemsFromMatched.length < 3) {
        const existingTypes = new Set(menuItemsFromMatched.map(m => m.mealType))
        const needed: ('breakfast' | 'lunch' | 'dinner')[] = ['breakfast', 'lunch', 'dinner']
        const missing = needed.filter(t => !existingTypes.has(t))

        const aiResults: Recipe[] = []
        for (const mealType of missing) {
          const aiRecipe = await generateRecipeWithAI(ingredients, mealType)
          if (aiRecipe) {
            menuItemsFromMatched.push({ recipe: aiRecipe, mealType })
            aiResults.push(aiRecipe)
          }
        }
        setAiGenerated(aiResults)
      }

      if (menuItemsFromMatched.length === 0) {
        const menu = generateDayMenu(ingredients)
        const fallbackItems: MenuItem[] = [
          { recipe: menu.breakfast, mealType: 'breakfast' },
          { recipe: menu.lunch, mealType: 'lunch' },
          { recipe: menu.dinner, mealType: 'dinner' },
        ]
        setMenuItems(fallbackItems)
        setTotalCalories(menu.totalCalories)
        setTotalNutrition({
          vegetables: Math.round(fallbackItems.reduce((s, i) => s + i.recipe.nutrition.vegetables, 0) / 3),
          protein: Math.round(fallbackItems.reduce((s, i) => s + i.recipe.nutrition.protein, 0) / 3),
          carbs: Math.round(fallbackItems.reduce((s, i) => s + i.recipe.nutrition.carbs, 0) / 3),
        })
      } else {
        setMenuItems(menuItemsFromMatched)
        setTotalCalories(menuItemsFromMatched.reduce((s, i) => s + i.recipe.calories, 0))
        setTotalNutrition({
          vegetables: Math.round(menuItemsFromMatched.reduce((s, i) => s + i.recipe.nutrition.vegetables, 0) / menuItemsFromMatched.length),
          protein: Math.round(menuItemsFromMatched.reduce((s, i) => s + i.recipe.nutrition.protein, 0) / menuItemsFromMatched.length),
          carbs: Math.round(menuItemsFromMatched.reduce((s, i) => s + i.recipe.nutrition.carbs, 0) / menuItemsFromMatched.length),
        })
      }
    }

    setLoading(false)
  }, [activePanel, ingredients, user.anthropicKey])

  const handleEatThis = (item: MenuItem) => {
    const record: DishRecord = {
      id: generateId(),
      userId: 'user_001',
      dishName: item.recipe.name,
      calories: item.recipe.calories,
      image: '',
      ingredients: item.recipe.ingredients,
      createdAt: new Date().toISOString().slice(0, 16),
      mealType: item.mealType === 'snack' ? 'snack' : item.mealType,
    }
    saveRecord(record)
    setEatenIds(prev => new Set(prev).add(item.recipe.id))
  }

  const mealTypeLabel: Record<string, string> = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    snack: '加餐',
  }

  return (
    <div className="page-transition px-4 pt-6 pb-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary-500">🥗 轻食大师</h1>
        <p className="text-sm text-gray-400 mt-1">科学配餐 · 轻松减脂</p>
        <p className="text-xs text-gray-400 mt-0.5">遵循211饮食法，智能生成低卡菜单</p>
      </div>

      {/* Two entry cards - always visible */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => togglePanel('no-buy')}
          className={`card py-5 flex flex-col items-center gap-2 transition-all duration-200 active:scale-95 ${
            activePanel === 'no-buy'
              ? 'border-primary-400 shadow-md shadow-primary-100 dark:shadow-primary-900/20 ring-1 ring-primary-300'
              : 'hover:border-primary-200 hover:shadow-sm'
          }`}
        >
          <span className="text-3xl">🛒</span>
          <span className="font-semibold text-base">还没买菜</span>
          <span className="text-xs text-gray-400">智能推荐一日三餐</span>
        </button>

        <button
          onClick={() => togglePanel('have-buy')}
          className={`card py-5 flex flex-col items-center gap-2 transition-all duration-200 active:scale-95 ${
            activePanel === 'have-buy'
              ? 'border-primary-400 shadow-md shadow-primary-100 dark:shadow-primary-900/20 ring-1 ring-primary-300'
              : 'hover:border-primary-200 hover:shadow-sm'
          }`}
        >
          <span className="text-3xl">🥬</span>
          <span className="font-semibold text-base">买好菜了</span>
          <span className="text-xs text-gray-400">输入已有食材生成</span>
        </button>
      </div>

      {/* Expandable panel: "还没买菜" */}
      {activePanel === 'no-buy' && (
        <div className="card mb-4 animate-slide-up border-primary-200">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            根据211饮食法，为你随机搭配一日三餐
          </p>
          <button
            onClick={handleGenerateMenu}
            disabled={loading}
            className="btn-primary w-full text-center disabled:opacity-50"
          >
            {loading ? '⏳ 生成中...' : '🎲 随机生成今日菜单'}
          </button>
        </div>
      )}

      {/* Expandable panel: "买好菜了" */}
      {activePanel === 'have-buy' && (
        <div className="card mb-4 animate-slide-up border-primary-200">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            输入已有食材
          </p>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              className="input-field flex-1"
              placeholder="如：鸡胸肉、西兰花、番茄..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={addIngredient}
              className="w-12 h-12 rounded-xl bg-primary-400 text-white text-xl font-bold active:scale-90 transition-all flex-shrink-0 flex items-center justify-center hover:bg-primary-500"
            >
              +
            </button>
          </div>

          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="tag gap-1.5 cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors"
                  onClick={() => removeIngredient(i)}
                >
                  {ing}
                  <span className="text-xs opacity-50">✕</span>
                </span>
              ))}
            </div>
          )}

          <button
            onClick={handleGenerateMenu}
            disabled={loading || ingredients.length === 0}
            className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ 生成中...' : '🥗 生成菜单'}
          </button>
        </div>
      )}

      {/* Results */}
      {menuItems.length > 0 && (
        <div className="space-y-4 animate-slide-up">
          {/* Summary card */}
          <div className="card text-center">
            <p className="text-sm text-gray-400 mb-1">今日菜单总热量</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-primary-500">{totalCalories}</span>
              <span className="text-gray-400">kcal</span>
            </div>
            {user.targetCalories > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                目标 {user.targetCalories} kcal · {totalCalories <= user.targetCalories ? '✅ 达标' : '⚠️ 超出'}
              </p>
            )}
            <div className="mt-3 flex justify-center">
              <NutritionRing nutrition={totalNutrition} size={140} />
            </div>
          </div>

          {/* AI note */}
          {aiGenerated.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-2 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <span>🤖</span>
              <span>AI 为你生成了 {aiGenerated.length} 道创意菜谱</span>
            </div>
          )}

          {/* Menu items by meal type */}
          {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(mealType => {
            const items = menuItems.filter(m => m.mealType === mealType)
            if (items.length === 0) return null
            return (
              <div key={mealType}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {mealTypeLabel[mealType]}
                  </span>
                  <div className="flex-1 h-px bg-[var(--color-border)]" />
                </div>
                {items.map((item, idx) => (
                  <div key={`${item.recipe.id}-${idx}`} className="relative">
                    <DishCard
                      recipe={item.recipe}
                      showActions={false}
                    />
                    <div className="flex justify-end mt-2">
                      {eatenIds.has(item.recipe.id) ? (
                        <span className="text-sm text-primary-500 font-medium flex items-center gap-1">
                          ✅ 已记录
                        </span>
                      ) : (
                        <button
                          onClick={() => handleEatThis(item)}
                          className="flex items-center gap-1.5 text-sm font-medium text-white bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl px-4 py-2 shadow-sm active:scale-95 transition-all duration-200 hover:shadow-md"
                        >
                          🍴 就吃它了！
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          })}

          {/* Share button */}
          <button
            onClick={() => {
              const text = `🥗 我的今日轻食菜单\n总热量: ${totalCalories} kcal\n${menuItems.map(m => `${mealTypeLabel[m.mealType]}: ${m.recipe.name} (${m.recipe.calories}kcal)`).join('\n')}\n\n—— 轻食大师 · 科学配餐`
              if (navigator.share) {
                navigator.share({ title: '我的轻食菜单', text })
              } else {
                navigator.clipboard.writeText(text)
                alert('已复制到剪贴板')
              }
            }}
            className="w-full btn-secondary flex items-center justify-center gap-2 py-3"
          >
            <span>📤</span>
            <span>分享今日菜单</span>
          </button>
        </div>
      )}

      {/* Onboarding overlay */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-32 animate-fade-in">
          <div className="absolute inset-0 bg-black/50" onClick={dismissOnboarding} />
          <div className="relative flex flex-col items-center gap-4 animate-bounce-soft">
            <span className="text-5xl drop-shadow-lg">👆</span>
            <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 shadow-xl text-center mx-8">
              <p className="font-bold text-lg text-gray-800 dark:text-gray-100">从这里开始！</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                还没买菜？随机推荐菜单<br />买好菜了？输入食材智能生成
              </p>
              <button
                onClick={dismissOnboarding}
                className="mt-3 btn-primary text-sm py-2 px-6"
              >
                知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
