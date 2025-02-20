import { ref, watchEffect } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

watchEffect(() => {
  const root = window.document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme.value)
  localStorage.setItem('theme', theme.value)
})

export function useTheme() {
  function setTheme(newTheme) {
    theme.value = newTheme
  }

  return {
    theme,
    setTheme
  }
} 