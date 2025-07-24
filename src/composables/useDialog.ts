import { ref } from 'vue'

export function useDialog<T>(initialState: T | null = null) {
  const isOpen = ref(false)
  const state = ref<T | null>(initialState)

  const open = (payload: T | null = null) => {
    state.value = payload
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    state.value = null
  }

  return { isOpen, state, open, close }
}
