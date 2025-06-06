import axios, { AxiosError, HttpStatusCode } from 'axios'
import avatarFallback from 'src/assets/images/avt_fallback.svg'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}
export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = (name: string, id: string) => {
  return removeSpecialCharacter(name).replace(/\s+/g, '-') + `-i${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i')
  return arr[1]
}

export const getURLAvatar = (avatarName?: string): string => {
  return avatarName?.trim() || avatarFallback
}
