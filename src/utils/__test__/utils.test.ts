import { AxiosError, HttpStatusCode } from 'axios'
import avatarFallback from 'src/assets/images/avt_fallback.svg'
import { describe, expect, it } from 'vitest'

import {
  formatCurrency,
  formatNumberToSocialStyle,
  generateNameId,
  getIdFromNameId,
  getURLAvatar,
  isAxiosError,
  isAxiosUnprocessableEntityError,
  removeSpecialCharacter
} from '../utils'

describe('isAxiosError', () => {
  it('isAxiosError return boolean', () => {
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosisAxiosUnprocessableEntityErrorError', () => {
  it('isAxiosUnprocessableEntityError return boolean', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
})

describe('formatCurrency', () => {
  it('should formats number using de-DE locale', () => {
    expect(formatCurrency(1000)).toBe('1.000')
    expect(formatCurrency(1000000)).toBe('1.000.000')
    expect(formatCurrency(0)).toBe('0')
  })
})

describe('formatNumberToSocialStyle', () => {
  it('should formats number into compact social style', () => {
    expect(formatNumberToSocialStyle(1000)).toBe('1k')
    expect(formatNumberToSocialStyle(1500000)).toBe('1,5m')
    expect(formatNumberToSocialStyle(999)).toBe('999')
  })
})

describe('removeSpecialCharacter', () => {
  it('should removes all special characters from string', () => {
    expect(removeSpecialCharacter('hello@world!')).toBe('helloworld')
    expect(removeSpecialCharacter('abc#123$%^&*()')).toBe('abc123')
    expect(removeSpecialCharacter('no_special')).toBe('nospecial')
  })
})

describe('generateNameId', () => {
  it('should generates name-id slug correctly', () => {
    expect(generateNameId('Điện thoại iPhone 15', '123')).toBe('Điện-thoại-iPhone-15-i123')
    expect(generateNameId('Special @ Name!!', '999')).toBe('Special-Name-i999')
  })
})

describe('getIdFromNameId', () => {
  it('should extracts id from name-id format', () => {
    expect(getIdFromNameId('Dien-thoai-i123')).toBe('123')
    expect(getIdFromNameId('Some-Product-Name-i5678')).toBe('5678')
  })
})

describe('getURLAvatar', () => {
  it('should returns avatarName when provided', () => {
    expect(getURLAvatar('avatar.png')).toBe('avatar.png')
  })

  it('should returns fallback avatar when avatarName is undefined', () => {
    expect(getURLAvatar(undefined)).toBe(avatarFallback)
    expect(getURLAvatar()).toBe(avatarFallback)
  })
})
