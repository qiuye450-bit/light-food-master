import type { Recipe } from '../../types'
import { isCollected, toggleCollection } from '../../utils/storage'
import { useState } from 'react'

interface Props {
  recipe: Recipe
  showActions?: boolean
  onAddToMenu?: (recipe: Recipe) => void
}

export default function DishCard({ recipe, showActions = true, onAddToMenu }: Props) {
  const [collected, setCollected] = useState(() => isCollected(recipe.id))
  const [showSteps, setShowSteps] = useState(false)

  const categoryLabel: Record<string, string> = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    snack: '加餐',
  }

  const handleCollect = () => {
    const result = toggleCollection(recipe.id)
    setCollected(result)
  }

  return (
    <div className="card animate-slide-up">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              {categoryLabel[recipe.category]}
            </span>
            <h3 className="font-semibold text-lg">{recipe.name}</h3>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {recipe.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-primary-500">{recipe.calories}</span>
          <span className="text-sm text-gray-400 ml-0.5">kcal</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {recipe.ingredients.map(ing => (
          <span key={ing} className="tag text-xs">{ing}</span>
        ))}
      </div>

      {showSteps && (
        <div className="border-t border-[var(--color-border)] pt-3 mt-2 animate-fade-in">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">做法步骤</p>
          <ol className="space-y-1.5">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 text-xs flex items-center justify-center font-medium">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="text-sm text-primary-500 font-medium hover:text-primary-600 transition-colors"
        >
          {showSteps ? '收起做法' : '查看做法'}
        </button>
        {showActions && (
          <>
            <div className="flex-1" />
            <button
              onClick={handleCollect}
              className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                collected
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
                  : 'text-gray-400 hover:text-amber-500'
              }`}
            >
              {collected ? '★ 已收藏' : '☆ 收藏'}
            </button>
            {onAddToMenu && (
              <button
                onClick={() => onAddToMenu(recipe)}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                + 加入菜单
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
