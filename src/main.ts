import { createApp } from 'vue'
import { createPinia } from 'pinia'
import components from '@/components'
import App from './App.vue'
import router from './router'
import directives from './directives'
// svg-icon
import 'virtual:svg-icons-register'
import '@purge-icons/generated'

import 'element-plus/dist/index.css'
import '@/styles/index.scss'
// nuocss
import 'virtual:uno.css'
// import '@/styles/theme/index.scss'
const app = createApp(App)
// pinia
app.use(createPinia())
// 路由
app.use(router)
// 自定义组件
app.use(components)
// 自定义指令
app.use(directives)
// mount
app.mount('#app')
