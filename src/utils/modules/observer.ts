/*
 * @Description: 发布订阅
 * @Author: Zye
 * @Date: 2022-09-08
 */

import { ref, watch } from 'vue'
/** 发布订阅
 * @example
 * const obs =  Observer()
 * obs.onmessage = (params) => {}  //订阅通知
 * obs.send(params) //发布通知
 */
export default () => {
  const _v = ref<any[]>([])
  return {
    send: (...args: any[]) => (_v.value = args),
    set onmessage(fn: Function) {
      watch(_v, () => fn(..._v.value))
    },
    get onmessage() {
      return (fn: Function) => (this.onmessage = fn)
    },
  }
}
