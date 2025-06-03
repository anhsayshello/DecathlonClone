import '@testing-library/jest-dom/vitest'

import * as matchers from '@testing-library/jest-dom/matchers'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router'
import { describe, expect, test } from 'vitest'

import App from './App'
import path from './constants/path'

expect.extend(matchers)

describe('App', () => {
  test('full app rendering/navigating', async () => {
    render(<App />, { wrapper: BrowserRouter })
    const user = userEvent.setup()

    // verify page content for default route
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Decathlon Clone')
    })

    // verify page content for expected route after navigating
    await user.click(screen.getByLabelText(/Đăng nhập/i))
    expect(await screen.findByText(/Tạo tài khoản/i)).toBeInTheDocument()
  })

  test('landing on a bad page', async () => {
    const badRoute = '/some/badroute'

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    )

    expect(await screen.findByText(/Page not found/i)).toBeInTheDocument()
  })

  test('rendering register component', async () => {
    render(
      <MemoryRouter initialEntries={[path.register]}>
        <App />
      </MemoryRouter>
    )

    expect(await screen.findByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
  })
})
