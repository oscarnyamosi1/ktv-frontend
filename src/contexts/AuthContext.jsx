import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'

import api from '../api/client'
import { authApi } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)

  // RESTORE SESSION
useEffect(() => {

  const checkAuth = async () => {
    try {
      // Add timeout of 5 seconds
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      
      const res = await authApi.me()
      clearTimeout(timeoutId)

      setUser(res.data)

    } catch (err) {
      console.error('Auth check failed:', err.message)
      // Always set loading to false even on error to allow app to render
      setUser(null)

    } finally {
      setLoading(false)
    }
  }

  checkAuth()

}, [])

  // LOGIN
  const login = async ({ username, password }) => {

    // backend sets cookies
    await authApi.login({
      username,
      password
    })

    // fetch authenticated user
    // const res = await api.get('auth/me/')
    const res = await authApi.me()

    setUser(res.data)

    return res.data
  }

  // SIGNUP
  const signup = async (username, email, password) => {

    const res = await api.post('/signup/', {
      username,
      email,
      password,
    })

    setUser(res.data.user)

    return res.data
  }

  // LOGOUT
  const logout = async () => {

    try {

      await authApi.logout()

    } catch (err) {

      console.log(err)

    } finally {

      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        authenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}