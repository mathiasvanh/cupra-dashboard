<template>
  <div class="flex items-center justify-center min-h-screen">
    <Card class="w-[350px]">
      <CardContent class="py-4">
        <p class="text-center text-muted-foreground">
          Processing authentication...
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'

onMounted(() => {
  const code = new URLSearchParams(window.location.search).get('code')
  if (code) {
    window.opener?.postMessage({ type: 'auth_callback', code }, window.location.origin)
  }
  window.close()
})
</script> 