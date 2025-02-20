import { defineStore } from 'pinia'
import { cache } from '@/utils/cache'

const CACHE_TIMES = {
  USER_INFO: 30 * 60 * 1000 // 30 minutes
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchUserInfo() {
      const cacheKey = 'user_info'
      const cachedData = cache.get(cacheKey)
      
      if (cachedData) {
        this.userInfo = cachedData
        return
      }

      this.loading = true
      try {
        const response = await fetch('https://identity-userinfo.vwgroup.io/oidc/userinfo', {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            'Accept': 'application/json'
          }
        })
        if (!response.ok) throw new Error('Failed to fetch user info')
        
        const data = await response.json()
        this.userInfo = data
        this.error = null
        
        cache.set(cacheKey, data, CACHE_TIMES.USER_INFO)
      } catch (error) {
        this.error = error.message
        this.userInfo = null
      } finally {
        this.loading = false
      }
    }
  }
}) 