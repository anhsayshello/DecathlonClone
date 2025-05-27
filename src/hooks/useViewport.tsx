import { useMediaQuery } from 'usehooks-ts'

export default function useViewport() {
  const viewport = { desktop: useMediaQuery('(min-width: 1024px)'), tablet: useMediaQuery('(min-width: 768px)') }
  return viewport
}
