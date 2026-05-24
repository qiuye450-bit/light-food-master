import type { User, DishRecord, Friend, FriendRequest, SocialPost } from '../types'

const KEYS = {
  USER: 'lfm_user',
  RECORDS: 'lfm_records',
  FRIENDS: 'lfm_friends',
  FRIEND_REQUESTS: 'lfm_friend_requests',
  SOCIAL_POSTS: 'lfm_social_posts',
  COLLECTIONS: 'lfm_collections',
  DARK_MODE: 'lfm_dark_mode',
} as const

export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeItem(key: string): void {
  localStorage.removeItem(key)
}

// User
export function getUser(): User {
  return getItem<User>(KEYS.USER, {
    id: 'user_001',
    nickname: '轻食爱好者',
    avatar: '',
    targetCalories: 1200,
    preferences: [],
    anthropicKey: '',
  })
}

export function saveUser(user: User): void {
  setItem(KEYS.USER, user)
}

// Records
export function getRecords(): DishRecord[] {
  return getItem<DishRecord[]>(KEYS.RECORDS, [])
}

export function saveRecord(record: DishRecord): void {
  const records = getRecords()
  const existing = records.findIndex(r => r.id === record.id)
  if (existing >= 0) {
    records[existing] = record
  } else {
    records.unshift(record)
  }
  // Keep max 50 records
  if (records.length > 50) {
    const trimmed = records.slice(0, 50)
    setItem(KEYS.RECORDS, trimmed)
    return
  }
  setItem(KEYS.RECORDS, records)
}

export function deleteRecord(id: string): void {
  const records = getRecords().filter(r => r.id !== id)
  setItem(KEYS.RECORDS, records)
}

// Friends
export function getFriends(): Friend[] {
  return getItem<Friend[]>(KEYS.FRIENDS, [])
}

export function saveFriend(friend: Friend): void {
  const friends = getFriends()
  if (!friends.find(f => f.id === friend.id)) {
    friends.push(friend)
    setItem(KEYS.FRIENDS, friends)
  }
}

export function removeFriend(id: string): void {
  setItem(KEYS.FRIENDS, getFriends().filter(f => f.id !== id))
}

export function getFriendRequests(): FriendRequest[] {
  return getItem<FriendRequest[]>(KEYS.FRIEND_REQUESTS, [])
}

export function saveFriendRequest(req: FriendRequest): void {
  const reqs = getFriendRequests()
  reqs.push(req)
  setItem(KEYS.FRIEND_REQUESTS, reqs)
}

export function updateFriendRequest(id: string, status: FriendRequest['status']): void {
  const reqs = getFriendRequests().map(r => (r.id === id ? { ...r, status } : r))
  setItem(KEYS.FRIEND_REQUESTS, reqs)
}

// Social posts
export function getSocialPosts(): SocialPost[] {
  return getItem<SocialPost[]>(KEYS.SOCIAL_POSTS, [])
}

export function saveSocialPost(post: SocialPost): void {
  const posts = getSocialPosts()
  posts.unshift(post)
  if (posts.length > 100) posts.length = 100
  setItem(KEYS.SOCIAL_POSTS, posts)
}

// Collections (favorite recipe IDs)
export function getCollections(): string[] {
  return getItem<string[]>(KEYS.COLLECTIONS, [])
}

export function toggleCollection(recipeId: string): boolean {
  const coll = getCollections()
  const idx = coll.indexOf(recipeId)
  if (idx >= 0) {
    coll.splice(idx, 1)
    setItem(KEYS.COLLECTIONS, coll)
    return false
  } else {
    coll.push(recipeId)
    setItem(KEYS.COLLECTIONS, coll)
    return true
  }
}

export function isCollected(recipeId: string): boolean {
  return getCollections().includes(recipeId)
}

// Dark mode
export function getDarkMode(): boolean {
  return getItem<boolean>(KEYS.DARK_MODE, false)
}

export function setDarkMode(dark: boolean): void {
  setItem(KEYS.DARK_MODE, dark)
}

// ID generator
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}
