import { useQuery } from '@tanstack/react-query'
import purchaseApi from 'src/apis/purchase.api'
import { purchaseStatus } from 'src/constants/purchase'
import useViewport from 'src/hooks/useViewport'
import { useAuthenticatedStore } from 'src/stores/useAuthenticatedStore'
import { useProfileStore } from 'src/stores/useProfileStore'
import { PurchaseListStatus } from 'src/types/purchase.type'

import DesktopHeader from './components/DesktopHeader'
import MobileTabletHeader from './components/MobileTabletHeader'

export default function Header() {
  const viewport = useViewport()
  const { isAuthenticated } = useAuthenticatedStore((state) => state)
  const { profile } = useProfileStore((state) => state)

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
        <DesktopHeader isAuthenticated={isAuthenticated} profile={profile} totalPurchases={totalPurchases as number} />
      ) : (
        <MobileTabletHeader isAuthenticated={isAuthenticated} totalPurchases={totalPurchases as number} />
      )}
    </header>
  )
}
