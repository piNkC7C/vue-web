import { ElSubMenu, ElMenuItem } from 'element-plus'
import { hasOneShowingChild } from '../helper'
import { isUrl } from '@/utils/is'
import { useRenderMenuTitle } from './useRenderMenuTitle'
import { pathResolve } from '@/utils/routerHelper'

const { renderMenuTitle } = useRenderMenuTitle()

export const useRenderMenuItem = () =>
  // allRouters: AppRouteRecordRaw[] = [],
  {
    const renderMenuItem = (routers: AppRouteRecordRaw[], parentPath = '/') => {
      return routers
        .filter((v) => !v.meta?.hidden)
        .map((v) => {
          const meta = v.meta ?? {}
          const { oneShowingChild, onlyOneChild } = hasOneShowingChild(v.children, v)

          const getIndex = (item: AppRouteRecordRaw, pPath: string) => {
            if (item.menuType === 'button') return item.name
            const p = item.path || ''
            return isUrl(p) ? p : pathResolve(pPath, p)
          }

          const fullPath = getIndex(v, parentPath)

          if (
            oneShowingChild &&
            (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) &&
            !meta?.alwaysShow
          ) {
            const childIndex = onlyOneChild ? getIndex(onlyOneChild, fullPath) : fullPath
            const isButton = v.menuType === 'button' || onlyOneChild?.menuType === 'button'
            const action = v.action || onlyOneChild?.action
            return (
              <ElMenuItem
                index={childIndex}
                onClickCapture={(e: MouseEvent) => {
                  if (isButton || action) {
                    e.stopPropagation()
                    e.preventDefault()
                    action?.()
                    // 消除点击后的焦点状态，避免影响 hover 和出现 focus 样式
                    if (e.currentTarget instanceof HTMLElement) {
                      e.currentTarget.blur()
                    }
                  }
                }}
              >
                {{
                  default: () => renderMenuTitle(onlyOneChild ? onlyOneChild?.meta : meta)
                }}
              </ElMenuItem>
            )
          } else {
            return (
              <ElSubMenu index={fullPath}>
                {{
                  title: () => renderMenuTitle(meta),
                  default: () => renderMenuItem(v.children!, fullPath)
                }}
              </ElSubMenu>
            )
          }
        })
    }

    return {
      renderMenuItem
    }
  }
