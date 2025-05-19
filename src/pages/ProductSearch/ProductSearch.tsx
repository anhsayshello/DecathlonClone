import { Dialog } from '@base-ui-components/react/dialog'
import { Popover } from '@base-ui-components/react/popover'
import { Progress } from '@base-ui-components/react/progress'
import { FloatingOverlay, FloatingPortal, useClick, useFloating, useInteractions } from '@floating-ui/react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import omit from 'lodash/omit'
import { useContext, useMemo, useRef, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router'
import categoryApi from 'src/api/category.api'
import productApi from 'src/api/product.api'
import BasePopover from 'src/components/BasePopover'
import Button from 'src/components/Button'
import Metadata from 'src/components/Metadata'
import ProductCard from 'src/components/ProductCard'
import path from 'src/constants/path'
import { AppContext } from 'src/context/app.context'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductQueryParams } from 'src/types/product.type'

import CategoryFilter from './components/CategoryFilter'
import CollapsibleFilter from './components/CollapsibleFilter'
import ProductSort from './components/ProductSort'
import RatingStars from './components/RatingStars'

export default function ProductSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const { viewport } = useContext(AppContext)
  const [loadMore, setLoadMore] = useState(10)
  const anchorRef = useRef(null)
  const containerWidthRef = useRef<HTMLDivElement | null>(null)
  const queryConfig = useQueryConfig()
  const { data: dataProductSearch } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductQueryParams),
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  })
  const productSearch = dataProductSearch?.data.data

  const handleLoadMore = () => {
    setLoadMore((prev) => prev + 10)
  }
  const currentShowProduct = useMemo(() => {
    return productSearch?.products.slice(0, loadMore)
  }, [loadMore, productSearch])

  const { data: dataCategory } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories()
  })

  const navigate = useNavigate()
  const handleRemoveFilter = () => {
    navigate({
      pathname: path.productSearch,
      search: createSearchParams(omit(queryConfig, ['category', 'rating_filter'])).toString()
    })
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen
  })
  const click = useClick(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([click])
  const handleClose = () => {
    setIsOpen(false)
  }

  if (!productSearch) return null
  return (
    <>
      <Metadata title='Kết quả tìm kiếm' content='Xem các sản phẩm phù hợp với từ khoá tìm kiếm của bạn.' />
      <div className='bg-white container'>
        {productSearch.products.length > 0 && (
          <>
            <div ref={anchorRef} className='py-[14px] px-4 lg:px-10 lg:pb-0'>
              <div className='text-lg font-bold'>Kết quả phù hợp</div>
              <div className='my-[15px]'>
                <div className='lg:flex lg:items-center lg:justify-between'>
                  <div>
                    <span className='heading-7 text-lg font-bold lg:text-3xl'>{queryConfig.name}</span>
                    <span className='ml-4 text-[#a1a1a1] text-[10px] md:text-xs lg:text-lg'>
                      {productSearch.products.length} Kết quả
                    </span>
                  </div>
                  <div className='flex justify-between items-center md:justify-end text-xs md:text-sm font-bold h-10'>
                    <div className='mr-3'>
                      <span className='text-blue ml-1.5'>{productSearch.products.length}</span>
                      <span className='ml-2'>Sản phẩm</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      {!viewport.desktop && (
                        <>
                          <div>
                            <div ref={refs.setReference} {...getReferenceProps()}>
                              <div className='flex items-center gap-1'>
                                <svg
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='16'
                                  height='16'
                                  strokeWidth='1.5'
                                  aria-hidden='true'
                                >
                                  <path
                                    d='M2.75 4.75H21.25M8.75 19.25H15.25M5.75 12H18.25'
                                    stroke='currentColor'
                                    strokeLinecap='square'
                                  ></path>
                                </svg>
                                <div>Bộ lọc</div>
                              </div>
                            </div>
                            {isOpen && (
                              <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                                <FloatingPortal>
                                  <FloatingOverlay lockScroll>
                                    <div className='fixed inset-0'>
                                      <div className='bg-white w-full h-full absolute top-15'>
                                        <div className='px-6 pt-4 mb-7 flex justify-between items-center'>
                                          <div className='text-[28px] font-bold'>Bộ lọc</div>
                                          <button onClick={handleClose}>
                                            <svg
                                              xmlns='http://www.w3.org/2000/svg'
                                              fill='none'
                                              viewBox='0 0 24 24'
                                              strokeWidth={1.5}
                                              stroke='currentColor'
                                              className='size-6'
                                            >
                                              <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M6 18 18 6M6 6l12 12'
                                              />
                                            </svg>
                                          </button>
                                        </div>
                                        <div className='mt-0'>
                                          <CollapsibleFilter title='Loại sản phẩm'>
                                            <div className='px-6'>
                                              <CategoryFilter
                                                queryConfig={queryConfig}
                                                categories={dataCategory?.data.data || []}
                                              />
                                            </div>
                                          </CollapsibleFilter>
                                        </div>
                                        <div className='mt-0'>
                                          <CollapsibleFilter title='Rating'>
                                            <div className='px-6'>
                                              <RatingStars queryConfig={queryConfig} />
                                            </div>
                                          </CollapsibleFilter>
                                        </div>
                                      </div>
                                      <div className='absolute bottom-6 left-5 right-5 flex items-center gap-2 text-sm'>
                                        <Button
                                          disabled={!queryConfig.category && !queryConfig.rating_filter}
                                          onClick={handleRemoveFilter}
                                          className={classNames('flex-1 px-2 py-3 uppercase text-blue', {
                                            'opacity-40': !queryConfig.category && !queryConfig.rating_filter
                                          })}
                                        >
                                          xóa tất cả
                                        </Button>
                                        <button
                                          onClick={handleClose}
                                          className='flex-1 px-2 py-3 uppercase text-white bg-blue'
                                        >
                                          áp dụng
                                        </button>
                                      </div>
                                    </div>
                                  </FloatingOverlay>
                                </FloatingPortal>
                              </div>
                            )}
                          </div>
                          <BasePopover
                            trigger={
                              <div className='flex items-center gap-1'>
                                <svg
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='16'
                                  height='16'
                                  strokeWidth='1.5'
                                  aria-hidden='true'
                                >
                                  <path
                                    d='M2.69995 8.3L7.19995 3.8M7.19995 3.8L11.7 8.3M7.19995 3.8V21M12.2 15.7L16.7 20.2L21.2 15.7M16.8 3V20.2'
                                    stroke='currentColor'
                                  ></path>
                                </svg>
                                <div>Sắp xếp theo</div>
                              </div>
                            }
                          >
                            <div className='w-full h-[60%] px-6 absolute bottom-0 bg-white'>
                              <div className='mt-7 mb-8 flex justify-between'>
                                <div className='text-lg font-bold'>Sắp xếp theo</div>
                                <Dialog.Close className='px-5'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={2}
                                    stroke='currentColor'
                                    className='size-5'
                                  >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                                  </svg>
                                </Dialog.Close>
                              </div>
                              <div className='mt-1'>
                                <ProductSort queryConfig={queryConfig} />
                              </div>
                            </div>
                          </BasePopover>
                        </>
                      )}
                      {viewport.desktop && (
                        <Popover.Root>
                          <Popover.Trigger
                            render={
                              <div className='flex items-center gap-1 cursor-pointer'>
                                <svg
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='16'
                                  height='16'
                                  strokeWidth='1.5'
                                  aria-hidden='true'
                                >
                                  <path
                                    d='M2.69995 8.3L7.19995 3.8M7.19995 3.8L11.7 8.3M7.19995 3.8V21M12.2 15.7L16.7 20.2L21.2 15.7M16.8 3V20.2'
                                    stroke='currentColor'
                                  ></path>
                                </svg>
                                <div>Sắp xếp theo</div>
                              </div>
                            }
                          />
                          <Popover.Portal>
                            <Popover.Positioner align='end'>
                              <Popover.Popup>
                                <div className='bg-white py-6 px-6 rounded-[20px] border-[0.8px] border-[#e1e0df]'>
                                  <ProductSort queryConfig={queryConfig} />
                                </div>
                              </Popover.Popup>
                            </Popover.Positioner>
                          </Popover.Portal>
                        </Popover.Root>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='lg:grid lg:grid-cols-[2.5fr_9.5fr] gap-[26px] lg:px-10'>
              {viewport.desktop && (
                <div>
                  <div className='py-6 border-b border-[#f1f3f3]'>
                    <div className='flex items-center gap-2'>
                      <svg
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        strokeWidth='1.5'
                        aria-hidden='true'
                      >
                        <path
                          d='M2.75 4.75H21.25M8.75 19.25H15.25M5.75 12H18.25'
                          stroke='currentColor'
                          strokeLinecap='square'
                        ></path>
                      </svg>
                      <div className='uppercase'>Bộ lọc</div>
                    </div>
                  </div>
                  <div className='pb-6 border-b border-[#f1f3f3]'>
                    <div className='mt-3 mb-3 uppercase font-bold text-sm'>chọn loại sản phẩm</div>
                    <CategoryFilter queryConfig={queryConfig} categories={dataCategory?.data.data || []} />
                  </div>
                  <div className='pb-6 border-b border-[#f1f3f3]'>
                    <div className='mt-3 mb-3 uppercase font-bold text-sm'>Rating</div>
                    <RatingStars queryConfig={queryConfig} />
                  </div>
                  <div className='mt-6'>
                    <Button
                      disabled={!queryConfig.category && !queryConfig.rating_filter}
                      onClick={handleRemoveFilter}
                      className='px-10 py-2 uppercase text-sm text-white bg-blue hover:bg-blue-hard'
                    >
                      Xóa bộ lọc
                    </Button>
                  </div>
                </div>
              )}
              <div>
                <div
                  ref={containerWidthRef}
                  className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6'
                >
                  {currentShowProduct &&
                    currentShowProduct.map((product) => (
                      <div key={product._id} className='col-span-1 flex justify-center'>
                        <ProductCard product={product} />
                      </div>
                    ))}
                </div>
                <div className='mt-10 px-4 mb-6'>
                  <div className='flex flex-col md:flex-row'>
                    <div className='md:flex-1'></div>
                    <div className='flex flex-col items-center md:flex-1'>
                      <div className='text-xs lg:text-base'>
                        Bạn đã xem
                        <span className='font-semibold'>{' ' + currentShowProduct?.length + ' '}</span>
                        trên
                        <span className='font-semibold'>{' ' + productSearch.products.length + ' '}</span>
                        sản phẩm
                      </div>
                      <div className='my-4'>
                        <Progress.Root
                          className='grid w-60 grid-cols-2 gap-y-2'
                          value={currentShowProduct?.length || 0}
                          max={productSearch.products.length}
                          aria-label='progress'
                        >
                          <Progress.Track className='col-span-full h-[3.5px] overflow-hidden bg-[#d9dde1] shadow-[inset_0_0_0_1px] shadow-gray-200'>
                            <Progress.Indicator className='block bg-blue transition-all duration-500' />
                          </Progress.Track>
                        </Progress.Root>
                      </div>
                      {productSearch.products.length > 10 &&
                        currentShowProduct &&
                        currentShowProduct.length < productSearch.products.length && (
                          <button
                            aria-label='xem thêm'
                            onClick={handleLoadMore}
                            className='py-1.5 lg:py-2 px-5 bg-white hover:bg-[#e1e3f5] lg:text-sm cursor-pointer border-[0.8px] border-[#949494] text-xs uppercase rounded-full'
                          >
                            xem thêm
                          </button>
                        )}
                    </div>
                    <div className='flex justify-end md:flex-1'>
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <button
                          aria-label='back-to-heading'
                          onClick={handleScrollToTop}
                          className='border border-[#e1e0df] hover:border-[#949494] cursor-pointer rounded-full p-1 md:p-4'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={2}
                            stroke='currentColor'
                            className='size-4 md:size-4.5'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 15.75 7.5-7.5 7.5 7.5' />
                          </svg>
                        </button>
                        <div className='text-[10px]'>Quay lại đầu trang</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {productSearch.products.length === 0 && (
          <div className='pt-4 pl-[22px] pb-[14px]'>
            <div className='mt-4 mr-10 font-bold text-lg flex justify-center items-center leading-6.5'>
              <span>
                {'Không có kết quả cho '}
                <span className='text-[28px] md:text-2xl'>{queryConfig.name}</span>
                {'. Vui lòng thử lại.'}
              </span>
            </div>
            <div className='my-8 mr-10'>
              <div className='w-full h-full flex justify-center'>
                <img
                  className='xs:max-w-110 px-2'
                  src='https://contents.mediadecathlon.com/s1069008/k$bc60d654ba2ab05d7b370c7ae5504979/468pt514/936xcr712/apacc_vp_roadcycling-man.png?format=auto'
                  alt='no-result'
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
