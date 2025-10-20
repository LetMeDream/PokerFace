import './Second.css'
import mobile from '../../assets/sections/Second/mobile.png'
import dekstop from '../../assets/sections/Second/desktop.png'
import bigercreen from '../../assets/sections/Second/3220.png'

const Second = () => {
  return (
    <div className='bg-[#242834]'>
      <img src={mobile} alt="mobile" className='second-mobile-image md:hidden' />
      <img src={dekstop} alt="desktop" className='second-desktop-image hidden md:block 2xl:hidden md:pt-2 2xl:pt-0' />
      <img src={bigercreen} alt="3220" className='second-3220-image hidden 2xl:block -mt-4' />
    </div>
  )
}

export default Second