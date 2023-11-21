import { defineStore } from 'pinia'
import { Observer } from '@/utils'
export const useStore = defineStore('default', () => {
  // 系统resize
  const resize = Observer()
  window.onresize = resize.send()

  return {
    resize
  }
})
