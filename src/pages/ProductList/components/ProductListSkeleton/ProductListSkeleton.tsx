import { Skeleton } from '../../../../components/ui/skeleton'

export default function ProductListSkeleton() {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className='space-y-3 mt-6 mb-3 pb-6 ml-6 lg:my-6 lg:mx-10 xl:mx-20 relative'>
          <Skeleton className='h-8 w-40 sm:w-50' />
          <Skeleton className='h-50 sm:h-56 xl:h-60 w-full' />
        </div>
      ))}
    </div>
  )
}
