import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'

const SubscriptionContext = createContext(null)

const FREE_LIMIT = 2
const STORAGE_KEY = (userId) => `ktv_sub_${userId}`
const monthKey = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function loadState(userId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(userId))
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveState(userId, state) {
  try {
    localStorage.setItem(STORAGE_KEY(userId), JSON.stringify(state))
  } catch {}
}

function freshState() {
  return {
    isSubscribed: false,
    expiry: null,
    monthlyCount: 0,
    monthlyKey: monthKey(),
  }
}

export function SubscriptionProvider({ children }) {
  const { user } = useAuth()
  const [subState, setSubState] = useState(null)

  useEffect(() => {
    if (!user) { setSubState(null); return }

    let state = loadState(user.id) || freshState()

    // Reset monthly count if we're in a new month
    if (state.monthlyKey !== monthKey()) {
      state = { ...state, monthlyCount: 0, monthlyKey: monthKey() }
    }

    // Expire subscription if past expiry date
    if (state.isSubscribed && state.expiry && new Date(state.expiry) < new Date()) {
      state = { ...state, isSubscribed: false, expiry: null }
    }

    saveState(user.id, state)
    setSubState(state)
  }, [user])

  const isSubscribed = subState?.isSubscribed ?? false
  const monthlyCount = subState?.monthlyCount ?? 0
  const canApply = isSubscribed || monthlyCount < FREE_LIMIT
  const appsRemaining = isSubscribed ? Infinity : Math.max(0, FREE_LIMIT - monthlyCount)

  const incrementAppCount = useCallback(() => {
    if (!user || isSubscribed) return
    setSubState(prev => {
      const updated = { ...prev, monthlyCount: (prev?.monthlyCount ?? 0) + 1 }
      saveState(user.id, updated)
      return updated
    })
  }, [user, isSubscribed])

  const activateSubscription = useCallback((months = 1) => {
    if (!user) return
    const expiry = new Date()
    expiry.setMonth(expiry.getMonth() + months)
    setSubState(prev => {
      const updated = {
        ...prev,
        isSubscribed: true,
        expiry: expiry.toISOString(),
        monthlyCount: prev?.monthlyCount ?? 0,
        monthlyKey: monthKey(),
      }
      saveState(user.id, updated)
      return updated
    })
  }, [user])

  return (
    <SubscriptionContext.Provider value={{
      isSubscribed,
      monthlyCount,
      canApply,
      appsRemaining,
      freeLimit: FREE_LIMIT,
      subscriptionExpiry: subState?.expiry ?? null,
      incrementAppCount,
      activateSubscription,
    }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  return useContext(SubscriptionContext)
}
