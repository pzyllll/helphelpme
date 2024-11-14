<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import type { CountryCommentVO } from '@/types'

interface Props {
  texts: CountryCommentVO[] // 接收字符串数组
  speed?: number // 滚动速度（可选，默认为2）
  height?: number // 容器高度（可选，默认为200）
}

const props = withDefaults(defineProps<Props>(), {
  speed: 2,
  height: 200
})

const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const scrolling = ref(false)
let animationFrame: number | null = null

// 检查是否需要滚动
const checkNeedScroll = () => {
  if (!containerRef.value || !contentRef.value) return

  // 如果内容高度大于容器高度，则需要滚动
  scrolling.value = contentRef.value.offsetHeight > containerRef.value.offsetHeight
}

// 滚动动画
const scroll = () => {
  if (!containerRef.value || !contentRef.value || !scrolling.value) return

  // 先取消��前的动画
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }

  const container = containerRef.value
  container.scrollTop += props.speed || 2

  // 当滚动到底部时，重置到顶部
  if (container.scrollTop >= contentRef.value.offsetHeight / 2) {
    container.scrollTop = 0
  }

  animationFrame = requestAnimationFrame(scroll)
}

// 监听 texts 属性的变化
watch(
  () => props.texts,
  async () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }

    await nextTick()
    checkNeedScroll()

    if (scrolling.value && contentRef.value) {
      const content = contentRef.value.innerHTML
      contentRef.value.innerHTML = content + content
      scroll()
    }
  },
  { deep: true, immediate: true }
)

// 组件挂载时启动滚动
onMounted(() => {
  checkNeedScroll()
  if (scrolling.value) {
    // 复制一份内容以实现无缝滚动
    const content = contentRef.value?.innerHTML || ''
    if (contentRef.value) {
      contentRef.value.innerHTML = content + content
    }
    scroll()
  }
})

// 组件卸载时清理
onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="marquee-container"
    :style="{ height: `${height || 200}px` }"
  >
    <div ref="contentRef" class="marquee-content">
      <div v-for="(text, index) in texts" :key="index" class="marquee-item">
        <slot :text="text">{{ text }}</slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-container {
  overflow: hidden;
  position: relative;
  width: 30vw;
  margin: 0 auto;
  border: 1px solid #eee;
  border-radius: 4px;
}

.marquee-content {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

.marquee-item {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
  width: 100%;
}
</style>
