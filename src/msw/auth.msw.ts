import '@testing-library/jest-dom/vitest'
import config from '../../src/constants/config'
import { http, HttpResponse } from 'msw'

const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Mzg2ZDcwYTcyYjRhZGQ5YWQzMWI2YSIsImVtYWlsIjoiYXBwdGVzdGluZ0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDI1LTA2LTAxVDE2OjAxOjIyLjM4OVoiLCJpYXQiOjE3NDg3OTM2ODIsImV4cCI6MTc0OTM5ODQ4Mn0.H5Z2L_KeIaMXVxf6ZHL__rtvm0xxFEQwbzkDDEXXrXs',
    expires: 604800,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Mzg2ZDcwYTcyYjRhZGQ5YWQzMWI2YSIsImVtYWlsIjoiYXBwdGVzdGluZ0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDI1LTA2LTAxVDE2OjAxOjIyLjM4OVoiLCJpYXQiOjE3NDg3OTM2ODIsImV4cCI6MTc1NzQzMzY4Mn0.XRGC8-mpp3pfrvfBBfjWMA1dpetui4wKfFuIzArnavw',
    expires_refresh_token: 8640000,
    user: {
      _id: '68386d70a72b4add9ad31b6a',
      roles: ['User'],
      email: 'apptesting@gmail.com',
      createdAt: '2025-05-29T14:21:36.322Z',
      updatedAt: '2025-05-29T14:21:36.322Z',
      __v: 0
    }
  }
}

const registerRes = {
  message: 'Đăng ký thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaDEyMzQ1QGdtYWlsLmNvbSIsImlkIjoiNjgzYzhkNDlhNzJiNGFkZDlhZDMxZTgyIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wNi0wMVQxNzoyNjozMy43MjVaIiwiaWF0IjoxNzQ4Nzk4NzkzLCJleHAiOjE3NDk0MDM1OTN9.q65Hj6rD__b5rmTJRsDzA-UBMlsdUcIrLhpca9lqj4g',
    expires: 604800,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaDEyMzQ1QGdtYWlsLmNvbSIsImlkIjoiNjgzYzhkNDlhNzJiNGFkZDlhZDMxZTgyIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wNi0wMVQxNzoyNjozMy43MjVaIiwiaWF0IjoxNzQ4Nzk4NzkzLCJleHAiOjE3NTc0Mzg3OTN9.c8mKKAh-HnNUBkmZT2ceJBVzpGFCeoi6YOHSPnBiLbo',
    expires_refresh_token: 8640000,
    user: {
      roles: ['User'],
      _id: '683c8d49a72b4add9ad31e82',
      email: 'apptesting@gmail.com',
      createdAt: '2025-06-01T17:26:33.675Z',
      updatedAt: '2025-06-01T17:26:33.675Z',
      __v: 0
    }
  }
}

const loginReq = http.post(`${config.baseUrl}login`, () => {
  return HttpResponse.json(loginRes, { status: 200 })
})

const registerReq = http.post(`${config.baseUrl}register`, () => {
  return HttpResponse.json(registerRes, { status: 200 })
})

const authHandler = [registerReq, loginReq]
export default authHandler
