import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import DOMPurify from 'dompurify'
import { useContext, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router'
import productApi from 'src/api/product.api'
import purchaseApi from 'src/api/purchase.api'
import AlerDialog from 'src/components/AlerDialog'
import Button from 'src/components/Button'
import Carousel from 'src/components/Carousel'
import Metadata from 'src/components/Metadata'
import ProductCard from 'src/components/ProductCard'
import QuantityField from 'src/components/QuantityField'
import ScrollButton from 'src/components/ScrollButton'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { AppContext } from 'src/context/app.context'
import { ProductQueryParams } from 'src/types/product.type'
import { formatCurrency, getIdFromNameId } from 'src/utils/utils'

import PopoverCartSuccess from './components/PopoverCartSuccess'

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const [isExpanded, setIsExpanded] = useState(false)
  const [purchaseId, setPurchaseId] = useState('')
  const { isAuthenticated, viewport } = useContext(AppContext)
  const scrollRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: dataProductDetail } = useQuery({
    queryKey: ['id', id],
    queryFn: () => productApi.getProductDetail(id)
  })
  const productDetail = dataProductDetail?.data.data

  const queryConfig = { page: 1, limit: 15, category: productDetail?.category._id }
  const { data: dataProductCategory } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductQueryParams),
    enabled: Boolean(productDetail),
    staleTime: 3 * 60 * 1000
  })
  const productCategory = dataProductCategory?.data.data

  const imageGallery = useMemo(() => {
    return !isExpanded && productDetail ? productDetail.images.slice(0, 4) : productDetail && productDetail.images
  }, [isExpanded, productDetail])

  const handleShowProduct = () => {
    if (isExpanded) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    setIsExpanded((prev) => !prev)
  }

  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })
  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { product_id: productDetail?._id as string, buy_count: quantity },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ['purchases', { status: purchaseStatus.cartPending }]
          })
          setPurchaseId(data.data.data._id)
        }
      }
    )
  }

  const handleQuantity = (value: number) => {
    setQuantity(value)
  }

  const handleCartReset = () => {
    addToCartMutation.reset()
  }

  if (!productDetail) return null
  return (
    <>
      <Metadata title={productDetail.name as string | 'Chi tiết sản phẩm'} content={productDetail.description} />
      <div className='bg-[#f5f4f5] pb-2 container'>
        <div className='flex flex-col lg:flex-row lg:items-start lg:px-25 xl:px-32 '>
          <div className='md:hidden'>
            <Carousel
              arrows={true}
              dots={false}
              children={productDetail.images.map((image) => {
                return (
                  <div key={image} className='text-center pt-[100%] w-full relative'>
                    <img
                      src={image}
                      className='absolute inset-0 h-full w-full text-transparent bg-no-repeat bg-contain'
                      alt={image}
                    />
                  </div>
                )
              })}
            />
          </div>
          <div className='hidden md:block lg:flex-1'>
            <div className='px-6 py-6 bg-[#f5f4f5] grid grid-cols-2 gap-4 xl:gap-6'>
              {(imageGallery || []).map((image) => (
                <div key={image} className='col-span-1 aspect-1/1 w-full h-full relative'>
                  <img className='absolute w-full h-full object-cover' src={image} alt={image} />
                </div>
              ))}
            </div>
            {productDetail.images.length > 4 ? (
              <div className='flex justify-center mt-2 mb-4'>
                <button
                  aria-label={isExpanded ? 'thu gọn' : 'xem thêm'}
                  onClick={handleShowProduct}
                  className='py-2 px-5 bg-white hover:bg-[#e1e3f5] cursor-pointer border-[0.8px] border-[#949494] text-xs font-medium uppercase rounded-full'
                >
                  {isExpanded ? 'thu gọn' : 'xem thêm'}
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='px-6 pt-3 pb-6 md:py-6 lg:w-[380px] xl:w-[420px] lg:border-[2px] lg:border-[#e1e0df] bg-white lg:mt-6 lg:ml-1 xl:ml-4'>
            <div className='flex justify-between items-center'>
              {productDetail.sold > 100 ? (
                <div className='h-[22px] flex justify-center items-center px-2 py-[2px] bg-[#ffcd4e] uppercase font-bold text-[11px]'>
                  sale
                </div>
              ) : (
                <div className='h-[22px] flex justify-center items-center px-2 py-[2px] bg-[#e1e3f5] uppercase font-bold text-[11px]'>
                  sản phẩm mới
                </div>
              )}
              <div className='flex items-center bg-[#f7f8f9] px-2 py-1 text-[11px]'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  aria-hidden='true'
                  color='var(--vp-semantic-color-content-neutral)'
                >
                  <path
                    d='M12 15.9L16.8 19.3L15 13.7L19.7 10.3H13.8L12 4.70001L10.2 10.3H4.30005L9.00005 13.7L7.20005 19.3L12 15.9Z'
                    fill='currentColor'
                    stroke='currentColor'
                  ></path>
                </svg>
                <div className='font-medium mx-1'>{Math.floor(productDetail.rating * 10) / 10}</div>
                <div className='text-[#616161] font-medium'>({productDetail.sold})</div>
              </div>
            </div>
            <div className='mt-2'>
              <div className='font-bold text-lg line-clamp-2'>{productDetail.name}</div>
            </div>
            <div className='my-2'>
              <div className='flex items-center font-semibold gap-3'>
                <div className='text-[22px]'>{formatCurrency(productDetail.price)}&nbsp;₫</div>
                <div className='flex flex-col gap-0.5'>
                  <div className='text-xs line-through decoration-[#616161] decoration-auto text-[#616161] font-normal'>
                    {formatCurrency(productDetail.price_before_discount)}&nbsp;₫
                  </div>
                  <div className='bg-[#ffcd4e] text-xs px-1 py-[2px] heading-4 font-normal w-10'>
                    -
                    {Math.floor(
                      ((productDetail.price_before_discount - productDetail.price) /
                        productDetail.price_before_discount) *
                        100
                    )}
                    %
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <div className='mb-2 lg:mb-3'>Số lượng:</div>
              <QuantityField handleQuantity={handleQuantity} quantity={quantity} maxQuantity={productDetail.quantity} />
              {!viewport.desktop && (
                <div className='fixed z-10 bottom-0 left-0 flex flex-col justify-around px-6 py-4 bg-white w-full'>
                  <div className='grid grid-cols-2 xs:grid-cols-3 gap-4 mb-4'>
                    <div className='col-span-1 xs:col-span-2 truncate font-bold'>{productDetail.name}</div>
                    <div className='col-span-1 text-[22px] font-semibold text-right'>
                      {formatCurrency(productDetail.price)}&nbsp;₫
                    </div>
                  </div>
                  {isAuthenticated ? (
                    <Button
                      isPending={addToCartMutation.isPending}
                      disabled={addToCartMutation.isPending}
                      onClick={handleAddToCart}
                      className='uppercase bg-blue px-6 py-2.5 w-full text-white text-sm font-medium'
                    >
                      Thêm vào giỏ
                    </Button>
                  ) : (
                    <AlerDialog
                      trigger={
                        <button
                          aria-label='Thêm vào giỏ'
                          className='uppercase bg-blue px-6 py-2.5 w-full text-white text-sm font-medium'
                        >
                          Thêm vào giỏ
                        </button>
                      }
                      title='Thêm sản phẩm vào giỏ hàng?'
                      pathName={path.login}
                    />
                  )}
                </div>
              )}
              {viewport.desktop &&
                (isAuthenticated ? (
                  <Button
                    isPending={addToCartMutation.isPending}
                    disabled={addToCartMutation.isPending}
                    onClick={handleAddToCart}
                    className='mt-8 uppercase bg-blue hover:bg-blue-hard transition-all duration-350 ease-in-out cursor-pointer px-6 py-2.5 w-full text-white text-sm font-medium'
                  >
                    Thêm vào giỏ
                  </Button>
                ) : (
                  <AlerDialog
                    trigger={
                      <button
                        aria-label='Thêm vào giỏ'
                        className='mt-8 uppercase bg-blue hover:bg-blue-hard transition-all duration-350 ease-in-out cursor-pointer px-6 py-2.5 w-full text-white text-sm font-medium'
                      >
                        Thêm vào giỏ
                      </button>
                    }
                    title='Thêm sản phẩm vào giỏ hàng?'
                    pathName={path.login}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className='py-7 px-[10px] md:px-6 lg:px-[15px]'>
          <div className='py-5 px-4 md:px-6 bg-white'>
            <div className='mb-1 text-xl font-bold'>Mô tả</div>
            <div className='mt-3 pb-3 text-sm leading-loose wrap-break-word'>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.description) }} />
            </div>
          </div>
        </div>
        <div className='pt-0.5 bg-white'>
          <div className='my-5 ml-6 md:ml-7 lg:mx-8 relative'>
            <div
              className={classNames('hidden', {
                'lg:block': productCategory && productCategory.products.length > 4,
                'xl:hidden': productCategory && productCategory.products.length < 7
              })}
            >
              <ScrollButton scrollRef={scrollRef as React.RefObject<HTMLDivElement>} direction='left' />
              <ScrollButton scrollRef={scrollRef as React.RefObject<HTMLDivElement>} direction='right' />
            </div>

            <div className='font-bold text-xl lg:text-xl mb-5'>Có thể bạn cũng thích</div>

            <div
              ref={scrollRef}
              className='flex items-center gap-4 lg:gap-5 overflow-x-scroll scrollbar-none scroll-smooth touch-pan-x'
            >
              {productCategory &&
                productCategory.products.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>
          </div>
        </div>
      </div>
      <PopoverCartSuccess
        product={productDetail}
        purchaseId={purchaseId}
        handleCartReset={handleCartReset}
        open={addToCartMutation.isSuccess}
      />
    </>
  )
}
