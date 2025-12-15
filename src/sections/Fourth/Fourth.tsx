import testimoniosdesktop from '../../assets/sections/fourth/tribet juega desktop.webp'
import testimonios3220 from '../../assets/sections/fourth/tribet juega 3220.webp'
import testimoniosmobile from '../../assets/sections/fourth/tribet_juega_telefono.webp'

const Fourth = () => {
  return (
    <div className=' overflow-hidden'>
      <img src={testimoniosmobile} alt="testimonios mobile" className=' md:hidden' />
      <img src={testimoniosdesktop} alt="testimonios desktop" className=' hidden md:block 2xl:hidden h-[200px] md:h-[unset] w-full' fetchPriority='high' />
      <img src={testimonios3220} alt="testimonios 3220" className=' hidden 2xl:block' />
    </div>
  )
}

export default Fourth