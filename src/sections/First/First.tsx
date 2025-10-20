import './First.css'
import mobile from '../../assets/sections/first/mobile.png'
import desktop from '../../assets/sections/first/desktop.png'
import bigerscreen from '../../assets/sections/first/3220.png'

const First = () => {
  return (
    <div>
      <img src={mobile} alt="mobile" className='first-mobile-image md:hidden' />
      <img src={desktop} alt="desktop" className='first-desktop-image hidden md:block 2xl:hidden' />
      <img src={bigerscreen} alt="3220" className='first-3220-image hidden 2xl:block' />
    </div>    
  )
}

export default First