import './style.css'

import { Carousel as CarouselWrapper } from 'antd'
interface Props {
  arrows?: boolean
  dots?: boolean
  autoplay?: boolean
  children: React.ReactElement[]
}
export default function Carousel({ arrows, dots, autoplay, children }: Props) {
  return (
    <CarouselWrapper arrows={arrows} dots={dots} autoplay={autoplay}>
      {children}
    </CarouselWrapper>
  )
}
