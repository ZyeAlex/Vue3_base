/*
 * @Description: 全屏
 * @Author: Zye
 * @Date: 2022-09-29
 */

export function isFullscreen() {
  return window.innerWidth == screen.width && window.innerHeight == screen.height
}

export function inFullscreen(el: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement) {
  el.requestFullscreen?.()
}

export function exitFullscreen() {
  document.exitFullscreen?.()
}

export function fullscreen() {
  isFullscreen() ? exitFullscreen() : inFullscreen()
}
