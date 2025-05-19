import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
  login: (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body),
  register: (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body),
  logout: () => http.post<AuthResponse>('/logout')
}

export default authApi
