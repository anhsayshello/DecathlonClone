import { zodResolver } from '@hookform/resolvers/zod'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router'
import path from 'src/constants/path'
import { NameSchema,nameSchema } from 'src/utils/schema'

import useQueryConfig from './useQueryConfig'

export default function useSearchProduct() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<NameSchema>({
    resolver: zodResolver(nameSchema)
  })

  const queryConfig = useQueryConfig()
  const handleSearcher = handleSubmit((data) => {
    navigate({
      pathname: path.productSearch,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      ).toString()
    })
  })

  return { register, handleSearcher }
}
