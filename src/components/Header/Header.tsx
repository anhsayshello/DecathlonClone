import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import purchaseApi from 'src/api/purchase.api'
import { purchaseStatus } from 'src/constants/purchase'
import { AppContext } from 'src/context/app.context'
import { PurchaseListStatus } from 'src/types/purchase.type'

import DesktopHeader from './components/DesktopHeader'
import MobileTabletHeader from './components/MobileTabletHeader'

export default function Header() {
  const { viewport } = useContext(AppContext)
  const { isAuthenticated, profile, handleLogout } = useContext(AppContext)
  const { data: dataPurchasesCartPending } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.cartPending }],
    queryFn: () => purchaseApi.getPurchase({ status: purchaseStatus.cartPending as PurchaseListStatus }),
    enabled: isAuthenticated,
    staleTime: 3 * 60 * 1000
  })
  const purchasesCartPending = dataPurchasesCartPending?.data.data
  const totalPurchases =
    purchasesCartPending && purchasesCartPending.reduce((total, purchase) => total + purchase.buy_count, 0)

  return (
    <header>
      {viewport.desktop ? (
        <DesktopHeader
          isAuthenticated={isAuthenticated}
          profile={profile}
          handleLogout={handleLogout}
          totalPurchases={totalPurchases as number}
        />
      ) : (
        <MobileTabletHeader isAuthenticated={isAuthenticated} totalPurchases={totalPurchases as number} />
      )}
    </header>
  )
}
