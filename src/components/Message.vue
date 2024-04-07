<script setup lang="ts">
import type { Chat } from '@/stores/chat'

const props = defineProps({
  date: { type: Object as PropType<Chat>, required: true }
})
const content = computed(() => props.date.content)
const inversion = computed(() => props.date.inversion)
const dateTime = computed(() => props.date.dateTime)
const error = computed(() => props.date.error)
const loading = computed(() => props.date.loading)
</script>

<template>
  <div
    ref="messageRef"
    class="flex w-full mb-6 overflow-hidden"
    :class="[{ 'flex-row-reverse': inversion }]"
  >
    <div
      class="flex items-center justify-center flex-shrink-0 h-8 overflow-hidden rounded-full basis-8"
      :class="[inversion ? 'ml-2' : 'mr-2']"
    >
      <Avatar :image="inversion" />
    </div>
    <div class="overflow-hidden text-sm" :class="[inversion ? 'items-end' : 'items-start']">
      <p class="text-xs text-[#b4bbc4]" :class="[inversion ? 'text-right' : 'text-left']">
        {{ dateTime }}
      </p>
      <div class="flex items-end gap-1 mt-2" :class="[inversion ? 'flex-row-reverse' : 'flex-row']">
        <Text
          ref="textRef"
          :inversion="inversion"
          :error="error"
          :text="content"
          :loading="loading"
          :as-raw-text="inversion"
        />
      </div>
    </div>
  </div>
</template>

<style lang="" scoped></style>
