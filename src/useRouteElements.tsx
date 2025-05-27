import { lazy, useEffect } from 'react'
import { Navigate, Outlet, useLocation, useRoutes } from 'react-router'
import path from 'src/constants/path'

import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import { useAuthenticatedStore } from './stores/useAuthenticatedStore'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const ProductList = lazy(() => import('./pages/ProductList'))
const ProductSearch = lazy(() => import('./pages/ProductSearch'))
const Cart = lazy(() => import('./pages/Cart'))
const UserLayout = lazy(() => import('./pages/User/layout/UserLayout/UserLayout'))
const User = lazy(() => import('./pages/User'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const UpdatePassword = lazy(() => import('./pages/User/pages/UpdatePassword'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ProtectedRoute() {
  const { isAuthenticated } = useAuthenticatedStore((state) => state)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}
function RejectedRoute() {
  const { isAuthenticated } = useAuthenticatedStore((state) => state)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElements() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const element = useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          index: true,
          path: path.home,
          element: <ProductList />
        },
        {
          path: path.productDetail,
          element: <ProductDetail />
        },
        {
          path: path.productSearch,
          element: <ProductSearch />
        }
      ]
    },

    {
      path: '*',
      element: <NotFound />
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: path.cart,
              element: <Cart />
            },
            {
              path: path.user,
              element: <UserLayout />,
              children: [
                {
                  index: true,
                  element: <User />
                },
                {
                  path: path.profile,
                  element: <Profile />
                },
                {
                  path: path.historyPurchase,
                  element: <HistoryPurchase />
                },
                {
                  path: path.updatePassword,
                  element: <UpdatePassword />
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <AuthLayout />,
          children: [
            {
              path: path.login,
              element: <Login />
            },
            {
              path: path.register,
              element: <Register />
            }
          ]
        }
      ]
    }
  ])
  return element
}
