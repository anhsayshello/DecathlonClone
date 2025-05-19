import axios, { AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import config from 'src/constants/config'
import path from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.type'

import { clearLS, getAcessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'

class Http {
  instance: AxiosInstance
  private access_token: string
  constructor() {
    this.access_token = getAcessTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 100000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token) {
          config.headers.Authorization = this.access_token
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.access_token = data.data.access_token
          setAccessTokenToLS(this.access_token)
          setProfileToLS(data.data.user)
        }
        if (url === path.logout) {
          this.access_token = ''
          clearLS()
        }
        return response
      },
      function (error) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message, {
            autoClose: 250
          })
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
