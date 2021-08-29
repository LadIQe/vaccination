import { middlewareApiClient } from '@/store/ApiClient'
import { Responses } from '@/types/API/ResponseTypes'

export const postData = <T extends Responses>(data: any) =>
  middlewareApiClient().post<T>('/v1/graphql', data)
