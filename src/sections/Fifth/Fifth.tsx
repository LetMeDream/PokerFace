import videoIcono from '../../assets/sections/fifth/video-icono.png'
import chatear from '../../assets/sections/fifth/chatear.png'

const Fifth = () => {
  return (
    <section className="caret-transparent">
      <div className=' bg-primary text-secondary text-[13px] montserrat-font uppercase pb-4 pt-2 px-10 text-center md:text-3xl md:px-20 md:pt-10 md:pb-12 2xl:py-12'>
        <p className=' 2xl:max-w-[700px] 2xl:mx-auto'>
          "Escribinos para crear tu usuario ahora, atención 24 horas"
        </p>
      </div>
      <div className="bg-secondary">
        <div className=' relative pt-12 flex flex-row justify-center 2xl:max-w-[900px] 2xl:mx-auto px-2'>  
          <img src={chatear} alt="Chat Icon" className='mx-auto max-w-[180px] md:max-w-[440px] absolute -top-4 left-[50%] transform -translate-x-[50%]' />

          <div className=' flex-1 mb-3 flex flex-col items-center'>
            <img src={videoIcono} alt="Play Icon" className='max-w-[45vw] w-[140px] md:py-10 pb-3' />
            <p className=' text-center uppercase montserrat-normal text-[10px] md:text-3xl max-w-[60%]'>
              Si sabés jugar bien tus cartas
            </p>
          </div>

          <div className=' flex-1 mb-3 flex flex-col items-center'>
            <img src={videoIcono} alt="Play Icon" className='max-w-[45vw] w-[140px] md:py-10 pb-3' />
            <p className=' text-center uppercase montserrat-normal text-[10px] md:text-3xl '>
              Atención 24 horas
            </p>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Fifth