import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  getPurchase: (params: { status: PurchaseListStatus }) => http.get<SuccessResponse<Purchase[]>>(URL, { params }),
  addToCart: (body: { product_id: string; buy_count: number }) =>
    http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body),
  updatePurchase: (body: { product_id: string; buy_count: number }) =>
    http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body),
  deletePurchase: (purchase_id: string[]) =>
    http.delete<SuccessResponse<{ delete_count: number }>>(URL, { data: purchase_id }),
  buyProducts: (body: { product_id: string; buy_count: number }[]) =>
    http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body)
}

export default purchaseApi
