import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { useContext, useRef } from 'react'
import productApi from 'src/api/product.api'
import Metadata from 'src/components/Metadata'
import ProductCard from 'src/components/ProductCard'
import { AppContext } from 'src/context/app.context'
import { ProductQueryParams } from 'src/types/product.type'

import ScrollButton from '../../components/ScrollButton'
import Carousel from './components/CarouselBanner'

export default function ProductList() {
  const { viewport } = useContext(AppContext)
  const { data: dataProduct } = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts({ limit: 45 } as ProductQueryParams),
    staleTime: 3 * 60 * 1000
  })

  const scrollRef1 = useRef<HTMLDivElement>(null)
  const scrollRef2 = useRef<HTMLDivElement>(null)
  const scrollRef3 = useRef<HTMLDivElement>(null)
  return (
    <>
      <Metadata title='Decathlon Clone' content='Khám phá các sản phẩm theo danh mục mà bạn yêu thích.' />
      {dataProduct && (
        <div className='container'>
          <motion.div
            initial={{ y: '25%', opacity: 0.1 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Carousel />
          </motion.div>
          <div>
            <motion.div
              className='mt-4'
              initial={{ y: '40%', opacity: 0.2 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
            >
              <div className='text-lg font-bold mx-6 lg:mx-10 xl:mx-20'>Bộ sưu tập HOT</div>
              <div className='mt-4 ml-6 lg:ml-10 xl:mx-20 flex items-center gap-2 sm:gap-7 md:gap-10 overflow-x-scroll scrollbar-none scroll-smooth touch-pan-x touch-pan-y'>
                <div className='flex flex-col items-center gap-2 min-w-20'>
                  <div className='w-15 h-15 md:w-18 md:h-18 relative rounded-full shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute top-0 right-0'
                      src='https://contents.mediadecathlon.com/s1198664/k$0009c36fd19146757f092fd5613bdb78/Frame%2017.webp'
                      alt='hot-sale'
                    />
                  </div>
                  <div className='text-xs line-clamp-1 break-all sm:truncate'>HOT SALE</div>
                </div>
                <div className='flex flex-col items-center gap-2 min-w-20'>
                  <div className='w-15 h-15 md:w-18 md:h-18 relative rounded-full shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute top-0 right-0'
                      src='https://contents.mediadecathlon.com/s1178117/k$665f5a675e0b3971974abc89bf220de3/BF_circle_golden_hour.webp'
                      alt='good-deal'
                    />
                  </div>
                  <div className='text-xs line-clamp-1 break-all sm:truncate'>Deal hời</div>
                </div>
                <div className='flex flex-col items-center gap-2 min-w-20'>
                  <div className='w-15 h-15 md:w-18 md:h-18 relative rounded-full shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute top-0 right-0'
                      src='https://contents.mediadecathlon.com/s1198674/k$ad9e1839bd42caa599df24d2d0434f2c/Frame%2018.webp'
                      alt='new-product'
                    />
                  </div>
                  <div className='text-xs line-clamp-1 break-all sm:truncate'>Sản phẩm mới</div>
                </div>
                <div className='flex flex-col items-center gap-2 min-w-20'>
                  <div className='w-15 h-15 md:w-18 md:h-18 relative rounded-full shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute top-0 right-0'
                      src='https://contents.mediadecathlon.com/s1216319/k$9e530f6bba7870958d11e5a6caf274f3/Frame%2028%20(2).webp'
                      alt='sun-protective'
                    />
                  </div>
                  <div className='text-xs line-clamp-1 break-all sm:truncate'>Đồ chống nắng</div>
                </div>
                <div className='flex flex-col items-center gap-2 min-w-20'>
                  <div className='w-15 h-15 md:w-18 md:h-18 relative rounded-full shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute top-0 right-0'
                      src='https://contents.mediadecathlon.com/s1198663/k$e551b50b57fee65c825053d1e825d1eb/Frame%2021.webp'
                      alt='sell'
                    />
                  </div>
                  <div className='text-xs line-clamp-1 break-all sm:truncate'>Bán chạy</div>
                </div>
                <div className='flex flex-col items-center gap-2 min-w-20'>
                  <div className='w-15 h-15 md:w-18 md:h-18 relative rounded-full shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute top-0 right-0'
                      src='https://contents.mediadecathlon.com/s1198668/k$20902607b8e24acae41c37c87c0c1857/Frame%2019.webp'
                      alt='freeship'
                    />
                  </div>
                  <div className='text-xs line-clamp-1 break-all sm:truncate'>Freeship từ 449K</div>
                </div>
                <div className='flex flex-col items-center gap-2 min-w-20'>
                  <div className='w-15 h-15 md:w-18 md:h-18 relative rounded-full shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute top-0 right-0'
                      src='https://contents.mediadecathlon.com/s1198666/k$a65246c704b8f3c066ed84537c4c45b6/Frame%2025.webp'
                      alt='man'
                    />
                  </div>
                  <div className='text-xs line-clamp-1 break-all sm:truncate'>Nam</div>
                </div>
                <div className='flex flex-col items-center gap-2 min-w-20'>
                  <div className='w-15 h-15 md:w-18 md:h-18 relative rounded-full shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute top-0 right-0'
                      src='https://contents.mediadecathlon.com/s1198672/k$f65e3884d8d67cf37d4a3c512f971ba5/Frame%2026.webp'
                      alt='woman'
                    />
                  </div>
                  <div className='text-xs line-clamp-1 break-all sm:truncate'>Nữ</div>
                </div>
                <div className='flex flex-col items-center gap-2 min-w-20'>
                  <div className='w-15 h-15 md:w-18 md:h-18 relative rounded-full shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute top-0 right-0'
                      src='https://contents.mediadecathlon.com/s1198665/k$9545a136e1a708c41373bc420e0eb203/Frame%2027.webp'
                      alt='kid'
                    />
                  </div>
                  <div className='text-xs line-clamp-1 break-all sm:truncate'>Trẻ em</div>
                </div>
                <div className='flex flex-col items-center gap-2 min-w-20'>
                  <div className='w-15 h-15 md:w-18 md:h-18 relative rounded-full shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute top-0 right-0'
                      src='https://contents.mediadecathlon.com/s1198673/k$dc57f128e42faed729cb60ef13cd3c11/Frame%2020.webp'
                      alt='bicycle'
                    />
                  </div>
                  <div className='text-xs line-clamp-1 break-all sm:truncate'>Xe đạp</div>
                </div>
                <div className='flex flex-col items-center gap-2 min-w-20'>
                  <div className='w-15 h-15 md:w-18 md:h-18 relative rounded-full shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute top-0 right-0'
                      src='https://contents.mediadecathlon.com/s1198669/k$52a78e1e35ed88dfe5b91032154c8f70/Frame%2022.webp'
                      alt='backpack'
                    />
                  </div>
                  <div className='text-xs line-clamp-1 break-all sm:truncate'>Balo & Túi</div>
                </div>
                <div className='flex flex-col items-center gap-2 min-w-20'>
                  <div className='w-15 h-15 md:w-18 md:h-18 relative rounded-full shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute top-0 right-0'
                      src='https://contents.mediadecathlon.com/s1198662/k$9d8c2264a7f52a626938cd7ccc219467/Frame%2023.webp'
                      alt='accessory'
                    />
                  </div>
                  <div className='text-xs line-clamp-1 break-all sm:truncate'>Phụ kiện</div>
                </div>
              </div>
            </motion.div>
          </div>
          <div>
            <motion.div
              className='mt-6 mb-3 ml-6 lg:my-6 lg:mx-10 xl:mx-20 relative'
              initial={{ y: '20%', opacity: 0.2 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
            >
              {viewport.desktop && (
                <div>
                  <ScrollButton scrollRef={scrollRef1 as React.RefObject<HTMLDivElement>} direction='left' />
                  <ScrollButton scrollRef={scrollRef1 as React.RefObject<HTMLDivElement>} direction='right' />
                </div>
              )}
              <div className='font-semibold text-lg lg:text-xl mb-1'>Sản phẩm bán chạy nhất</div>

              <div
                ref={scrollRef1}
                className='flex items-center gap-4 lg:gap-5 overflow-x-scroll scrollbar-none scroll-smooth touch-pan-x touch-pan-y'
              >
                {dataProduct?.data.data.products
                  .slice(0, 15)
                  .map((product) => <ProductCard key={product._id} product={product} />)}
              </div>
            </motion.div>
          </div>
          <div>
            <motion.div
              className='mt-3 mb-3 ml-6 lg:my-6 lg:mx-10 xl:mx-20'
              initial={{ y: '20%', opacity: 0.2 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
            >
              <div className='font-semibold text-lg lg:text-xl mb-3'>Môn thể thao phổ biến</div>
              <div className='flex items-center gap-4 lg:gap-5 overflow-x-scroll scrollbar-none scroll-smooth touch-pan-x touch-pan-y'>
                <div className='flex flex-col items-center gap-2'>
                  <div className='relative w-30 md:w-[170px] aspect-120/120 md:aspect-170/170 shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute'
                      src='https://contents.mediadecathlon.com/p2675157/k$02e989519504f6afe519a48ec997d520/400x400/4096pt2732/5464xcr5464/NABAIJI%20CN%20SWIMSHORT%20100%20LONG%20CITY%20TURQ.webp'
                      alt='swimming'
                    />
                  </div>
                  <div className='text-sm font-medium'>Bơi lội</div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <div className='relative w-30 md:w-[170px] aspect-120/120 md:aspect-170/170 shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute'
                      src='https://contents.mediadecathlon.com/p2866268/k$43283c0abbd0982fbe61f5f03765b617/2717pt2717/5435xcr5435/KIPRUN%20TS%20RUN%20500%20M%20ANTI-UV%20CARBON%20GREY.webp'
                      alt='running'
                    />
                  </div>
                  <div className='text-sm font-medium'>Chạy bộ</div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <div className='relative w-30 md:w-[170px] aspect-120/120 md:aspect-170/170 shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute'
                      src='https://contents.mediadecathlon.com/p2839709/k$3c6fcc7a9b4ad542efa1c4b1ede3bf76/400x400/3667pt2229/4458xcr4458/QUECHUA%20JACKET%20MH150%20MEN%20GREY%20GREY.jpg?format=auto'
                      alt='trekking'
                    />
                  </div>
                  <div className='text-sm font-medium'>Leo núi/Trekking</div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <div className='relative w-30 md:w-[170px] aspect-120/120 md:aspect-170/170 shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute'
                      src='https://contents.mediadecathlon.com/p2737897/k$646c35536d05e6017728e2054053a09a/400x400/2616pt4614/5233xcr5233/QUECHUA%20CHAUSSURES%20CHAUDES%20SH500%20MID%20H%20NOIR.webp'
                      alt='camping'
                    />
                  </div>
                  <div className='text-sm font-medium'>Cắm trại</div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <div className='relative w-30 md:w-[170px] aspect-120/120 md:aspect-170/170 shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute'
                      src='https://contents.mediadecathlon.com/p2812718/k$0145f2b92d38d906ae3786fd37337648/400x400/2240pt2954/4480xcr4480/DOMYOS%20CN%20STRINGER%20900%20M-C23A%20GR.jpg?format=auto'
                      alt='fitness'
                    />
                  </div>
                  <div className='text-sm font-medium'>Cardio & thể hình</div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <div className='relative w-30 md:w-[170px] aspect-120/120 md:aspect-170/170 shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute'
                      src='https://contents.mediadecathlon.com/p2592304/k$0fefc5539dd6e561295925c4d844b155/2240pt3695/4480xcr4480/BR%20LITE%20%20900%20SET%20PRO%20SS24.webp'
                      alt='badminton'
                    />
                  </div>
                  <div className='text-sm font-medium'>Cầu lông</div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <div className='relative w-30 md:w-[170px] aspect-120/120 md:aspect-170/170 shrink-0'>
                    <img
                      className='w-full h-full object-cover absolute'
                      src='https://contents.mediadecathlon.com/p2707273/k$b2afd7f5cc1e2110d31c07961934d708/400x400/3501pt2493/4987xcr4987/VAN%20RYSEL%20RACER%202%20SS%20JERSEY%20SUBLI%20M%20%20PINKGRADIENT.jpg?format=auto'
                      alt='cycling'
                    />
                  </div>
                  <div className='text-sm font-medium'>Đạp xe</div>
                </div>
              </div>
            </motion.div>
          </div>
          <div>
            <div className='mt-6 mb-3 ml-6 lg:my-6 lg:mx-10 xl:mx-20 relative'>
              {viewport.desktop && (
                <div>
                  <ScrollButton scrollRef={scrollRef2 as React.RefObject<HTMLDivElement>} direction='left' />
                  <ScrollButton scrollRef={scrollRef2 as React.RefObject<HTMLDivElement>} direction='right' />
                </div>
              )}

              <div className='font-semibold text-lg lg:text-xl mb-1'>Quẩn áo sale tới 50%</div>

              <div
                ref={scrollRef2}
                className='flex items-center gap-4 lg:gap-5 overflow-x-scroll scrollbar-none scroll-smooth touch-pan-x touch-pan-y'
              >
                {dataProduct?.data.data.products
                  .slice(16, 30)
                  .map((product) => <ProductCard key={product._id} product={product} />)}
              </div>
            </div>
          </div>
          <motion.div
            className='mt-3 mb-3 ml-6 lg:my-6 lg:mx-10 xl:mx-20'
            initial={{ y: '20%', opacity: 0.2 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
          >
            <div className='font-semibold text-lg lg:text-xl mb-1'>Chuẩn bị cho kì nghỉ lễ</div>
            <div className='flex items-center justify-between overflow-x-scroll scrollbar-none scroll-smooth touch-pan-x touch-pan-y'>
              <div className='mr-3 md:mr-6 w-[294px] h-50 md:w-[352px] md:h-[223px] lg:w-[410px] lg:h-[230px] xl:w-[438px] xl:h-[240px] lg:aspect-410/230 xl:aspect-438/240 md:aspect-352/232 aspect-294/200 relative'>
                <img
                  className='w-full h-full object-cover absolute'
                  src='https://contents.mediadecathlon.com/s1228419/k$ac84da064889d7f877a17c25e0ab9665/camp-small-web-1.webp'
                  alt='camp-small-1'
                />
              </div>
              <div className='mr-3 md:mr-6 w-[294px] h-50 md:w-[352px] md:h-[223px] lg:w-[410px] lg:h-[230px] xl:w-[438px] xl:h-[240px] lg:aspect-410/230 xl:aspect-438/240 md:aspect-352/232 aspect-294/200 relative'>
                <img
                  className='w-full h-full object-cover absolute'
                  src='https://contents.mediadecathlon.com/s1228431/k$beb64d814a0ea6a7242bf1c478d5ea85/camp-small-web-28.webp'
                  alt='camp-small-2'
                />
              </div>
              <div className='w-[294px] h-50 md:w-[352px] md:h-[223px] lg:w-[410px] lg:h-[230px] xl:w-[438px] xl:h-[240px] lg:aspect-410/230 xl:aspect-438/240 md:aspect-352/232 aspect-294/200 relative'>
                <img
                  className='w-full h-full object-cover absolute'
                  src='https://contents.mediadecathlon.com/s1228407/k$9cd30cfa7332fa6a70d884168613ca12/camp-small-web-30.webp'
                  alt='camp-small-3'
                />
              </div>
            </div>
          </motion.div>
          <div>
            <motion.div
              className='mt-6 mb-3 pb-6 ml-6 lg:my-6 lg:mx-10 xl:mx-20 relative'
              initial={{ y: '20%', opacity: 0.2 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
            >
              {viewport.desktop && (
                <div>
                  <ScrollButton scrollRef={scrollRef3 as React.RefObject<HTMLDivElement>} direction='left' />
                  <ScrollButton scrollRef={scrollRef3 as React.RefObject<HTMLDivElement>} direction='right' />
                </div>
              )}

              <div className='font-semibold text-lg lg:text-xl mb-1'>Sản phẩm sale hot nhất</div>

              <div
                ref={scrollRef3}
                className='flex items-center gap-4 lg:gap-5 overflow-x-scroll scrollbar-none scroll-smooth touch-pan-x touch-pan-y'
              >
                {dataProduct?.data.data.products
                  .slice(31, 45)
                  .map((product) => <ProductCard key={product._id} product={product} />)}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  )
}
