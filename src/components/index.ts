import type { App } from 'vue'
import Axis from './echarts/axis/index.vue'
import Pagination from './element/pagination/index.vue'
import PaginationNative from './element/pagination/native.vue'
import Form from './element/form/form.vue'
import FormItem from './element/form/form-item.vue'
export const setupGlobComponent = (app: App<Element>): void => {
  app.component('VAxis', Axis)
  app.component('VPagination', Pagination)
  app.component('VPaginationNative', PaginationNative)
  app.component('VForm', Form)
  app.component('VFormItem', FormItem)
}
