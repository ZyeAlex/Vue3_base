import { defineStore } from 'pinia'
import { Observer } from '@/utils'
export default defineStore('default', () => {
  // 系统resize
  const resize = Observer()
  window.onresize = resize.send

  return {
    resize
  }
})
