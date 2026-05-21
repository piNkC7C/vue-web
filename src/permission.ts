import router from './router'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'

const { start, done } = useNProgress()

// 路由加载前
router.beforeEach(async (to, from, next) => {
  start()
  next()
})

router.afterEach((to) => {
  useTitle(to?.meta?.title as string)
  done() // 结束Progress
})
