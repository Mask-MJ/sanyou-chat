<script setup lang="ts">
import type { ChatList } from '@/stores/chat'

const chatStore = useChatStore()
const dataSources = computed(() => chatStore.history)

const isActive = (uuid: number) => chatStore.active === uuid
const handleAdd = () => {
  chatStore.addNewChat({ uuid: Date.now(), data: [] })
}
const handleSelect = (item: ChatList) => chatStore.setActive(item.uuid)
const handleDelete = (index: number, event: MouseEvent) => {
  event.stopPropagation()
  chatStore.deleteHistory(index)
}
</script>

<template>
  <div class="flex flex-col h-full w-60 border-r border-r-gray-2">
    <main class="flex flex-col flex-1 min-h-0">
      <div class="p-3 text-center border-b border-b-gray-2 mb-2">历史纪录</div>
      <div class="flex-1 min-h-0 pb-4 overflow-hidden">
        <NScrollbar class="px-4">
          <div class="flex flex-col gap-2 text-sm">
            <div v-for="(item, index) of dataSources" :key="index">
              <a
                class="relative flex items-center gap-3 px-3 py-3 break-all border border-[#E5E7EB] rounded-md cursor-pointer hover:bg-neutral-100"
                :class="
                  isActive(item.uuid) && [
                    '!border-[#4b9e5f]',
                    'bg-neutral-100',
                    'text-[#4b9e5f]',
                    'pr-14'
                  ]
                "
                @click="handleSelect(item)"
              >
                <i class="i-ant-design:message-outlined"></i>
                <div
                  class="relative flex-1 overflow-hidden break-all text-ellipsis whitespace-nowrap"
                >
                  {{ item.data.length ? item.data[0].content : '新建聊天' }}
                </div>
                <div v-if="isActive(item.uuid)" class="absolute z-10 flex visible right-1">
                  <NPopconfirm placement="bottom" @positive-click="handleDelete(index, $event)">
                    <template #trigger>
                      <button class="p-1">
                        <i class="i-ant-design:delete-outlined"></i>
                      </button>
                    </template>
                    确定删除此纪录？
                  </NPopconfirm>
                </div>
              </a>
            </div>
          </div>
        </NScrollbar>
      </div>
      <div class="flex items-center p-4 space-x-4">
        <div class="flex-1">
          <NButton dashed block @click="handleAdd"> 新建聊天 </NButton>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="" scoped></style>