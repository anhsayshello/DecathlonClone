import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { useMemo, useRef } from 'react'
import productApi from 'src/apis/product.api'
import Metadata from 'src/components/Metadata'
import ProductCard from 'src/components/ProductCard'
import useViewport from 'src/hooks/useViewport'
import { ProductQueryParams } from 'src/types/product.type'

import ScrollButton from '../../components/ScrollButton'
import Carousel from './components/CarouselBanner'

export default function ProductList() {
  const viewport = useViewport()
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts({ limit: 45 } as ProductQueryParams),
    staleTime: 3 * 60 * 1000
  })
  const dataProducts = useMemo(() => data?.data?.data?.products ?? [], [data])
  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
      }
    },
    stagger: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1
        }
      }
    },
    button: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut', delay: 1.2 }
      }
    }
  }

  const scrollRef1 = useRef<HTMLDivElement>(null)
  const scrollRef2 = useRef<HTMLDivElement>(null)
  const scrollRef3 = useRef<HTMLDivElement>(null)
  return (
    <>
      <Metadata title='Decathlon Clone' content='Khám phá các sản phẩm theo danh mục mà bạn yêu thích.' />
      <div className='container'>
        <motion.div
          initial={{ y: 25, opacity: 0.1 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Carousel />
        </motion.div>
        <div>
          <motion.div
            className='mt-4'
            variants={variants.fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className='text-lg font-bold mx-6 lg:mx-10 xl:mx-20'>Bộ sưu tập HOT</div>
            <div className='mt-4 ml-6 lg:ml-10 xl:mx-20 flex gap-4 sm:gap-7 md:gap-10 overflow-x-auto scrollbar-none scroll-smooth touch-pan-x touch-pan-y'>
              {[
                {
                  src: 'https://contents.mediadecathlon.com/s1198664/k$0009c36fd19146757f092fd5613bdb78/Frame%2017.webp',
                  label: 'HOT SALE'
                },
                {
                  src: 'https://contents.mediadecathlon.com/s1178117/k$665f5a675e0b3971974abc89bf220de3/BF_circle_golden_hour.webp',
                  label: 'Deal hời'
                },
                {
                  src: 'https://contents.mediadecathlon.com/s1198674/k$ad9e1839bd42caa599df24d2d0434f2c/Frame%2018.webp',
                  label: 'Sản phẩm mới'
                },
                {
                  src: 'https://contents.mediadecathlon.com/s1216319/k$9e530f6bba7870958d11e5a6caf274f3/Frame%2028%20(2).webp',
                  label: 'Đồ chống nắng'
                },
                {
                  src: 'https://contents.mediadecathlon.com/s1198663/k$e551b50b57fee65c825053d1e825d1eb/Frame%2021.webp',
                  label: 'Bán chạy'
                },
                {
                  src: 'https://contents.mediadecathlon.com/s1198668/k$20902607b8e24acae41c37c87c0c1857/Frame%2019.webp',
                  label: 'Freeship từ 449K'
                },
                {
                  src: 'https://contents.mediadecathlon.com/s1198666/k$a65246c704b8f3c066ed84537c4c45b6/Frame%2025.webp',
                  label: 'Nam'
                },
                {
                  src: 'https://contents.mediadecathlon.com/s1198672/k$f65e3884d8d67cf37d4a3c512f971ba5/Frame%2026.webp',
                  label: 'Nữ'
                },
                {
                  src: 'https://contents.mediadecathlon.com/s1198665/k$9545a136e1a708c41373bc420e0eb203/Frame%2027.webp',
                  label: 'Trẻ em'
                },
                {
                  src: 'https://contents.mediadecathlon.com/s1198673/k$dc57f128e42faed729cb60ef13cd3c11/Frame%2020.webp',
                  label: 'Xe đạp'
                },
                {
                  src: 'https://contents.mediadecathlon.com/s1198669/k$52a78e1e35ed88dfe5b91032154c8f70/Frame%2022.webp',
                  label: 'Balo & Túi'
                },
                {
                  src: 'https://contents.mediadecathlon.com/s1198662/k$9d8c2264a7f52a626938cd7ccc219467/Frame%2023.webp',
                  label: 'Phụ kiện'
                }
              ].map((item, idx) => (
                <div key={idx} className='flex flex-col items-center gap-2 min-w-20 flex-shrink-0 snap-start'>
                  <div className='w-[60px] h-[60px] md:w-[72px] md:h-[72px] relative rounded-full overflow-hidden shrink-0'>
                    <img
                      className='absolute top-0 right-0 w-full h-full object-cover'
                      loading='lazy'
                      src={item.src}
                      alt={item.label.toLowerCase().replace(/\s+/g, '-')}
                    />
                  </div>
                  <div className='text-xs text-center line-clamp-1 break-words sm:truncate max-w-[80px]'>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div>
          <motion.div
            className='mt-6 mb-3 ml-6 lg:my-6 lg:mx-10 xl:mx-20 relative'
            variants={variants.fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
          >
            {viewport.desktop && (
              <motion.div
                variants={variants.button}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
              >
                <ScrollButton scrollRef={scrollRef1 as React.RefObject<HTMLDivElement>} direction='left' />
                <ScrollButton scrollRef={scrollRef1 as React.RefObject<HTMLDivElement>} direction='right' />
              </motion.div>
            )}
            <div className='font-semibold text-lg lg:text-xl mb-1'>Sản phẩm bán chạy nhất</div>

            <div
              ref={scrollRef1}
              className='flex items-center gap-4 lg:gap-5 overflow-x-scroll scrollbar-none scroll-smooth touch-pan-x touch-pan-y'
            >
              {dataProducts.slice(0, 15).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </motion.div>
        </div>
        <div>
          <motion.div
            variants={variants.fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            className='mt-3 mb-3 ml-6 lg:my-6 lg:mx-10 xl:mx-20'
          >
            <div className='font-semibold text-lg lg:text-xl mb-3'>Môn thể thao phổ biến</div>
            <div className='flex items-center justify-between gap-4 lg:gap-5 overflow-x-scroll scrollbar-none scroll-smooth touch-pan-x touch-pan-y'>
              {[
                {
                  src: 'https://contents.mediadecathlon.com/p2675157/k$02e989519504f6afe519a48ec997d520/400x400/4096pt2732/5464xcr5464/NABAIJI%20CN%20SWIMSHORT%20100%20LONG%20CITY%20TURQ.webp',
                  alt: 'swimming',
                  label: 'Bơi lội'
                },
                {
                  src: 'https://contents.mediadecathlon.com/p2866268/k$43283c0abbd0982fbe61f5f03765b617/2717pt2717/5435xcr5435/KIPRUN%20TS%20RUN%20500%20M%20ANTI-UV%20CARBON%20GREY.webp',
                  alt: 'running',
                  label: 'Chạy bộ'
                },
                {
                  src: 'https://contents.mediadecathlon.com/p2839709/k$3c6fcc7a9b4ad542efa1c4b1ede3bf76/400x400/3667pt2229/4458xcr4458/QUECHUA%20JACKET%20MH150%20MEN%20GREY%20GREY.jpg?format=auto',
                  alt: 'trekking',
                  label: 'Leo núi/Trekking'
                },
                {
                  src: 'https://contents.mediadecathlon.com/p2737897/k$646c35536d05e6017728e2054053a09a/400x400/2616pt4614/5233xcr5233/QUECHUA%20CHAUSSURES%20CHAUDES%20SH500%20MID%20H%20NOIR.webp',
                  alt: 'camping',
                  label: 'Cắm trại'
                },
                {
                  src: 'https://contents.mediadecathlon.com/p2812718/k$0145f2b92d38d906ae3786fd37337648/400x400/2240pt2954/4480xcr4480/DOMYOS%20CN%20STRINGER%20900%20M-C23A%20GR.jpg?format=auto',
                  alt: 'fitness',
                  label: 'Cardio & thể hình'
                },
                {
                  src: 'https://contents.mediadecathlon.com/p2592304/k$0fefc5539dd6e561295925c4d844b155/2240pt3695/4480xcr4480/BR%20LITE%20%20900%20SET%20PRO%20SS24.webp',
                  alt: 'badminton',
                  label: 'Cầu lông'
                },
                {
                  src: 'https://contents.mediadecathlon.com/p2707273/k$b2afd7f5cc1e2110d31c07961934d708/400x400/3501pt2493/4987xcr4987/VAN%20RYSEL%20RACER%202%20SS%20JERSEY%20SUBLI%20M%20%20PINKGRADIENT.jpg?format=auto',
                  alt: 'cycling',
                  label: 'Đạp xe'
                }
              ].map((item, index) => (
                <div key={index} className='flex flex-col items-center gap-2'>
                  <div className='relative w-30 md:w-[170px] aspect-square shrink-0'>
                    <img loading='lazy' className='w-full h-full object-cover absolute' src={item.src} alt={item.alt} />
                  </div>

                  <div className='text-sm font-medium'>{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={variants.fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className='mt-6 mb-3 ml-6 lg:my-6 lg:mx-10 xl:mx-20 relative'>
            {viewport.desktop && (
              <motion.div
                variants={variants.button}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
              >
                <ScrollButton scrollRef={scrollRef2 as React.RefObject<HTMLDivElement>} direction='left' />
                <ScrollButton scrollRef={scrollRef2 as React.RefObject<HTMLDivElement>} direction='right' />
              </motion.div>
            )}

            <div className='font-semibold text-lg lg:text-xl mb-1'>Quẩn áo sale tới 50%</div>

            <div
              ref={scrollRef2}
              className='flex items-center gap-4 lg:gap-5 overflow-x-scroll scrollbar-none scroll-smooth touch-pan-x touch-pan-y'
            >
              {dataProducts.slice(16, 30).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={variants.fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          className='mt-3 mb-3 ml-6 lg:my-6 lg:mx-10 xl:mx-20'
        >
          <div className='font-semibold text-lg lg:text-xl mb-1'>Chuẩn bị cho kì nghỉ lễ</div>
          <div className='flex items-center justify-between gap-3 md:gap-6 overflow-x-scroll scrollbar-none scroll-smooth touch-pan-x touch-pan-y'>
            {[
              'https://contents.mediadecathlon.com/s1212739/k$66aed3cb4206898f28c681ab4eca350c/kids-shoe-small-web.webp',
              'https://contents.mediadecathlon.com/s1212721/k$0a85dbbc2a2dc7f55d62882cb3fd2c0f/kids-shoe-small-web-2.webp',
              'https://contents.mediadecathlon.com/s1212735/k$6bcf7802e8f4ec14b82987b62fbbdf82/kids-shoe-small-web-4.webp'
            ].map((src, idx) => (
              <div key={idx} className='grow h-50 lg:h-[230px] xl:h-[240px] 3xl:h-[320px] aspect-43/23 relative'>
                <img
                  src={src}
                  loading='lazy'
                  alt={`camp-small-${idx + 1}`}
                  className='w-full h-full object-cover absolute'
                />
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          variants={variants.fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className='mt-6 mb-3 pb-6 ml-6 lg:my-6 lg:mx-10 xl:mx-20 relative'>
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
              {dataProducts.slice(31, 45).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
