import { useState, useEffect, useCallback } from 'react'

interface User {
  id: number
  username: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 检查本地存储中的用户信息
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    // 模拟登录请求
    // 实际项目中应该调用真实的登录API
    if (username === 'admin' && password === '123456') {
      const mockUser: User = {
        id: 1,
        username: 'admin',
        role: 'admin'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } else {
      throw new Error('Invalid credentials')
    }
  }, [])

  const logout = useCallback(async () => {
    setUser(null)
    localStorage.removeItem('user')
  }, [])

  return {
    user,
    loading,
    login,
    logout
  }
}

export { useAuth }