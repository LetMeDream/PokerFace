import videoIcono from '../../assets/sections/fifth/video-icono.png'
import './Fifth.css'

const Fifth = () => {

  const openChat = () => {
    const chatBanner = document.getElementById('chat-banner');
    if (chatBanner) {
      chatBanner.click();
    }
  }

  return (
    <section className="caret-transparent overflow-hidden">
      <div className=' bg-primary text-secondary text-[13px] montserrat-font uppercase pb-4 pt-2 px-10 text-center md:text-3xl md:px-20 md:pt-9 md:pb-11 2xl:py-12'>
        <p className=' 2xl:max-w-[700px] 2xl:mx-auto'>
          "Escribinos para crear tu usuario ahora, atención 24 horas"
        </p>
      </div>
      <div className="bg-black">
        <div className=' relative pt-12 flex flex-row justify-center 2xl:max-w-[900px] 2xl:mx-auto px-2'>  
          {/* Chatear */}
          <div className="absolute -top-4 left-1/2 -translate-y-1 md:-translate-y-6">
            {/* <img src={chatear} alt="Chat Icon" className="chat-pulse max-w-[180px] md:max-w-[440px]" /> */}
            <div>
              <div 
                className=" 
                  absolute bg-[#18b720] hover:bg-[#0abb13] transition-colors duration-500 rounded-full px-36 py-2 chat-pulse 
                  montserrat-font text-4xl uppercase right-1/2 top-2/12 cursor-pointer"
                onClick={openChat}
              >
                  Chatear
              </div>
            </div>
           </div>
          <div className=' flex-1 mb-3 flex flex-col items-center'>
            <img src={videoIcono} alt="Play Icon" className='max-w-[45vw] w-[140px] md:w-[240px] md:pt-10 pb-3' />
            <p className=' text-center text-white uppercase montserrat-normal text-[10px] md:text-2xl md:pb-6 max-w-[60%]'>
              Si sabés jugar bien tus cartas
            </p>
          </div>

          <div className=' flex-1 mb-3 flex flex-col items-center'>
            <img src={videoIcono} alt="Play Icon" className='max-w-[45vw] w-[140px] md:w-[240px] md:pt-10 pb-3' />
            <p className=' text-center text-white uppercase montserrat-normal text-[10px] md:text-2xl md:pb-6 '>
              Atención 24 horas
            </p>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Fifth