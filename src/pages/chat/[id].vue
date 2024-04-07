<script setup lang="ts">
import History from './History.vue'
import Chat from './Chat.vue'
import Pdf from './Pdf.vue'

const route = useRoute() as any
const appStore = useAppStore()
const chatStore = useChatStore()
const uuid = computed(() => Number(route.params.id))

onMounted(() => {
  if (chatStore.history.length === 0) {
    chatStore.addNewChat({ uuid: uuid.value, data: [], type: appStore.menuValue })
  }
})
</script>

<template>
  <div class="flex h-full overflow-hidden">
    <History />
    <Pdf :uuid="uuid" />
    <Chat :uuid="uuid" />
  </div>
</template>
