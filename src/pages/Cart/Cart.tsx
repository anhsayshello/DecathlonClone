import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import throttle from 'lodash/throttle'
import { motion } from 'motion/react'
import { useContext, useEffect, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { toast } from 'react-toastify'
import purchaseApi from 'src/api/purchase.api'
import Button from 'src/components/Button'
import Metadata from 'src/components/Metadata'
import QuantityField from 'src/components/QuantityField'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { AppContext } from 'src/context/app.context'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

import ConfirmationRemoveCartDialog from './components/ConfirmationRemoveCartDialog'
import ConfirmationRemovePurchaseDialog from './components/ConfirmationRemovePurchaseDialog'

export default function Cart() {
  const { extendedPurchase, setExtendedPurchase } = useContext(AppContext)
  const { data: purchasesCartPendingData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.cartPending }],
    queryFn: () => purchaseApi.getPurchase({ status: purchaseStatus.cartPending as PurchaseListStatus }),
    staleTime: 3 * 60 * 1000
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess() {
      refetch()
    }
  })
  const buyPurchaseMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess(data) {
      refetch()
      toast.success(data.data.message, { autoClose: 300 })
    }
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess() {
      refetch()
    }
  })

  // Nhận state của navigate từ ProductDetail
  const location = useLocation()
  const purchaseIdFromLocation = (location.state as { purchaseId: string | null })?.purchaseId

  const purchaseCartPending = purchasesCartPendingData?.data.data
  const totalPurchases = useMemo(
    () => extendedPurchase.reduce((total, purchase) => total + purchase.buy_count, 0),
    [extendedPurchase]
  )
  const isAllChecked = useMemo(() => extendedPurchase.every((purchase) => purchase.checked), [extendedPurchase])
  const isSomeChecked = useMemo(() => extendedPurchase.some((purchase) => purchase.checked), [extendedPurchase])
  const checkedPurchases = useMemo(() => extendedPurchase.filter((purchase) => purchase.checked), [extendedPurchase])
  const checkedPurchasesPriceBeforeDiscount = useMemo(
    () =>
      checkedPurchases.reduce(
        (totalPrice, purchase) => totalPrice + purchase.buy_count * purchase.price_before_discount,
        0
      ),
    [checkedPurchases]
  )
  const checkedPurchasesPriceDiscount = useMemo(
    () =>
      checkedPurchases.reduce(
        (totalPrice, purchase) => totalPrice + purchase.buy_count * (purchase.price_before_discount - purchase.price),
        0
      ),
    [checkedPurchases]
  )

  useEffect(() => {
    setExtendedPurchase((prev) => {
      const extendedPurchaseObject = keyBy(prev, '_id')
      return (
        purchaseCartPending?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: purchase._id === purchaseIdFromLocation || extendedPurchaseObject[purchase._id]?.checked
        })) || []
      )
    })
  }, [purchaseCartPending, purchaseIdFromLocation])

  // useEffect(() => {
  //   return () => window.history.replaceState(null, '')
  // }, [])

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchase((prev) =>
      prev.map((purchase) => {
        return { ...purchase, checked: !isAllChecked }
      })
    )
  }

  const throttledHandleDeleteRef = useRef<(id: string) => void>(() => {})
  useEffect(() => {
    throttledHandleDeleteRef.current = throttle(
      (purchaseId: string) => {
        deletePurchaseMutation.mutate([purchaseId])
      },
      3000,
      { leading: true, trailing: false }
    )
  }, [])

  const throttledHandleDeleteAllRef = useRef<() => void>(() => {})
  useEffect(() => {
    throttledHandleDeleteAllRef.current = throttle(
      () => {
        const purchaseIds = extendedPurchase.map((purchase) => purchase._id)
        deletePurchaseMutation.mutate(purchaseIds)
      },
      3000,
      { leading: true, trailing: false }
    )
  }, [extendedPurchase])

  const throttledHandleBuyPurchasesRef = useRef<() => void>(() => {})
  useEffect(() => {
    throttledHandleBuyPurchasesRef.current = throttle(
      () => {
        const body = checkedPurchases.map((purchase) => ({
          product_id: purchase.product._id,
          buy_count: purchase.buy_count
        }))
        if (body.length > 0) {
          buyPurchaseMutation.mutate(body)
        }
      },
      3000,
      { leading: true, trailing: false }
    )
  }, [checkedPurchases])

  const handleQuantity = (purchaseIndex: number, value: number) => {
    const purchase = extendedPurchase[purchaseIndex]
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].disabled = true
      })
    )
    updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
  }

  return (
    <>
      <Metadata
        title='Giỏ hàng'
        content='Xem danh sách sản phẩm bạn đã chọn mua, cập nhật số lượng hoặc tiến hành thanh toán.'
      />
      <div className='bg-white container'>
        <div className='grid grid-cols-1 lg:grid-cols-12 lg:gap-6 mx-4 md:mx-6 lg:mx-10 xl:mx-15 mb-5'>
          <div className='lg:col-span-8'>
            <div className='mt-4 mb-[10px] md:mb-3.5 text-[20px] md:text-3xl font-bold'>Giỏ hàng</div>
            {purchaseCartPending && purchaseCartPending?.length === 0 && (
              <div className='mt-[10px] mb-[50px] flex flex-col items-center'>
                <div className='text-lg font-bold mb-[30px]'>Giỏ hàng đang trống</div>
                <div className='flex justify-center items-center w-full h-full'>
                  <img
                    className=' w-[287px] aspect-287/200 md:w-[399px] md:aspect-399/300 lg:w-[443px] lg:aspect-443/340 object-contain'
                    src='https://contents.mediadecathlon.com/s1069005/k$adcac81ed2e6e39ceacac52937f221c3/apacc%20vp%20woman%20mat.png?format=auto'
                    alt='empty-cart'
                  />
                </div>
              </div>
            )}
            {purchaseCartPending && purchaseCartPending?.length > 0 && (
              <>
                <div className='p-4 md:p-6 flex justify-between items-center border border-[#e1e0df]'>
                  <div className='flex items-center gap-4'>
                    <div className='relative inline-flex items-center'>
                      <input
                        type='checkbox'
                        aria-label='Chọn tất cả sản phẩm'
                        checked={isAllChecked}
                        onChange={handleCheckAll}
                        className='appearance-none cursor-pointer w-5 h-5 border-1 bg-white checked:bg-blue checked:border-transparent checked:outline-3 checked:outline-[#e1e3f5] peer'
                      />
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.8}
                        stroke='currentColor'
                        className='size-3.5 text-white absolute left-1/2 -translate-x-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
                      </svg>
                    </div>
                    <div>Chọn tất cả sản phẩm</div>
                  </div>
                  <ConfirmationRemoveCartDialog
                    isPending={deletePurchaseMutation.isPending}
                    totalPurchases={totalPurchases}
                    handleDeleteAll={() => throttledHandleDeleteAllRef.current()}
                  />
                </div>
                <div className='px-4 py-2 lg:mb-10 md:px-6 md:py-4 border-x border-b border-[#e1e0df]'>
                  {extendedPurchase?.map((purchase, index) => (
                    <motion.div
                      key={purchase._id}
                      className='pt-6 pb-5 md:pb-6 border-b border-[#e1e0df] last:border-b-0 grid grid-cols-[20px_1fr] md:grid-cols-[20px_3fr_1fr] gap-4'
                      initial={{ opacity: 1 }}
                      animate={!purchase.disabled ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                      transition={!purchase.disabled ? { duration: 0.15 } : { duration: 0 }}
                    >
                      <div className='flex flex-col md:justify-center'>
                        <div className='relative inline-flex items-center'>
                          <input
                            aria-label={`Chọn sản phẩm ${purchase.product.name}`}
                            type='checkbox'
                            checked={purchase.checked ?? false}
                            onChange={handleCheck(index)}
                            className='appearance-none cursor-pointer w-5 h-5 border-1 bg-white checked:bg-blue checked:border-transparent peer'
                          />
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.8}
                            stroke='currentColor'
                            className='size-3.5 text-white absolute left-1/2 -translate-x-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
                          </svg>
                        </div>
                      </div>
                      <div className='grid grid-cols-[auto_1fr] gap-[18px]'>
                        <Link
                          to={`${path.home}${generateNameId(purchase.product.name, purchase.product._id)}`}
                          className='aspect-1/1 w-[90px] md:w-[135px] lg:w-[164px] relative'
                        >
                          <img
                            className='absolute w-full h-full object-cover'
                            src={purchase.product.image}
                            alt={purchase.product.name}
                          />
                        </Link>
                        <div>
                          <div className='flex flex-col md:flex-row gap-1 md:gap-3.5'>
                            <div className='font-medium'>{formatCurrency(purchase.price)}&nbsp;₫</div>
                            <div className='flex items-center gap-1.5'>
                              <div className='text-xs line-through decoration-[#616161] text-[#616161] font-normal'>
                                {formatCurrency(purchase.price_before_discount)}&nbsp;₫
                              </div>
                              <div className='bg-[#ffcd4e] text-xs px-1 py-[2px] heading-4'>
                                -
                                {Math.floor(
                                  ((purchase.price_before_discount - purchase.price) / purchase.price_before_discount) *
                                    100
                                )}
                                %
                              </div>
                            </div>
                          </div>
                          <div className='mt-3'>
                            <Link
                              to={`${path.home}${generateNameId(purchase.product.name, purchase.product._id)}`}
                              className='text-xs md:text-sm line-clamp-3'
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                          <div className='mt-0 md:hidden'>
                            <div className='flex flex-col mt-3 gap-3'>
                              <QuantityField
                                isCart={true}
                                maxQuantity={purchase.product.quantity}
                                quantity={purchase.buy_count}
                                handleQuantity={(value) => handleQuantity(index, value)}
                                disabled={purchase.disabled}
                              />
                              <ConfirmationRemovePurchaseDialog
                                isPending={deletePurchaseMutation.isPending}
                                purchase={purchase}
                                handleDelete={() => throttledHandleDeleteRef.current(purchase._id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='hidden md:flex flex-col justify-between items-end'>
                        <QuantityField
                          isCart={true}
                          maxQuantity={purchase.product.quantity}
                          quantity={purchase.buy_count}
                          handleQuantity={(value) => handleQuantity(index, value)}
                          disabled={purchase.disabled}
                        />
                        <ConfirmationRemovePurchaseDialog
                          isPending={deletePurchaseMutation.isPending}
                          purchase={purchase}
                          handleDelete={() => throttledHandleDeleteRef.current(purchase._id)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className='flex flex-col gap-6 mt-6 mb-10 lg:mt-[66px] lg:col-span-4 h-fit'>
            <div className='p-4 bg-[#f5f4f5]'>
              <div className='flex flex-col gap-5'>
                <div className='font-bold text-[20px]'>Tóm tắt đơn hàng</div>
                <div className='flex flex-col gap-3'>
                  <div className='flex items-center justify-between'>
                    <span>Tạm tính</span>
                    {checkedPurchasesPriceBeforeDiscount ? (
                      <span>{formatCurrency(checkedPurchasesPriceBeforeDiscount)}&nbsp;₫</span>
                    ) : (
                      <span className='text-sm'>-</span>
                    )}
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Giảm giá sản phẩm</span>
                    {checkedPurchasesPriceDiscount ? (
                      <span>{formatCurrency(checkedPurchasesPriceDiscount)}&nbsp;₫</span>
                    ) : (
                      <span className='text-sm'>-</span>
                    )}
                  </div>
                  <div className='flex items-center justify-between font-bold text-lg'>
                    <span>Tổng</span>
                    {checkedPurchasesPriceBeforeDiscount ? (
                      <span>
                        {formatCurrency(checkedPurchasesPriceBeforeDiscount - checkedPurchasesPriceDiscount)}&nbsp;₫
                      </span>
                    ) : (
                      <span className='font-extrabold'>-</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <Button
                isPending={buyPurchaseMutation.isPending}
                disabled={!isSomeChecked}
                onClick={() => throttledHandleBuyPurchasesRef.current()}
                className='py-3 px-6 bg-blue hover:bg-blue-hard text-white uppercase font-medium text-sm transition-all duration-300 ease-in-out'
              >
                Mua hàng
              </Button>
              <Link
                to={path.home}
                className='py-3 px-6 border text-center font-medium uppercase text-sm transition-all duration-300 ease-in-out hover:bg-blue-soft'
              >
                Chọn thêm sản phẩm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
