<script setup lang="ts">
import { router } from '@/router'
import type { ChatList } from '@/stores/chat'
import dayjs from 'dayjs'

const appStore = useAppStore()
const chatStore = useChatStore()
const dataSources = computed(() => chatStore.history)

const isActive = (uuid: number) => chatStore.active === uuid
const handleAdd = () => {
  chatStore.addNewChat({ uuid: Date.now(), data: [], type: appStore.menuValue })
}
const handleSelect = (item: ChatList) => {
  if (chatStore.uploading) return
  chatStore.setActive(item.uuid)
  appStore.setMenuValue(item.type)
  router.push(`/chat/${item.uuid}`)
}
const handleDelete = (index: number, event: MouseEvent) => {
  event.stopPropagation()
  chatStore.deleteHistory(index)
}

const getIcon = (type: string) => {
  switch (type) {
    case '1':
      return 'i-ant-design:alert-outlined'
    case '2':
      return 'i-ant-design:aim-outlined'
    case '3':
      return 'i-ant-design:audit-outlined'
    case '4':
      return 'i-ant-design:cluster-outlined'
    case '5':
      return 'i-ant-design:reconciliation-outlined'
    default:
      return 'i-ant-design:read-outlined'
  }
}

const getDay = (uuid: number) => {
  return dayjs(uuid).format('YYYY-MM-DD HH:mm:ss')
}
</script>

<template>
  <div class="flex flex-col flex-shrink-0 h-full w-60 border-r border-r-gray-2">
    <main class="flex flex-col flex-1 min-h-0">
      <div class="p-3 text-center border-b border-b-gray-2 mb-2">历史纪录</div>
      <div class="flex-1 min-h-0 pb-4 overflow-hidden">
        <NScrollbar class="px-4">
          <div class="flex flex-col gap-2 text-sm">
            <div v-for="(item, index) of dataSources" :key="index">
              <a
                class="relative flex items-center gap-3 pt-3 pb-8 py-3 break-all border border-[#E5E7EB] rounded-md cursor-pointer hover:bg-neutral-100"
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
                <i class="ml-1" :class="getIcon(item.type)"></i>
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
                <div class="absolute bottom-1 right-1">{{ getDay(item.uuid) }}</div>
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
