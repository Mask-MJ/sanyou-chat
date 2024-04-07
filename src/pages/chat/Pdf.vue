<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'

// essential styles
import 'vue-pdf-embed/dist/style/index.css'

// optional styles
import 'vue-pdf-embed/dist/style/annotationLayer.css'
import 'vue-pdf-embed/dist/style/textLayer.css'
const props = defineProps({
  uuid: { type: Number, required: true }
})

const chatStore = useChatStore()

const pdfSource = ref<ArrayBuffer | null>(null)

watch(
  () => chatStore.getChatDataByUuid(props.uuid)?.pdf,
  async (value) => {
    if (value) {
      pdfSource.value = await value.arrayBuffer()
    } else {
      pdfSource.value = null
    }
  }
)
</script>

<template>
  <NScrollbar v-if="pdfSource" class="px-4 border-r border-r-gray-2">
    <VuePdfEmbed v-if="pdfSource" class="w-200" annotation-layer text-layer :source="pdfSource" />
  </NScrollbar>
</template>

<style lang="" scoped></style>
