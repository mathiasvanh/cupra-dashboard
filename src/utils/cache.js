const CACHE_PREFIX = 'cupra_'
const DEFAULT_CACHE_TIME = 5 * 60 * 1000 // 5 minutes in milliseconds

export const cache = {
  set(key, data, expirationTime = DEFAULT_CACHE_TIME) {
    const item = {
      data,
      timestamp: Date.now(),
      expirationTime
    }
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item))
  },

  get(key) {
    const item = localStorage.getItem(CACHE_PREFIX + key)
    if (!item) return null

    const { data, timestamp, expirationTime } = JSON.parse(item)
    const now = Date.now()

    if (now - timestamp > expirationTime) {
      localStorage.removeItem(CACHE_PREFIX + key)
      return null
    }

    return data
  },

  remove(key) {
    localStorage.removeItem(CACHE_PREFIX + key)
  },

  clear() {
    Object.keys(localStorage)
      .filter(key => key.startsWith(CACHE_PREFIX))
      .forEach(key => localStorage.removeItem(key))
  }
} 