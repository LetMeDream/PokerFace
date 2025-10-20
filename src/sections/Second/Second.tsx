import './Second.css'
import dekstop from '../../assets/sections/second/desktop.png'
import bigercreen from '../../assets/sections/second/3220.png'

const Second = () => {
  return (
    <div className='bg-secondary'>
      <img src={dekstop} alt="desktop" className='second-desktop-image block 2xl:hidden md:pt-2 2xl:pt-0 w-[100vw] h-[150px] relative -top-1' />
      <img src={bigercreen} alt="3220" className='second-3220-image hidden 2xl:block -mt-4' />
    </div>
  )
}

export default Second