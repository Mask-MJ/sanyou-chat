import { defineStore } from 'pinia'

export interface ChatList {
  uuid: number
  data: Chat[]
  pdf?: File
  type: string
  knowledge_id?: string
}

export interface Chat {
  dateTime: string
  content: string
  inversion: boolean
  loading?: boolean
  error?: boolean
  requestOptions: RequestOptions
  docs?: string[]
}

export interface History {
  role: 'user' | 'assistant'
  content: string
}

export interface RequestOptions {
  url: string
  conversation_id?: string
  history_len?: number
  max_tokens: number
  model_name: string
  prompt_name: string
  stream: boolean
  temperature: number
  query: string
  history: History[]
  knowledge_id?: string
  top_k?: number
  score_threshold?: number
}

export const useChatStore = defineStore('chat', () => {
  const router = useRouter()
  const uuid = Date.now()
  const active = ref<number | null>(uuid)
  const history = ref<ChatList[]>([])
  const uploading = ref<boolean>(false)

  const setActive = (uuid: number) => {
    active.value = uuid
  }

  const setUploadStatus = (status: boolean) => {
    uploading.value = status
  }

  const addNewChat = (data: ChatList) => {
    if (uploading.value) return
    history.value.push(data)
    active.value = data.uuid
    reloadRoute(data.uuid)
  }

  // 根据 uuid 获取聊天记录
  const getChatDataByUuid = (uuid: number) => {
    return history.value.find((chat) => chat.uuid === uuid)
  }

  // 根据 uuid 添加新的聊天记录
  const addChatByUuid = (uuid: number, data: Chat) => {
    const chat = getChatDataByUuid(uuid)
    if (chat) {
      chat.data.push(data)
    }
  }

  const setDataByUuid = (params: { uuid: number; pdf?: File; knowledge_id?: string }) => {
    const chat = getChatDataByUuid(params.uuid)
    if (chat) {
      chat.pdf = params.pdf
      chat.knowledge_id = params.knowledge_id
    }
  }

  const deleteHistory = (index: number) => {
    history.value.splice(index, 1)

    if (index > 0 && index <= history.value.length) {
      const uuid = history.value[index - 1].uuid
      active.value = uuid
      reloadRoute(uuid)
    }
    if (index === 0) {
      active.value = null
    }
  }

  const reloadRoute = async (uuid?: number) => {
    await router.push(`/chat/${uuid}`)
  }

  return {
    active,
    history,
    uploading,
    addNewChat,
    getChatDataByUuid,
    addChatByUuid,
    setDataByUuid,
    setActive,
    setUploadStatus,
    deleteHistory
  }
})
