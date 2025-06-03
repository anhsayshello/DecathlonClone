import { HttpStatusCode } from 'axios'
import { beforeEach, describe, expect, it } from 'vitest'

import http from '../http'

describe('http axios', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should make a successful GET request to "products" without authentication', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('authenticated request', async () => {
    await http.post('login', { email: 'apptesting@gmail.com', password: 'Testing123.' })

    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
