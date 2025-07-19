import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from 'src/App'
import path from 'src/constants/path'
import { beforeEach } from 'vitest'
import { describe, expect, it } from 'vitest'

describe('Register', () => {
  beforeEach(() => {
    cleanup()
    render(
      <MemoryRouter initialEntries={[path.register]}>
        <App />
      </MemoryRouter>
    )
  })

  it('should display required error when value is invalid', async () => {
    fireEvent.submit(await screen.findByTestId('register-button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(3)
  })

  it('should display matching error when email is invalid', async () => {
    fireEvent.input(await screen.findByPlaceholderText(/Email/i), {
      target: {
        value: 'test'
      }
    })

    fireEvent.input(await screen.findByPlaceholderText(/^Password$/i), {
      target: {
        value: 'Testing123.'
      }
    })

    fireEvent.input(await screen.findByPlaceholderText(/^Confirm Password$/i), {
      target: {
        value: 'Testing123.'
      }
    })

    fireEvent.submit(await screen.findByTestId('register-button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(await screen.findByPlaceholderText(/Email/i)).toHaveValue('test')
    expect(await screen.findByPlaceholderText(/^Password$/i)).toHaveValue('Testing123.')
    expect(await screen.findByPlaceholderText(/^Confirm Password$/i)).toHaveValue('Testing123.')
  })

  it('should display errors for password and confirm password', async () => {
    fireEvent.input(await screen.findByPlaceholderText(/Email/i), {
      target: {
        value: 'test@gmail.com'
      }
    })

    fireEvent.input(await screen.findByPlaceholderText(/^Password$/i), {
      target: {
        value: 'pass'
      }
    })

    fireEvent.input(await screen.findByPlaceholderText(/^Confirm Password$/i), {
      target: {
        value: 'pass'
      }
    })

    fireEvent.submit(await screen.findByTestId('register-button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(2)
    expect(await screen.findByPlaceholderText(/Email/i)).toHaveValue('test@gmail.com')
    expect(await screen.findByPlaceholderText(/^Password$/i)).toHaveValue('pass')
    expect(await screen.findByPlaceholderText(/^Confirm Password$/i)).toHaveValue('pass')
  })

  it('should display confirm password mismatch error', async () => {
    fireEvent.input(await screen.findByPlaceholderText(/Email/i), {
      target: {
        value: 'test@gmail.com'
      }
    })

    fireEvent.input(await screen.findByPlaceholderText(/^Password$/i), {
      target: {
        value: 'Testing123.'
      }
    })

    fireEvent.input(await screen.findByPlaceholderText(/^Confirm Password$/i), {
      target: {
        value: 'Testing123@'
      }
    })

    fireEvent.submit(await screen.findByTestId('register-button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(await screen.findByPlaceholderText(/Email/i)).toHaveValue('test@gmail.com')
    expect(await screen.findByPlaceholderText(/^Password$/i)).toHaveValue('Testing123.')
    expect(await screen.findByPlaceholderText(/^Confirm Password$/i)).toHaveValue('Testing123@')
  })

  it('should display error when confirm password is missing', async () => {
    fireEvent.input(await screen.findByPlaceholderText(/Email/i), {
      target: {
        value: 'test@gmail.com'
      }
    })

    fireEvent.input(await screen.findByPlaceholderText(/^Password$/i), {
      target: {
        value: 'Testing123.'
      }
    })

    fireEvent.input(await screen.findByPlaceholderText(/^Confirm Password$/i), {
      target: {
        value: ''
      }
    })

    fireEvent.submit(await screen.findByTestId('register-button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(await screen.findByPlaceholderText(/Email/i)).toHaveValue('test@gmail.com')
    expect(await screen.findByPlaceholderText(/^Password$/i)).toHaveValue('Testing123.')
    expect(await screen.findByPlaceholderText(/^Confirm Password$/i)).toHaveValue('')
  })

  it('should not display error when value is valid', async () => {
    fireEvent.input(await screen.findByPlaceholderText(/Email/i), {
      target: {
        value: 'apptesting@gmail.com'
      }
    })

    fireEvent.input(await screen.findByPlaceholderText(/^Password$/i), {
      target: {
        value: 'Testing123.'
      }
    })

    fireEvent.input(await screen.findByPlaceholderText(/^Confirm Password$/i), {
      target: {
        value: 'Testing123.'
      }
    })

    fireEvent.submit(await screen.findByTestId('register-button'))

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0))
    await waitFor(() => {
      expect(screen.queryByText(/Bạn đã có tài khoản?/i)).not.toBeInTheDocument()
    })
  })
})
