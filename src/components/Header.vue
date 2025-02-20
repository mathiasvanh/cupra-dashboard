<template>
  <header class="border-b">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <h1 class="text-xl font-semibold">CUPRA Born Dashboard</h1>
      
      <div class="flex items-center gap-4">
        <div class="flex items-center space-x-2">
          <SunIcon class="h-4 w-4" />
          <Switch v-model:checked="isDark" />
          <MoonIcon class="h-4 w-4" />
        </div>
        <Avatar v-if="store.userInfo">
          <AvatarFallback>{{ getInitials(store.userInfo.name) }}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useTheme } from '@/composables/theme'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const { theme, setTheme } = useTheme()
const isDark = ref(theme.value === 'dark')

watch(isDark, (value) => {
  setTheme(value ? 'dark' : 'light')
})

const getInitials = (name) => {
  return name
    ?.split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase() || '??'
}

onMounted(() => {
  store.fetchUserInfo()
})
</script> 