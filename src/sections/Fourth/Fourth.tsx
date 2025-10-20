import testimonios from '../../assets/sections/fourth/testimonios.png'
import testimoniosdesktop from '../../assets/sections/fourth/testimonios-desktop.png'
import testimonios3220 from '../../assets/sections/fourth/testimonios-3220.png'

const Fourth = () => {
  return (
    <div className=' overflow-hidden'>
      <img src={testimonios} alt="testimonios" className=' scale-105 md:hidden' />
      <img src={testimoniosdesktop} alt="testimonios desktop" className=' hidden md:block 2xl:hidden' />
      <img src={testimonios3220} alt="testimonios 3220" className=' hidden 2xl:block' />
    </div>
  )
}

export default Fourth