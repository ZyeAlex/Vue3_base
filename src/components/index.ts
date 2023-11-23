import type { App } from 'vue'
import EchartsAxis from './echarts/axis/index.vue'
import Pagination from './element/pagination.vue'
import PaginationNative from './element/pagination-native.vue'
export const setupGlobComponent = (app: App<Element>): void => {
  app.component('EchartsAxis', EchartsAxis)
  app.component('Pagination', Pagination)
  app.component('PaginationNative', PaginationNative)
}
