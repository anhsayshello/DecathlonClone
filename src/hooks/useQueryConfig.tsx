import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { ProductQueryParams } from 'src/types/product.type'

import useQueryParams from './useQueryParams'

export type QueryConfig = {
  [key in keyof ProductQueryParams]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '45',
      order: queryParams.order,
      sort_by: queryParams.sort_by,
      category: queryParams.category,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )
  return queryConfig
}
