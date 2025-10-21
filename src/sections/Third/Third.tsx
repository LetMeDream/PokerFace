import './Third.css'
import ruleta from '../../assets/sections/third/ruleta.png'
import slots from '../../assets/sections/third/slots.png'
import deportes from '../../assets/sections/third/deportes.png'

const Third = () => {
  return (
    <div className='caret-transparent'>
      <div className='bg-secondary montserrat-font text-center text-[#FFB400] text-[13px] px-2 md:px-4 pb-2 md:py-4 md:pt-0 md:text-[26px] lg:text-3xl xl:text-[32px] xl:pt-1 xl:pb-4 relative'>
        Los juegos que más te gustan, en un solo lugar:
      </div>
      <div className="main-third-container mt-0.00000125">
        <div className=" flex md:flex-row px-1 py-1 max-w-[1800px] 2xl:mx-auto 2xl:justify-center">
          <img src={ruleta} alt="ruleta" className='third-ruleta-image max-w-[33%] h-[90px] md:h-[unset] md:max-w-[33%] 2xl:max-w-[420px] justify-center cursor-pointer hover:scale-105 transition duration-700' />
          <img src={slots} alt="slots" className='third-slots-image max-w-[33%] h-[90px] md:h-[unset] md:max-w-[33%] 2xl:max-w-[420px] justify-center cursor-pointer hover:scale-105 transition duration-700' />
          <img src={deportes} alt="deportes" className='third-deportes-image max-w-[33%] h-[90px] md:h-[unset] md:max-w-[33%] 2xl:max-w-[420px] justify-center cursor-pointer hover:scale-105 transition duration-700' />
        </div>
      </div>
    </div>
  )
}

export default Third