import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupGlobComponent } from '@/components'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// pinia 
app.use(createPinia())
// router
app.use(router)
// component
setupGlobComponent(app)

// mount
app.mount('#app')
