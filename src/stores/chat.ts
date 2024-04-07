import { defineStore } from 'pinia'

export interface ChatList {
  uuid: number
  data: Chat[]
}

export interface Chat {
  dateTime: string
  content: string
  inversion: boolean
  loading?: boolean
  error?: boolean
  requestOptions: RequestOptions
}

export interface History {
  role: 'user' | 'assistant'
  content: string
}

export interface RequestOptions {
  url: string
  conversation_id: string
  history_len: number
  max_tokens: number
  model_name: string
  prompt_name: string
  stream: boolean
  temperature: number
  query: string
  history: History[]
}

export const useChatStore = defineStore('chat', () => {
  const router = useRouter()
  const uuid = Date.now()
  const active = ref<number | null>(uuid)
  const history = ref<ChatList[]>([])

  const setActive = (uuid: number) => {
    active.value = uuid
  }

  const addNewChat = (data: ChatList) => {
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
    addNewChat,
    getChatDataByUuid,
    addChatByUuid,
    setActive,
    deleteHistory
  }
})
