<script setup lang="ts">
const appStore = useAppStore()
const menuValue = computed(() => appStore.menuValue)

const menuOptions = [
  {
    label: '交互问答',
    key: 'hear-the-wind-sing',
    icon: () => h('i', { class: 'i-ant-design:read-outlined' }),
    children: [
      { label: '通用问答', key: '1' },
      { label: '精准知识问答', key: '2' }
    ]
  },
  {
    label: '辅助工具',
    key: 'pinball-1973',
    icon: () => h('i', { class: 'i-ant-design:product-outlined' }),
    children: [
      { label: '辅助阅读专业文章', key: '3' },
      { label: '提炼文章核心内容', key: '4' },
      { label: '专业文档翻译', key: '5' }
    ]
  }
]

const change = (value: string) => {
  appStore.setMenuValue(value)
}
</script>

<template>
  <n-menu :value="menuValue" :options="menuOptions" default-expand-all @update-value="change" />
</template>
