import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupGlobComponent } from '@/components'
import App from './App.vue'
import router from './router'

// svg-icon
import 'virtual:svg-icons-register'
import '@purge-icons/generated'

import 'element-plus/dist/index.css'
import '@/styles/index.scss'
// import '@/styles/theme/index.scss'

const app = createApp(App)
// pinia 
app.use(createPinia())
// router
app.use(router)
// component
setupGlobComponent(app)
// mount
app.mount('#app')
