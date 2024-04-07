<script setup lang="ts">
import { fetchChatAPIProcess } from '@/api'
import type { History, RequestOptions } from '@/stores/chat'
const props = defineProps({
  uuid: { type: Number, required: true }
})

let controller = new AbortController()
const appStore = useAppStore()
const chatStore = useChatStore()

const query = ref<string>('')
const loading = ref<boolean>(false)
const hasUpload = ref<boolean>(false)

const params: any = {
  prev_id: '',
  chunk_size: 250,
  chunk_overlap: 50,
  zh_title_enhance: false
}

const dataSources = computed(() => {
  return chatStore.getChatDataByUuid(props.uuid)?.data || []
})
const buttonDisabled = computed(() => {
  console.log(menuValue.value, 'menuValue')
  if (['3', '4', '5'].includes(menuValue.value)) {
    // 判断是否上传文件
    if (hasUpload.value) {
      return loading.value || !query.value || query.value.trim() === ''
    } else {
      return true
    }
  } else {
    return loading.value || !query.value || query.value.trim() === ''
  }
})
const menuValue = computed(() => appStore.menuValue)

const handleEnter = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSubmit()
  }
}
const handleSubmit = async () => {
  if (loading.value) return

  if (!query.value || query.value.trim() === '') return

  controller = new AbortController()
  const history: History[] = dataSources.value.map((item) => ({
    role: item.inversion ? 'user' : 'assistant',
    content: item.content
  }))
  const requestOptions = {
    conversation_id: String(props.uuid) || '',
    history_len: -1,
    max_tokens: 0,
    model_name: 'chatglm3-6b',
    prompt_name: 'default',
    stream: false,
    temperature: 0.7,
    query: query.value,
    history,
    url: '/api/chat/chat'
  }
  chatStore.addChatByUuid(props.uuid, {
    inversion: true,
    dateTime: new Date().toLocaleString(),
    content: query.value,
    error: false,
    requestOptions
  })
  loading.value = true
  query.value = ''

  try {
    await fetchChatAPIProcess<RequestOptions>({
      ...requestOptions,
      signal: controller.signal,
      onDownloadProgress: ({ event }) => {
        const xhr = event.target
        const { responseText } = xhr
        let chunk = responseText.substring(6)
        try {
          const data = JSON.parse(chunk)
          chatStore.addChatByUuid(props.uuid, {
            inversion: false,
            dateTime: new Date().toLocaleString(),
            content: data.text,
            error: false,
            requestOptions
          })
        } catch (error) {
          //
        }
      }
    })
  } catch (error: any) {
    // const errorMessage = error.message
  } finally {
    loading.value = false
  }
}
const handleStop = () => {
  if (loading.value) {
    controller.abort()
    loading.value = false
  }
}
const handleBeforeUpload = (e: any) => {
  loading.value = true
}
const handleUploadFinish = (e: any) => {
  console.log(e.event, 'event')
  const { response } = e.event.target
  if (response) {
    const result = JSON.parse(response)
    if (result.code === 200) {
      console.log(result.data.id, '上传成功')
      hasUpload.value = true
      window.$message?.success('上传成功')
    }
    loading.value = false
  }
}

onUnmounted(() => {
  if (loading.value) controller.abort()
})
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <main class="flex-1 overflow-hidden">
      <div id="scrollRef" ref="scrollRef" class="h-full overflow-hidden overflow-y-auto">
        <div id="image-wrapper" class="w-full max-w-screen-xl m-auto dark:bg-[#101014] p-4">
          <template v-if="!dataSources.length">
            <div class="flex items-center justify-center mt-4 text-center text-neutral-300">
              <i class="mr-2 text-3xl i-ant-design:comment-outlined"></i>
              <span>新建聊天</span>
            </div>
          </template>
          <template v-else>
            <div>
              <Message v-for="(item, index) of dataSources" :key="index" :date="item" />
              <div class="sticky bottom-0 left-0 flex justify-center">
                <NButton v-if="loading" type="warning" @click="handleStop">
                  <template #icon>
                    <i class="i-ant-design:stop-outlined"></i>
                  </template>
                  停止响应
                </NButton>
              </div>
            </div>
          </template>
        </div>
      </div>
    </main>
    <footer class="p-4">
      <div class="w-full max-w-screen-xl m-auto">
        <div class="flex items-center justify-between space-x-2">
          <NInput
            ref="inputRef"
            v-model:value="query"
            type="textarea"
            placeholder="来说点什么吧..."
            :autosize="{ minRows: 1, maxRows: 8 }"
            @keypress="handleEnter"
          />
          <NButton type="primary" :disabled="buttonDisabled" @click="handleSubmit">
            <template #icon>
              <i class="i-ant-design:send-outlined"></i>
            </template>
          </NButton>
          <n-upload
            v-if="menuValue !== '1'"
            class="w-15"
            action="/api/knowledge_base/upload_temp_docs"
            :data="params"
            name="files"
            :show-file-list="false"
            @before-upload="handleBeforeUpload"
            @finish="handleUploadFinish"
          >
            <NButton type="primary" :loading="loading">
              <template #icon>
                <i class="i-ant-design:upload-outlined"></i>
              </template>
            </NButton>
          </n-upload>
        </div>
      </div>
    </footer>
  </div>
</template>
