import './Third.css'
import ruleta from '../../assets/sections/third/ruleta.png'
import slots from '../../assets/sections/third/slots.png'
import deportes from '../../assets/sections/third/deportes.png'

const Third = () => {
  return (
    <div className='caret-transparent'>
      <div className='bg-secondary montserrat-font text-center text-[#FFB400] text-lg px-8 md:px-40 py-4 md:py-5 md:text-[26px] lg:text-3xl xl:text-[32px] xl:pt-1 xl:pb-4'>
        Los juegos que más te gustan, en un solo lugar:
      </div>
      <div className="main-container">
        <div className=" flex flex-col md:flex-row px-4 py-10 max-w-[1800px] mx-auto">
          <img src={ruleta} alt="ruleta" className='third-ruleta-image max-w-[340px] md:max-w-[33%] 2xl:max-w-[420px] justify-center mx-auto cursor-pointer hover:scale-105 transition duration-700' />
          <img src={slots} alt="slots" className='third-slots-image max-w-[340px] md:max-w-[33%] 2xl:max-w-[420px] justify-center mx-auto cursor-pointer hover:scale-105 transition duration-700' />
          <img src={deportes} alt="deportes" className='third-deportes-image max-w-[340px] md:max-w-[33%] 2xl:max-w-[420px] justify-center mx-auto cursor-pointer hover:scale-105 transition duration-700' />
        </div>
      </div>
    </div>
  )
}

export default Third