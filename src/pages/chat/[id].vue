<script setup lang="ts">
import History from './History.vue'
import Chat from './Chat.vue'

const route = useRoute() as any
const chatStore = useChatStore()
const uuid = computed(() => Number(route.params.id))

onMounted(() => {
  if (chatStore.history.length === 0) {
    chatStore.addNewChat({ uuid: uuid.value, data: [] })
  }
})
</script>

<template>
  <div class="flex h-full">
    <History />
    <Chat :uuid="uuid" />
  </div>
</template>

<style lang="" scoped></style>
