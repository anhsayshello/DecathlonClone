const path = {
  home: '/',
  productSearch: '/search',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: '/:nameId',
  cart: '/cart',
  user: '/user',
  profile: '/user/profile',
  historyPurchase: '/user/purchase',
  updatePassword: '/user/password'
} as const
export default path
