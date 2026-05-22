<template>
  <!-- 首屏 -->
  <section
    v-if="!isMobile"
    id="home-section"
    class="bg-home w-screen h-screen"
    :style="{
      backgroundImage: `url(${IMG_MAP.bgHome})`
    }"
  >
  </section>
</template>
<script lang="ts" setup>
import { IMG_MAP } from '@/constants/img'
import { useAppStore } from '@/store/modules/app'

defineOptions({ name: 'Home' })

const appStore = useAppStore()

const isMobile = computed(() => appStore.getMobile)
</script>

<style scoped lang="scss">
.bg-home {
  background-size: 100% auto;
  background-position: top;
  background-repeat: no-repeat;
}
</style>
