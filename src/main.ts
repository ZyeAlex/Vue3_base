import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setupGlobComponent } from '@/components';
import App from './App.vue';
import router from './router';
// svg-icon
import 'virtual:svg-icons-register';
import '@purge-icons/generated';

import 'element-plus/dist/index.css';
import '@/styles/index.scss';
import { i18n } from '@/i18n';

// 表单校验
import rule from '@/utils/modules/validate';

// import '@/styles/theme/index.scss'
const app = createApp(App);

app.use(i18n);

app.use(rule);
// pinia
app.use(createPinia());
// router
app.use(router);
// component
setupGlobComponent(app);
// mount
app.mount('#app');
