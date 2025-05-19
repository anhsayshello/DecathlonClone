import { lazy, Suspense, useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation, useRoutes } from 'react-router'
import path from 'src/constants/path'

import { AppContext } from './context/app.context'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout/MainLayout'

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
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
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
          element: (
            <Suspense>
              <ProductList />
            </Suspense>
          )
        },
        {
          path: path.productDetail,
          element: (
            <Suspense>
              <ProductDetail />
            </Suspense>
          )
        },
        {
          path: path.productSearch,
          element: (
            <Suspense>
              <ProductSearch />
            </Suspense>
          )
        }
      ]
    },

    {
      path: '*',
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      )
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
              element: (
                <Suspense>
                  <Cart />
                </Suspense>
              )
            },
            {
              path: path.user,
              element: <UserLayout />,
              children: [
                {
                  index: true,
                  element: (
                    <Suspense>
                      <User />
                    </Suspense>
                  )
                },
                {
                  path: path.profile,
                  element: (
                    <Suspense>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: path.historyPurchase,
                  element: (
                    <Suspense>
                      <HistoryPurchase />
                    </Suspense>
                  )
                },
                {
                  path: path.updatePassword,
                  element: (
                    <Suspense>
                      <UpdatePassword />
                    </Suspense>
                  )
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
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return element
}
