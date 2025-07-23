<script setup>
import { Navigation } from '@/components/navigation'
</script>

<template>
  <div class="flex min-h-screen">
    <Navigation />
    <main class="flex-1 p-6 ml-64">
      <router-view></router-view>
    </main>
  </div>
</template>
