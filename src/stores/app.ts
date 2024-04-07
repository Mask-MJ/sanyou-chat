import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const menuValue = ref<string>('1')
  const setMenuValue = (value: string) => {
    menuValue.value = value
  }
  return {
    menuValue,
    setMenuValue
  }
})
