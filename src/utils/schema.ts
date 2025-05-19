import { z } from 'zod'

const baseSchema = z.object({
  email: z
    .string()
    .nonempty('Nhập email')
    .email('Định dạng email không hợp lệ')
    .max(160, 'Độ dài tối đa 160 kí tự')
    .min(6, 'Độ dài tối thiểu 6 kí tự'),
  password: z
    .string()
    .nonempty('Vui lòng nhập mật khẩu')
    .max(160, 'Mật khẩu tối đa 160 kí tự')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'
    ),
  confirm_password: z
    .string()
    .nonempty('Nhập lại mật khẩu')
    .max(160, 'Mật khẩu không khớp')
    .min(8, 'Mật khẩu không khớp')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, 'Mật khẩu không khớp'),
  name: z.string().trim().nonempty('Typing is required')
})

export const registerSchema = baseSchema
  .omit({ name: true })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Mật khẩu không khớp',
    path: ['confirm_password']
  })
export type RegisterSchema = z.infer<typeof registerSchema>

export const loginSchema = baseSchema.pick({ email: true, password: true })
export type LoginSchema = z.infer<typeof loginSchema>

export const nameSchema = baseSchema.pick({ name: true })
export type NameSchema = z.infer<typeof nameSchema>

// User schema
export const userSchema = z.object({
  name: z.string().max(160, 'Độ dài tối đa 160 ký tự'),
  phone: z.string().regex(/^\d+$/, 'Số điện thoại không hợp lệ').max(20, 'Độ dài tối đa 20 kí tự'),
  address: z.string().max(160, 'Độ dài tối đa 160 ký tự'),
  date_of_birth: z
    .date()
    .min(new Date('01-01-1910'), { message: 'Ngày không hợp lệ, vui lòng chỉnh ngày chính xác' })
    .max(new Date(), 'Ngày không hợp lệ, vui lòng chỉnh ngày chính xác'),
  avatar: z.string().max(1000, 'Độ dài tối đa 1000 ký tự'),
  password: z
    .string()
    .nonempty('Nhập mật khẩu hiện tại của bạn')
    .max(160, 'Password không đúng')
    .min(8, 'Password không đúng')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, 'Password không đúng'),
  new_password: baseSchema.shape.password,
  confirm_password: baseSchema.shape.confirm_password
})

export const profileSchema = userSchema.omit({ password: true, new_password: true, confirm_password: true })
export type ProfileSchema = z.infer<typeof profileSchema>

export const passwordSchema = userSchema
  .pick({ password: true, new_password: true, confirm_password: true })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Mật khẩu không khớp',
    path: ['confirm_password']
  })
export type PasswordSchema = z.infer<typeof passwordSchema>
