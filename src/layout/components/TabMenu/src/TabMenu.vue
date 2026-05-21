<script lang="tsx">
import { useAppStore } from '@/store/modules/app'

import { ElScrollbar } from 'element-plus'
import { Icon } from '@/components/Icon'
import { Menu } from '@/layout/components/Menu'
import { pathResolve } from '@/utils/routerHelper'
import { cloneDeep } from 'lodash-es'
import { filterMenusPath, initTabMap, tabPathMap } from './helper'
import { useDesign } from '@/hooks/web/useDesign'
import { isUrl } from '@/utils/is'
import { customMenus } from '@/router/menus'

const { getPrefixCls, variables } = useDesign()

const prefixCls = getPrefixCls('tab-menu')

export default defineComponent({
  name: 'TabMenu',
  setup() {
    const { push, currentRoute, options } = useRouter()

    const { t } = useI18n()

    const appStore = useAppStore()

    const collapse = computed(() => appStore.getCollapse)

    const fixedMenu = computed(() => appStore.getFixedMenu)

    const routers = computed(() => customMenus)

    const tabRouters = computed(() => unref(routers).filter((v) => !v?.meta?.hidden))

    const setCollapse = () => {
      appStore.setCollapse(!unref(collapse))
    }

    onMounted(() => {
      if (unref(fixedMenu)) {
        const path = `/${unref(currentRoute).path.split('/')[1]}`
        const children = unref(tabRouters).find(
          (v) =>
            (v.meta?.alwaysShow || (v?.children?.length && v?.children?.length > 1)) &&
            v.path === path
        )?.children

        tabActive.value = path
        if (children) {
          // No longer using permissionStore for static website
        }
      }
    })

    watch(
      () => routers.value,
      (routers: AppRouteRecordRaw[]) => {
        initTabMap(routers)
        filterMenusPath(routers, routers)
      },
      {
        immediate: true,
        deep: true
      }
    )

    const showTitle = ref(true)

    watch(
      () => collapse.value,
      (collapse: boolean) => {
        if (!collapse) {
          setTimeout(() => {
            showTitle.value = !collapse
          }, 200)
        } else {
          showTitle.value = !collapse
        }
      }
    )

    // 是否显示菜单
    const showMenu = ref(unref(fixedMenu) ? true : false)

    // tab高亮
    const tabActive = ref('')

    // tab点击事件
    const tabClick = (item: AppRouteRecordRaw) => {
      if (item.menuType === 'button' || item.action) {
        item.action?.()
        return
      }

      const p = item.path || ''
      if (isUrl(p)) {
        window.open(p)
        return
      }
      const newPath = item.children ? p : p.split('/')[0]
      const oldPath = unref(tabActive)
      tabActive.value = item.children ? p : p.split('/')[0]
      if (item.children) {
        if (newPath === oldPath || !unref(showMenu)) {
          showMenu.value = unref(fixedMenu) ? true : !unref(showMenu)
        }
        if (unref(showMenu)) {
          // No longer using permissionStore for static website
        }
      } else {
        push(p)
        // No longer using permissionStore for static website
        showMenu.value = false
      }
    }

    // 设置高亮
    const isActive = (currentPath: string) => {
      const { path } = unref(currentRoute)
      if (tabPathMap[currentPath].includes(path)) {
        return true
      }
      return false
    }

    const mouseleave = () => {
      if (!unref(showMenu) || unref(fixedMenu)) return
      showMenu.value = false
    }

    return () => (
      <div
        id={`${variables.namespace}-menu`}
        class={[
          prefixCls,
          'relative bg-[var(--left-menu-bg-color)] layout-border__right',
          {
            'w-[var(--tab-menu-max-width)]': !unref(collapse),
            'w-[var(--tab-menu-min-width)]': unref(collapse)
          }
        ]}
        onMouseleave={mouseleave}
      >
        <ElScrollbar class="!h-[calc(100%-var(--tab-menu-collapse-height))]">
          <div>
            {() => {
              return unref(tabRouters).map((v) => {
                const item = (
                  v.meta?.alwaysShow || (v?.children?.length && v?.children?.length > 1)
                    ? v
                    : {
                        ...(v?.children && v?.children[0]),
                        path: pathResolve(
                          v.path || '',
                          (v?.children && v?.children[0])?.path as string
                        )
                      }
                ) as AppRouteRecordRaw
                return (
                  <div
                    class={[
                      `${prefixCls}__item`,
                      'text-center text-12px relative py-12px cursor-pointer',
                      {
                        'is-active':
                          item.menuType !== 'button' && !item.action && isActive(v.path || '')
                      }
                    ]}
                    onClick={() => {
                      tabClick(item)
                    }}
                  >
                    <div>
                      <Icon icon={item?.meta?.icon}></Icon>
                    </div>
                    {!unref(showTitle) ? undefined : (
                      <p class="mt-5px break-words px-2px">{t(item.meta?.title)}</p>
                    )}
                  </div>
                )
              })
            }}
          </div>
        </ElScrollbar>
        <div
          class={[
            `${prefixCls}--collapse`,
            'text-center h-[var(--tab-menu-collapse-height)] leading-[var(--tab-menu-collapse-height)] cursor-pointer'
          ]}
          onClick={setCollapse}
        >
          <Icon icon={unref(collapse) ? 'ep:d-arrow-right' : 'ep:d-arrow-left'}></Icon>
        </div>
        <Menu
          class={[
            '!absolute top-0 z-11',
            {
              '!left-[var(--tab-menu-min-width)]': unref(collapse),
              '!left-[var(--tab-menu-max-width)]': !unref(collapse),
              '!w-[var(--left-menu-max-width)]': unref(showMenu) || unref(fixedMenu),
              '!w-0': !unref(showMenu) && !unref(fixedMenu)
            }
          ]}
          style="transition: width var(--transition-time-02), left var(--transition-time-02);"
        ></Menu>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
$prefix-cls: #{$namespace}-tab-menu;

.#{$prefix-cls} {
  transition: all var(--transition-time-02);

  &__item {
    color: var(--left-menu-text-color);
    transition: all var(--transition-time-02);

    &:hover {
      color: var(--left-menu-text-active-color);
      // background-color: var(--left-menu-bg-active-color);
    }
  }

  &--collapse {
    color: var(--left-menu-text-color);
    background-color: var(--left-menu-bg-light-color);
  }

  .is-active {
    color: var(--left-menu-text-active-color);
    background-color: var(--left-menu-bg-active-color);
  }
}
</style>
