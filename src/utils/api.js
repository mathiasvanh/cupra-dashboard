const BASE_URL = '/api'
const API_TOKEN = import.meta.env.VITE_API_TOKEN

export const fetchWithCache = async (endpoint, cacheKey, cacheTime, cache, transform = (data) => data) => {
  const cachedData = cache.get(cacheKey)
  if (cachedData) return cachedData

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const transformedData = transform(data)
    
    cache.set(cacheKey, transformedData, cacheTime)
    return transformedData
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
} 