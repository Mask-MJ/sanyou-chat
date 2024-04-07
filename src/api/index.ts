import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'

import { post } from '@/utils/request'
import type { RequestOptions } from '@/stores/chat'

export function fetchChatAPIProcess<T = any>(
  params: RequestOptions & {
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  }
) {
  return post<T>({
    url: params.url,
    data: params,
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress
  })
}
