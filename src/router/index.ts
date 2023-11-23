import { createRouter, createWebHistory } from 'vue-router'
// 路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/test.vue')
    }
  ]
})
// 路由守卫
router.beforeEach(async (to, from, next) => {
  next()
})

export default router
