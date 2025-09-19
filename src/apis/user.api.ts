import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateUser extends Omit<User, '_id' | 'roles' | 'email' | 'createdAt' | 'updatedAt'> {
  password?: string
  new_password?: string
}

const userApi = {
  getProfile: () => http.get<SuccessResponse<User>>('me'),
  updateProfile: (body: BodyUpdateUser) => http.put<SuccessResponse<User>>('user', body),
  updateAvatar: (body: FormData) =>
    http.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export default userApi
