import { ApiPostTypes } from 'src/types/API/ApiRouteTypes'
import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'

class ApiClient {
  private instance: AxiosInstance;

  constructor (api: string, secret: string) {
    this.instance = axios.create({ baseURL: api })
    this.instance.defaults.headers.common = { 'x-hasura-admin-secret': secret }
    this.instance.defaults.headers['Content-Type'] = 'application/json'
  }

  public setInterceptors () {
    this.instance.interceptors.request.use(
      (config) => {
        const newConfig = Object.assign({}, config)

        return newConfig
      },
      (error) => Promise.reject(error)
    )

    // JSON.stringify use toJSON on object. this method in axios response return not the error object we want to
    // if there is no toJSON it is classic serialization
    // if need "request data" in error object, has to be done manual since there is circular reference somewhere, idk where
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const newError = {
          ...error,
          request: {},
          response: {
            ...error.response,
            request: {}
          },
          toJSON: null
        }

        return Promise.reject(newError)
      }
    )
  }

  public post<T extends ApiPostTypes> (
    baseUrl: T['url'],
    data: T['request'],
    config?: AxiosRequestConfig
  ): AxiosPromise<T['response']> {
    return this.instance.post(baseUrl, data, config).catch((e: AxiosError) => {
      throw e
    })
  }
}

let apiClient: ApiClient | null = null

export const middlewareApiClient = () => {
  if (!apiClient) {
    apiClient = new ApiClient(process.env.VUE_APP_API_URL || '', process.env.VUE_APP_SECRET)
    apiClient.setInterceptors()
  }

  return apiClient
}
