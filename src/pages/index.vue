<script setup lang="ts">
// 重定向
import { useRouter } from 'vue-router'
const router = useRouter()
const uuid = Date.now()
router.push(`/chat/${uuid}`)
</script>

<template>
  <div>21111</div>
</template>

<style lang="" scoped></style>
