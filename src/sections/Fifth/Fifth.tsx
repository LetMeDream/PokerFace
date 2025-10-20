import videoIcono from '../../assets/sections/fifth/video-icono.png'
import chatear from '../../assets/sections/fifth/chatear.png'

const Fifth = () => {
  return (
    <section>
      <div className=' bg-primary text-secondary montserrat-font uppercase py-8 pt-4 px-3 text-center md:text-3xl md:px-20 md:pt-10 md:pb-12 2xl:py-12'>
        <p className=' 2xl:max-w-[700px] 2xl:mx-auto'>
          "Escribinos para crear tu usuario ahora, atención 24 horas"
        </p>
      </div>
      <div className="bg-secondary">
        <div className=' relative pt-18 flex flex-col md:flex-row 2xl:max-w-[900px] 2xl:mx-auto'>  
          <img src={chatear} alt="Chat Icon" className='mx-auto max-w-[300px] md:max-w-[440px] absolute -top-8 left-[50%] transform -translate-x-[50%]' />
          <div className=' flex-1 mb-14'>
            <img src={videoIcono} alt="Play Icon" className='mx-auto max-w-[300px] py-10' />
            <p className=' text-center uppercase montserrat-font text-3xl mx-16'>
              Si sabés jugar bien tus cartas
            </p>
          </div>
          <div className=' flex-1 mb-14'>
            <img src={videoIcono} alt="Play Icon" className='mx-auto max-w-[300px] py-10 pb-8' />
            <p className=' text-center uppercase montserrat-font text-3xl pb-10'>
              Atención 25 horas
            </p>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Fifth