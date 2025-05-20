import { useIsFetching } from '@tanstack/react-query'

export default function PageLoader() {
  const totalFetching = useIsFetching()
  const fetchingPurchases = useIsFetching({ queryKey: ['purchases'] })
  const fetchingExceptPurchases = totalFetching - fetchingPurchases

  return (
    <>
      {fetchingExceptPurchases > 0 && (
        <div className='fixed inset-0 bg-black/10 flex justify-center items-center z-1000 overflow-hidden'>
          <span className='loading loading-spinner text-blue'></span>
        </div>
      )}
    </>
  )
}
