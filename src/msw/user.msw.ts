import '@testing-library/jest-dom/vitest'
import config from '../../src/constants/config'
import { http, HttpResponse } from 'msw'

const userRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '68386d70a72b4add9ad31b6a',
    roles: ['User'],
    email: 'apptesting@gmail.com',
    createdAt: '2025-05-29T14:21:36.322Z',
    updatedAt: '2025-05-29T14:21:36.322Z',
    avatar: 'https://api-ecom.duthanhduoc.com/images/undefined'
  }
}

const userReq = http.get(`${config.baseUrl}me`, () => {
  return HttpResponse.json(userRes, { status: 200 })
})

const userHandler = [userReq]
export default userHandler
