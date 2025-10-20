import videoIcono from '../../assets/sections/fifth/video-icono.png'
import chatear from '../../assets/sections/fifth/chatear.png'

const Fifth = () => {
  return (
    <section>
      <div className=' bg-primary text-lg text-secondary montserrat-font uppercase py-8 pt-4 px-3 text-center'>
        <p className=''>
          "Escribinos para crear tu usuario ahora, atención 24 horas"
        </p>
      </div>
      <div className='bg-secondary relative pt-18'>  
        <img src={chatear} alt="Chat Icon" className='mx-auto max-w-[300px] absolute -top-8 left-[50%] transform -translate-x-[50%]' />
        <img src={videoIcono} alt="Play Icon" className='mx-auto max-w-[300px] py-10' />
        <p className=' text-center uppercase montserrat-font text-3xl mx-16'>
          Si sabés jugar bien tus cartas
        </p>
        <img src={videoIcono} alt="Play Icon" className='mx-auto max-w-[300px] py-10 pb-8' />
        <p className=' text-center uppercase montserrat-font text-3xl pb-10'>
          Atención 25 horas
        </p>
      </div>
    </section>
  )
}

export default Fifth