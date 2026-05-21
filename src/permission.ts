import router from './router'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePageLoading } from '@/hooks/web/usePageLoading'

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

// 路由加载前
router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  next()
})

router.afterEach((to) => {
  useTitle(to?.meta?.title as string)
  done() // 结束Progress
  loadDone()
})
