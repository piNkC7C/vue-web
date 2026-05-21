import { ElMessage } from 'element-plus'

export const customMenus: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    menuType: 'route',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/aiapp',
    name: 'AIapp',
    menuType: 'route',
    meta: {
      title: 'AI应用开发'
    }
  },
  {
    path: '/agent',
    name: 'Agent',
    menuType: 'route',
    meta: {
      title: '智能体定制'
    }
  },
  {
    name: 'News',
    menuType: 'button',
    meta: {
      title: '新闻动态'
    },
    action: () => {
      ElMessage.success('新闻动态！')
    }
  },
  {
    name: 'Contact',
    menuType: 'button',
    meta: {
      title: '联系我们'
    },
    action: () => {
      ElMessage.info('联系我们！')
    }
  }
]
