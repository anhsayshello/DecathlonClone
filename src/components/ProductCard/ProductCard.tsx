import { Link } from 'react-router'
import path from 'src/constants/path'
import { useAuthenticatedStore } from 'src/stores/useAuthenticatedStore'
import { Product } from 'src/types/product.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

import Dialog from '../AlertDialog'
import PopoverCart from './components/PopoverCart/PopoverCart'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { isAuthenticated } = useAuthenticatedStore((state) => state)
  return (
    <div className='w-[185px] lg:w-[237px] flex flex-col shrink-0 pb-3'>
      <div className='relative'>
        <Link to={`${path.home}${generateNameId(product.name, product._id)}`}>
          <div className='aspect-185/185 lg:aspect-237/237 w-full relative'>
            <img className='w-full h-full absolute object-cover' src={product.image as string} alt={product.name} />
            {product.sold > 100 ? (
              <div className='bg-[#ffcd4e] px-2 py-[2px] text-[10px] font-bold absolute top-0 left-0 uppercase'>
                SALE
              </div>
            ) : (
              <div className='bg-[#e1e3f5] px-2 py-[2px] text-[10px] font-bold absolute top-0 left-0 uppercase'>
                sản phẩm mới
              </div>
            )}
          </div>
          <div className='px-4 py-4 md:px-0 flex flex-col gap-2'>
            <div className='flex flex-col lg:flex-row gap-1 lg:gap-3.5'>
              <div className='font-medium'>{formatCurrency(product.price)}&nbsp;₫</div>
              <div className='flex items-center gap-1.5'>
                <div className='text-xs line-through decoration-[#616161] text-[#616161] font-normal'>
                  {formatCurrency(product.price_before_discount)}&nbsp;₫
                </div>
                <div className='bg-[#ffcd4e] text-xs px-1 py-[2px] heading-4'>
                  -{Math.floor(((product.price_before_discount - product.price) / product.price_before_discount) * 100)}
                  %
                </div>
              </div>
            </div>
            <div className='h-10 font-medium text-sm line-clamp-2 break-all'>{product.name}</div>
            <div className='flex items-center mt-3'>
              <svg
                className='mb-0.5'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                width='12'
                height='12'
                strokeWidth='1.25'
                aria-hidden='true'
                color='var(--vp-semantic-color-content-neutral)'
              >
                <path
                  d='M12 15.9L16.8 19.3L15 13.7L19.7 10.3H13.8L12 4.70001L10.2 10.3H4.30005L9.00005 13.7L7.20005 19.3L12 15.9Z'
                  fill='currentColor'
                  stroke='currentColor'
                ></path>
              </svg>
              <div className='text-xs font-medium mx-1.5'>{Math.floor(product.rating * 10) / 10}</div>
              <div className='text-xs font-medium text-[#616161]'>({product.sold})</div>
            </div>
          </div>
        </Link>
        <div className='absolute bottom-1 right-1 cursor-pointer'>
          {isAuthenticated ? (
            <PopoverCart product={product} />
          ) : (
            <Dialog
              trigger={
                <button
                  className='p-3 rounded-full hover:bg-[#deddde] cursor-pointer'
                  aria-label='Điều hướng đến trang đăng nhập'
                >
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    strokeWidth='1.5'
                    aria-hidden='true'
                  >
                    <path
                      d='M8.20002 8.49999C8.20002 4.99999 9.90002 2.79999 12 2.79999C14.1 2.79999 15.8 5.09999 15.8 8.49999M20.1 15L21 10.8H2.90002L5.00002 20.5C5.10002 21 5.50002 21.3 6.00002 21.3H15M17.8 14.8V20.8M20.8 17.8H14.8'
                      stroke='currentColor'
                    ></path>
                  </svg>
                </button>
              }
              title='Thêm sản phẩm vào giỏ hàng?'
              pathName={path.login}
            />
          )}
        </div>
      </div>
    </div>
  )
}
