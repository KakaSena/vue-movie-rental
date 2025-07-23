<script setup>
import NavLogo from '@components/navigation/NavLogo.vue'
import NavList from '@components/navigation/NavList.vue'
</script>

<template>
  <div class="fixed h-screen w-64 bg-gray-50 border-r border-gray-200 py-4 flex flex-col">
    <NavLogo />
    <NavList class="flex-1 overflow-y-auto" />
  </div>
</template>
