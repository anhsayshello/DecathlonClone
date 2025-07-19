import { ExtendedPurchase } from 'src/types/purchase.type'
import { create } from 'zustand'

type ExtendedPurchaseStore = {
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: (
    nextExtendedPurchase: ExtendedPurchase[] | ((currentExtendedPurchase: ExtendedPurchase[]) => ExtendedPurchase[])
  ) => void
}

export const useExtendedPurchaseStore = create<ExtendedPurchaseStore>((set) => ({
  extendedPurchase: [],
  setExtendedPurchase: (nextExtendedPurchase) =>
    set((state) => ({
      extendedPurchase:
        typeof nextExtendedPurchase === 'function' ? nextExtendedPurchase(state.extendedPurchase) : nextExtendedPurchase
    }))
}))
