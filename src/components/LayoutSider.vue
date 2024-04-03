<script setup lang="ts">
const menuOptions = [
  {
    label: '通用问答',
    key: 'hear-the-wind-sing',
    icon: () => h('i', { class: 'i-ant-design:read-outlined' }),
    children: [{ label: '精准知识问答', key: '1' }]
  },
  {
    label: '辅助工具',
    key: 'pinball-1973',
    icon: () => h('i', { class: 'i-ant-design:product-outlined' }),
    children: [
      { label: '辅助阅读专业文章', key: '2' },
      { label: '提炼文章核心内容', key: '3' },
      { label: '专业文档翻译', key: '4' }
    ]
  }
]
</script>

<template>
  <n-menu :options="menuOptions" default-expand-all default-value="1" />
</template>

<style lang="" scoped></style>
