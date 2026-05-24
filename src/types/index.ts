export interface Nutrition {
  vegetables: number
  protein: number
  carbs: number
}

export interface Recipe {
  id: string
  name: string
  calories: number
  ingredients: string[]
  steps: string[]
  nutrition: Nutrition
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  tags: string[]
}

export interface User {
  id: string
  nickname: string
  avatar: string
  targetCalories: number
  preferences: string[]
  anthropicKey: string
}

export interface DishRecord {
  id: string
  userId: string
  dishName: string
  calories: number
  image: string
  ingredients: string[]
  createdAt: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
}

export interface MenuItem {
  recipe: Recipe
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
}

export interface DayMenu {
  items: MenuItem[]
  totalCalories: number
  totalNutrition: Nutrition
  generatedAt: string
  basedOn: string[]
}

export interface Friend {
  id: string
  nickname: string
  avatar: string
}

export interface FriendRequest {
  id: string
  from: Friend
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

export interface SocialPost {
  id: string
  user: Friend
  dishName: string
  calories: number
  image: string
  ingredients: string[]
  createdAt: string
  likes: number
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
}
