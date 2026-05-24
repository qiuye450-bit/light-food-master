import { useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { generateId, saveRecord } from '../utils/storage'
import type { SocialPost, DishRecord } from '../types'

const mockPosts: SocialPost[] = [
  {
    id: 'sp1', user: { id: 'f1', nickname: '瘦身达人小王', avatar: '' },
    dishName: '鸡胸肉藜麦沙拉', calories: 380, mealType: 'lunch',
    image: '', ingredients: ['鸡胸肉', '藜麦', '生菜', '小番茄'],
    createdAt: new Date(Date.now() - 3600000).toISOString(), likes: 12,
  },
  {
    id: 'sp2', user: { id: 'f2', nickname: '爱吃不长胖', avatar: '' },
    dishName: '香煎三文鱼配时蔬', calories: 420, mealType: 'dinner',
    image: '', ingredients: ['三文鱼', '芦笋', '西兰花'],
    createdAt: new Date(Date.now() - 7200000).toISOString(), likes: 8,
  },
  {
    id: 'sp3', user: { id: 'f3', nickname: '厨房小白进阶中', avatar: '' },
    dishName: '隔夜燕麦杯', calories: 320, mealType: 'breakfast',
    image: '', ingredients: ['燕麦', '酸奶', '草莓', '蜂蜜'],
    createdAt: new Date(Date.now() - 10800000).toISOString(), likes: 5,
  },
  {
    id: 'sp4', user: { id: 'f4', nickname: '健身餐爱好者', avatar: '' },
    dishName: '彩椒牛肉粒', calories: 350, mealType: 'lunch',
    image: '', ingredients: ['牛里脊', '彩椒', '洋葱'],
    createdAt: new Date(Date.now() - 86400000).toISOString(), likes: 21,
  },
]

const mealTypeLabel: Record<string, string> = {
  breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snack: '加餐',
}

const mealTypeColor: Record<string, string> = {
  breakfast: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  lunch: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  dinner: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  snack: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
}

export default function SocialFeedPage() {
  const navigate = useNavigate()
  const [records] = useLocalStorage<DishRecord[]>('lfm_records', [])

  const myPosts: SocialPost[] = useMemo(
    () => records.slice(0, 5).map(r => ({
      id: `my_${r.id}`,
      user: { id: 'user_001', nickname: '我', avatar: '' },
      dishName: r.dishName, calories: r.calories, mealType: r.mealType,
      image: r.image, ingredients: r.ingredients,
      createdAt: r.createdAt, likes: 0,
    })),
    [records]
  )

  const allPosts = useMemo(() => {
    const merged = [...myPosts, ...mockPosts]
    return merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [myPosts])

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}分钟前`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}小时前`
    const days = Math.floor(hours / 24)
    return `${days}天前`
  }

  const handleCopyMeal = (post: SocialPost) => {
    const record: DishRecord = {
      id: generateId(), userId: 'user_001',
      dishName: post.dishName, calories: post.calories,
      image: post.image, ingredients: post.ingredients,
      createdAt: new Date().toISOString().slice(0, 16), mealType: post.mealType,
    }
    saveRecord(record)
    alert(`已将「${post.dishName}」添加到你的饮食记录！`)
  }

  return (
    <div className="page-transition px-4 pt-4 pb-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-bold">👥 好友动态</h1>
        <button onClick={() => navigate('/social/friends')} className="text-sm text-primary-500 font-medium">
          好友列表 ›
        </button>
      </div>

      <div className="space-y-2">
        {allPosts.map(post => (
          <div key={post.id} className="card py-3 px-3.5 animate-slide-up">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {post.user.avatar || post.user.nickname[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-medium text-sm">{post.user.nickname}</p>
                  <span className={`text-xs px-1 py-0.5 rounded-full font-medium leading-none ${mealTypeColor[post.mealType]}`}>
                    {mealTypeLabel[post.mealType]}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{timeAgo(post.createdAt)}</p>
              </div>
            </div>

            {post.image && (
              <img src={post.image} alt={post.dishName} className="w-full h-40 rounded-lg object-cover mb-2.5" />
            )}

            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm">{post.dishName}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {post.ingredients.slice(0, 3).map((ing, i) => (
                    <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 leading-none">
                      {ing}
                    </span>
                  ))}
                  {post.ingredients.length > 3 && (
                    <span className="text-xs text-gray-400">+{post.ingredients.length - 3}</span>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <span className="text-base font-bold text-primary-500">{post.calories}</span>
                <span className="text-xs text-gray-400 ml-0.5">kcal</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 mt-2 border-t border-[var(--color-border)]">
              <button className="text-xs text-gray-400 hover:text-red-400 transition-colors">
                ❤️ {post.likes}
              </button>
              <div className="flex-1" />
              {post.user.id !== 'user_001' && (
                <button onClick={() => handleCopyMeal(post)} className="btn-secondary text-xs py-1 px-2.5">
                  🍴 一键跟吃
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
