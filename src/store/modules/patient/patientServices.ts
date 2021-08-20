import { PostData } from '@/types/API/ApiRouteTypes'
import { middlewareApiClient } from '@/store/ApiClient'

export const fetchPatients = (data: any) =>
  middlewareApiClient().post<PostData>('/v1/graphql', data)
