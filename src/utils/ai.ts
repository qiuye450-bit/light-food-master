import type { Recipe } from '../types'
import { generateId } from './storage'

interface AIRecipeResult {
  name: string
  calories: number
  ingredients: string[]
  steps: string[]
  nutrition: { vegetables: number; protein: number; carbs: number }
}

export async function generateRecipeWithAI(
  ingredients: string[],
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
): Promise<Recipe | null> {
  if (!ingredients.length) return null

  try {
    const response = await fetch('/api/generate-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients, mealType }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: '未知错误' }))
      console.error('AI proxy error:', err.error)
      return null
    }

    const parsed: AIRecipeResult = await response.json()

    return {
      id: `ai_${generateId()}`,
      ...parsed,
      category: mealType,
      tags: ['AI生成'],
    }
  } catch (err) {
    console.error('AI generation failed:', err)
    return null
  }
}
