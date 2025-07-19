import { ChatbotInfo } from 'src/components/ChatbotAi/Components/ChatbotInfo/ChatbotInfo'
import { User } from 'src/types/user.type'
import { beforeEach } from 'vitest'
import { describe, expect, it } from 'vitest'

import {
  clearLS,
  getAccessTokenFromLS,
  getChatHistoryFromLS,
  getProfileFromLS,
  setAccessTokenToLS,
  setChatHistoryToLS,
  setProfileToLS
} from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2JjMWE0MjE2Y2E0MDMzZWQxMGU0MSIsImVtYWlsIjoiYW5obGUwMzQ3QGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjUtMDUtMjhUMTA6MTc6MzIuNjgwWiIsImlhdCI6MTc0ODQyNzQ1MiwiZXhwIjoxNzQ5MDMyMjUyfQ.7xonbEF-DgCja1pdcnI6WEHv5LIu0FISRPDtgBks1J0'

const chat_history = [
  {
    hideInChat: true,
    role: 'model',
    text: ChatbotInfo
  },
  { role: 'user', text: 'hello' }
]
const profile = {
  _id: '67cbc1a4216ca4033ed10e41',
  roles: ['User'],
  email: 'anhle0347@gmail.com',
  createdAt: '2025-03-08T04:03:48.291Z',
  updatedAt: '2025-05-17T12:12:00.758Z',
  __v: 0,
  address: 'Quảng Trị',
  avatar: 'https://api-ecom.duthanhduoc.com/images/194618fe-daad-43fe-9e17-f0009ada9321.jpeg',
  date_of_birth: '2019-05-06T17:00:00.000Z',
  name: 'anhp25',
  phone: '3242323435'
}

beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('should store and retrieve access_token correctly', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('profile', () => {
  it('should store and retrieve profile correctly', () => {
    setProfileToLS(profile as User)
    expect(getProfileFromLS()).toStrictEqual(profile)
  })
})

describe('chat_history', () => {
  it('should store and retrieve chat_history correctly', () => {
    setChatHistoryToLS(chat_history)
    expect(getChatHistoryFromLS()).toStrictEqual(chat_history)
  })
})

describe('clearLS', () => {
  it('should clear all localStorage data correctly', () => {
    setAccessTokenToLS(access_token)
    setProfileToLS(profile as User)
    setChatHistoryToLS(chat_history)
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getProfileFromLS()).toBe(null)
    expect(getChatHistoryFromLS()).toBe(null)
  })
})
