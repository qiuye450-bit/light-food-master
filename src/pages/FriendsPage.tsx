import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { saveFriend, removeFriend, saveFriendRequest, generateId } from '../utils/storage'
import Modal from '../components/shared/Modal'
import type { Friend, FriendRequest } from '../types'

// Mock data for UI demonstration
const mockSearchResults: Friend[] = [
  { id: 'f_search_1', nickname: '瘦身达人小王', avatar: '' },
  { id: 'f_search_2', nickname: '健康饮食家', avatar: '' },
]

export default function FriendsPage() {
  const navigate = useNavigate()
  const [friends, setFriends] = useLocalStorage<Friend[]>('lfm_friends', [
    { id: 'f1', nickname: '瘦身达人小王', avatar: '' },
    { id: 'f2', nickname: '爱吃不长胖', avatar: '' },
  ])
  const [requests, setRequests] = useLocalStorage<FriendRequest[]>('lfm_friend_requests', [
    {
      id: 'fr1',
      from: { id: 'f_new_1', nickname: '轻食新手小白', avatar: '' },
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Friend[]>([])
  const [searched, setSearched] = useState(false)
  const [showAddConfirm, setShowAddConfirm] = useState<Friend | null>(null)

  const pendingRequests = requests.filter(r => r.status === 'pending')

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    // Mock search - in real app this would query backend
    setSearchResults(
      mockSearchResults.filter(f =>
        f.nickname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    setSearched(true)
  }

  const handleAddFriend = (friend: Friend) => {
    setShowAddConfirm(friend)
  }

  const confirmAddFriend = () => {
    if (!showAddConfirm) return
    const req: FriendRequest = {
      id: generateId(),
      from: { id: 'user_001', nickname: '我', avatar: '' },
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    saveFriendRequest(req)
    setRequests(prev => [...prev, req])
    setShowAddConfirm(null)
    alert('好友申请已发送！')
  }

  const handleAccept = (req: FriendRequest) => {
    saveFriend(req.from)
    setFriends(prev => [...prev.filter(f => f.id !== req.from.id), req.from])
    setRequests(prev =>
      prev.map(r => (r.id === req.id ? { ...r, status: 'accepted' as const } : r))
    )
  }

  const handleReject = (id: string) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'rejected' as const } : r))
    )
  }

  const handleRemoveFriend = (id: string) => {
    removeFriend(id)
    setFriends(prev => prev.filter(f => f.id !== id))
  }

  return (
    <div className="page-transition px-4 pt-6 pb-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/social')} className="text-gray-400">
          ‹ 返回
        </button>
        <h1 className="text-xl font-bold">好友管理</h1>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="input-field flex-1"
          placeholder="搜索用户昵称或ID..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSearch()
          }}
        />
        <button onClick={handleSearch} className="btn-primary py-3 px-4">
          搜索
        </button>
      </div>

      {/* Search results */}
      {searched && (
        <div className="mb-4 animate-slide-up">
          <p className="text-sm text-gray-400 mb-2">搜索结果</p>
          {searchResults.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">未找到用户</p>
          ) : (
            <div className="space-y-2">
              {searchResults.map(user => {
                const isFriend = friends.some(f => f.id === user.id)
                return (
                  <div key={user.id} className="card flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white font-bold text-sm">
                      {user.nickname[0]}
                    </div>
                    <span className="font-medium text-sm flex-1">{user.nickname}</span>
                    {isFriend ? (
                      <span className="text-xs text-gray-400">已是好友</span>
                    ) : (
                      <button
                        onClick={() => handleAddFriend(user)}
                        className="btn-secondary text-xs py-1 px-3"
                      >
                        + 添加
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Friend requests */}
      {pendingRequests.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">
            好友申请 ({pendingRequests.length})
          </p>
          <div className="space-y-2">
            {pendingRequests.map(req => (
              <div key={req.id} className="card flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                  {req.from.nickname[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{req.from.nickname}</p>
                  <p className="text-xs text-gray-400">请求添加你为好友</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleAccept(req)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-primary-100 text-primary-600 font-medium hover:bg-primary-200 transition-colors"
                  >
                    接受
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 font-medium hover:bg-gray-200 transition-colors"
                  >
                    拒绝
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Friend list */}
      <div>
        <p className="text-sm text-gray-400 mb-2">
          我的好友 ({friends.length})
        </p>
        {friends.length === 0 ? (
          <p className="text-center text-gray-400 py-8 text-sm">
            还没有好友，搜索并添加你的第一个好友吧
          </p>
        ) : (
          <div className="space-y-2">
            {friends.map(friend => (
              <div key={friend.id} className="card flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white font-bold text-sm">
                  {friend.nickname[0]}
                </div>
                <span className="font-medium text-sm flex-1">{friend.nickname}</span>
                <button
                  onClick={() => handleRemoveFriend(friend.id)}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                >
                  移除
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm add friend modal */}
      <Modal open={!!showAddConfirm} onClose={() => setShowAddConfirm(null)} title="添加好友">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          发送好友申请给「{showAddConfirm?.nickname}」？
        </p>
        <div className="flex gap-2">
          <button onClick={() => setShowAddConfirm(null)} className="btn-secondary flex-1">取消</button>
          <button onClick={confirmAddFriend} className="btn-primary flex-1">发送申请</button>
        </div>
      </Modal>
    </div>
  )
}
