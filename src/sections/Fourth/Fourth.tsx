import testimoniosdesktop from '../../assets/sections/fourth/testimonios-desktop.png'
import testimonios3220 from '../../assets/sections/fourth/testimonios-3220.png'

const Fourth = () => {
  return (
    <div className=' overflow-hidden'>
      <img src={testimoniosdesktop} alt="testimonios desktop" className=' block 2xl:hidden h-[200px] md:h-[unset] w-full' fetchPriority='high' />
      <img src={testimonios3220} alt="testimonios 3220" className=' hidden 2xl:block' />
    </div>
  )
}

export default Fourth