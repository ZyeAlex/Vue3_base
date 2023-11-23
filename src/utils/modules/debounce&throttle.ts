/*
 * @Description: 防抖节流
 * @Author: Zye
 * @Date: 2022-08-19
 * @LastEditors: Zye
 * @LastEditTime: 2022-08-19
 */
import { ElNotification, NotificationHandle } from 'element-plus'
import { nextTick } from 'vue'
/** 防抖 —— 最后一次触发调用
 *
 * @method stop 终止防抖
 *
 * @param fn 调用函数
 * @param delay 防抖时间 ms
 * @returns 执行函数
 */
export const debounce = (fn: Function, delay = 0) => {
  let timer: NodeJS.Timeout
  function execute(this: any, ...args: any[]) {
    stop()
    timer = setTimeout(fn.bind(this, ...args), delay)
  }
  const stop = (execute.stop = () => {
    timer && clearTimeout(timer)
  })
  return execute
}

/** 节流 —— 第一次触发调用
 *
 * @param fn 调用函数
 * @param delay 节流时间 ms
 * @param tips 频繁操作提示
 * @returns 执行函数
 */
export const throttle = (fn: Function, delay = 0, tips = false, tips_time = 2000) => {
  let timer: NodeJS.Timeout | null
  let notification: NotificationHandle | null
  return function (this: any, ...args: any[]) {
    if (!timer) {
      nextTick(fn.bind(this, ...args))
      timer = setTimeout(() => (timer = null), delay)
    } else {
      if (!tips || notification) return
      notification = ElNotification.info({
        title: '提示',
        message: '频繁操作',
        showClose: false,
        duration: tips_time,
        position: 'top-right',
        onClose: () => (notification = null),
      })
    }
  }
}
