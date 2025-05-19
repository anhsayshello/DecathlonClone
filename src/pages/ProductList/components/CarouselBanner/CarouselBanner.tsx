import { useContext } from 'react'
import Carousel from 'src/components/Carousel'
import { AppContext } from 'src/context/app.context'

const carouselImages = {
  mobileTablet: [
    'https://contents.mediadecathlon.com/s1236670/k$ce246516d5bbd812ed8d1caa0df85e59/LAND_mob_VN.webp',
    'https://contents.mediadecathlon.com/s1241885/k$8af94ca985c159a09ea5932f6ada3339/eos-hero-mob.webp',
    'https://contents.mediadecathlon.com/s1244059/k$84234f78417cd59418c0944cd6a30d54/CJ-mob.webp',
    'https://contents.mediadecathlon.com/s1226721/k$308fcb65f9997967b72a73a41c2883f6/1903%20GA%20banner_UPD1104_VN-mob.webp',
    'https://contents.mediadecathlon.com/s1213378/k$c6f6e7bae584e3a4dd4dc6a04e747236/Banner-Sun-Protection-vi-mob.webp',
    'https://contents.mediadecathlon.com/s1212841/k$aad4b56fa2dfd4bbeea46269c03cc2ba/721pt453/1443xcr805/New%20Arrival%20-%20mab%20-%20mob.webp'
  ],
  desktop: [
    'https://contents.mediadecathlon.com/s1236671/k$499001df056d90f3b65d6f5dcf29db94/LAND_web_VN.webp',
    'https://contents.mediadecathlon.com/s1241886/k$292bd3147676f6fb6ce33f7727a0d58f/readytoplay-sale-web-vi.webp',
    'https://contents.mediadecathlon.com/s1244058/k$c38864f488d7b548f195d6c3b4f58864/CJ-web%20(2).webp',
    'https://contents.mediadecathlon.com/s1226722/k$a44eca9c37d77286768f057b2d9654b7/1903%20GA%20banner_UPD1104_VN-desktop.webp',
    'https://contents.mediadecathlon.com/s1213369/k$d391ff82d518b15a1154aa645fbcee5c/Banner-Sun-Protection-vi.webp',
    'https://contents.mediadecathlon.com/s1212842/k$139522f23bf654140949befd8f73c405/1440pt397/2880xcr751/New%20Arrival%20-%20mab%20-%20web.webp'
  ]
}

export default function CarouselBanner() {
  const { viewport } = useContext(AppContext)
  const images = !viewport.desktop ? carouselImages.mobileTablet : carouselImages.desktop

  return (
    <Carousel
      arrows={viewport.tablet}
      dots={true}
      autoplay={true}
      children={images.map((src, index) => (
        <img key={index} src={src} className='h-full w-full object-cover' alt={`carousel-${index}`} />
      ))}
    />
  )
}
