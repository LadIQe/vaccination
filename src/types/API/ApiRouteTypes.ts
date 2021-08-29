import { Responses } from './ResponseTypes'

export type ApiPostTypes<T extends Responses> = {
  url: '/v1/graphql'
  request: any
  response: T
}
