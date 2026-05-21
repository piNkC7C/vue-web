import { ElMessage } from 'element-plus'

export const customMenus: AppRouteRecordRaw[] = [
  {
    path: '/index',
    name: 'Home',
    menuType: 'route',
    meta: {
      title: '首页',
      icon: 'ep:home-filled'
    }
  },
  {
    path: '/aiapp/index',
    name: 'AIapp',
    menuType: 'route',
    meta: {
      title: 'AI应用开发',
      icon: 'ep:menu'
    }
  },
  {
    path: '/agent/index',
    name: 'Agent',
    menuType: 'route',
    meta: {
      title: 'Agent应用',
      icon: 'ep:monitor'
    }
  },
  {
    name: 'Btn1',
    menuType: 'button',
    meta: {
      title: '点击弹窗(按钮菜单)',
      icon: 'ep:pointer'
    },
    action: () => {
      ElMessage.success('触发了按钮菜单事件！')
    }
  },
  {
    name: 'Btn2',
    menuType: 'button',
    meta: {
      title: '打印日志(按钮菜单)',
      icon: 'ep:document'
    },
    action: () => {
      console.log('触发了按钮菜单事件，打印日志')
      ElMessage.info('已在控制台打印日志')
    }
  }
]
