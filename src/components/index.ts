import type { App } from 'vue'
import Axis from './echarts/axis/index.vue'
import Pagination from './element/pagination/index.vue'
import PaginationNative from './element/pagination/native.vue'
import Form from './element/form/form.vue'
import FormItem from './element/form/form-item.vue'
import Tree from './element/tree/index.vue'
import Icon from './icon/icon.vue'
import Json from './element/json/index.vue'
import Dialog from './element/dialog/index.vue'
import Table from './element/table/table.vue'
import TableColumn from './element/table/table-column.vue'
import X6 from './topology/x6/index.vue'
const setupGlobComponent = (app: App<Element>): void => {
  app.component('CAxis', Axis)
  app.component('CPagination', Pagination)
  app.component('CPaginationNative', PaginationNative)

  app.component('CForm', Form)
  app.component('CFormItem', FormItem)

  app.component('CTable', Table)
  app.component('CTableColumn', TableColumn)

  app.component('CTree', Tree)

  app.component('CIcon', Icon)
  app.component('CJson', Json)
  app.component('CDialog', Dialog)

  app.component('CX6', X6)
}

export default {
  install: setupGlobComponent
}