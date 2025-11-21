import './Second.css'
import dekstop from '../../assets/sections/second/banner-second-web-juega365.png'
import bigercreen from '../../assets/sections/second/banner-second-3220-juega365.png'

const Second = () => {
  return (
    <div className='bg-secondary'>
      <img src={dekstop} alt="desktop" className='second-desktop-image block 2xl:hidden md:pt-2 2xl:pt-0 w-[100vw] relative -top-1 h-[140px] md:h-[unset]' />
      <img src={bigercreen} alt="3220" className='second-3220-image hidden 2xl:block -mt-4' />
    </div>
  )
}

export default Second