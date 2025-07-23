<script setup>
import NavItem from '@components/navigation/NavItem.vue'
import { navItemsMockData } from '@/mocks/navigationItems'

const navItems = navItemsMockData
</script>

<template>
  <nav class="h-full">
    <ul class="space-y-1">
      <li v-for="item in navItems" :key="item.path">
        <NavItem :item="item" />
      </li>
    </ul>
  </nav>
</template>
