import type { App } from 'vue'
import Axis from './echarts/axis/index.vue'
import Pagination from './element/pagination/index.vue'
import PaginationNative from './element/pagination/native.vue'
import Form from './element/form/form.vue'
import FormItem from './element/form/form-item.vue'
import Icon from './icon/icon.vue'
import Json from './element/json/index.vue'
export const setupGlobComponent = (app: App<Element>): void => {
  app.component('CAxis', Axis)
  app.component('CPagination', Pagination)
  app.component('CPaginationNative', PaginationNative)
  app.component('CForm', Form)
  app.component('CFormItem', FormItem)
  app.component('CIcon', Icon)
  app.component('CJson', Json)
}
