import './First.css'
import logojuega from '../../assets/sections/first/logo juega 365 blanco.png'

const First = () => {
  return (
    <div>
      {/* mobile */}
      <div className=' first-mobile-image md:hidden bg-cover'>
        <img src={logojuega} alt="logo juega 365" className='w-[240px] mx-auto pt-5' />
        <h1 className=' bebas-neue-font text-primary text-center !text-4xl px-4 !leading-8 pb-3 '>
          Viví la emoción <br /> del casino en línea
        </h1>
      </div>

      {/* desktop */}
      <div className=' first-desktop-image hidden md:block 2xl:hidden bg-cover'>
        <img src={logojuega} alt="logo juega 365" className='w-[420px] mx-auto pt-8' />
        <h1 className=' bebas-neue-font text-primary text-center !text-6xl px-4 !leading-16 pb-5 '>
          Viví la emoción <br /> del casino en línea
        </h1>
      </div>

      {/* biger screen */}
      <div className=' first-bigerscreen-image hidden 2xl:flex bg-cover h-[400px] items-center justify-center'>
        <div className=' basis-2/5 justify-end items-center flex'>
          <img src={logojuega} alt="logo juega 365" className=' w-[460px]' />
        </div>
        <h1 className=' bebas-neue-font text-primary !text-8xl pl-20 px-4 !leading-24 pb-7 text-start basis-3/5'>
          Viví la emoción <br /> del casino en línea
        </h1>
      </div>
    </div>    
  )
}

export default First