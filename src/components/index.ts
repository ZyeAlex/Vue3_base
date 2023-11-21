import type { App } from 'vue'
import EchartsAxis from './echarts/axis/index.vue'
import EchartsResource from './echarts/resource.vue'
export const setupGlobComponent = (app: App<Element>): void => {
  app.component('EchartsAxis', EchartsAxis)
  app.component('EchartsResource', EchartsResource)
}
