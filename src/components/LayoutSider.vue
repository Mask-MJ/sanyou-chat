<script setup lang="ts">
const appStore = useAppStore()
const chatStore = useChatStore()
const menuValue = computed(() => appStore.menuValue)

const menuOptions = [
  {
    label: '交互问答',
    key: 'hear-the-wind-sing',
    icon: () => h('i', { class: 'i-ant-design:read-outlined' }),
    children: [
      { label: '通用问答', key: '1', icon: () => h('i', { class: 'i-ant-design:alert-outlined' }) },
      {
        label: '精准知识问答',
        key: '2',
        icon: () => h('i', { class: 'i-ant-design:aim-outlined' })
      },
      {
        label: '搜索引擎问答',
        key: '6',
        icon: () => h('i', { class: 'i-ant-design:file-search-outlined' })
      }
    ]
  },
  {
    label: '辅助工具',
    key: 'pinball-1973',
    icon: () => h('i', { class: 'i-ant-design:product-outlined' }),
    children: [
      {
        label: '辅助阅读专业文章',
        key: '3',
        icon: () => h('i', { class: 'i-ant-design:audit-outlined' })
      },
      {
        label: '提炼文章核心内容',
        key: '4',
        icon: () => h('i', { class: 'i-ant-design:cluster-outlined' })
      },
      {
        label: '专业文档翻译',
        key: '5',
        icon: () => h('i', { class: 'i-ant-design:reconciliation-outlined' })
      }
    ]
  }
]

const change = (value: string) => {
  if (chatStore.uploading) return
  appStore.setMenuValue(value)
  chatStore.addNewChat({ uuid: Date.now(), data: [], type: value })
}
</script>

<template>
  <n-menu :value="menuValue" :options="menuOptions" default-expand-all @update-value="change" />
</template>
