import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll } from 'vitest'

import { vi } from 'vitest'
import { setupServer } from 'msw/node'
import authHandler from '../src/msw/auth.msw'
import productHandler from '../src/msw/product.msw'
import userHandler from '../src/msw/user.msw'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

const server = setupServer(...authHandler, ...productHandler, ...userHandler)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))

// Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers())
