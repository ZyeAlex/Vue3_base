import { createRouter, createWebHistory } from 'vue-router'
// 路由
const router = createRouter({
  history: createWebHistory(),
  routes: [

  ]
})
// 路由守卫
router.beforeEach(async (to, from, next) => {
  next()
})

export default router
