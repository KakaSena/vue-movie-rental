// src/types/navigation.ts
import type { Component } from 'vue'

export interface NavItem {
  path: string
  label: string
  icon: Component
  name: string

  disabled?: boolean
  children?: NavItem[]
}
