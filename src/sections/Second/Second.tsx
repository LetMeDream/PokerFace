import './Second.css'
import dekstop from '../../assets/sections/second/banner-second-web-juega365.webp'
import bigercreen from '../../assets/sections/second/banner-second-3220-juega365.webp'
import useMediaQuery from '../../hooks/useMediaQuery'

export const Second = () => {



  return (
    <>
      <div className='bg-secondary relative'>
        <img src={dekstop} alt="desktop" className='second-desktop-image block 2xl:hidden md:pt-2 2xl:pt-0 w-[100vw] relative -top-1 h-[140px] md:h-[unset]' />
        <img src={bigercreen} alt="3220" className='second-3220-image hidden 2xl:block -mt-4' />
      </div>
      <Chatear />
    </>
  )
}

const Chatear = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const openChat = () => {
    const mobileBtn = document.getElementById('open-chat-mobile-icon');
    const desktopChatBanner = document.getElementById('chat-banner');

    const btnToClick = isMobile ? mobileBtn : desktopChatBanner;
    if (btnToClick) {
      btnToClick.click();
    }
  }

  return (
    <div className=' bg-primary text-secondary text-[13px] montserrat-font uppercase pb-2 pt-2 px-3 text-center md:text-3xl md:px-20 md:py-4 2xl:py-12'>
      <p className=' 2xl:max-w-[700px] 2xl:mx-auto mb-2 md:mb-6'>
        "Escribinos para crear tu usuario ahora, atención 24 horas"
      </p>
      {/* Chatear */}
      <div className=" z-10">
        {/* <img src={chatear} alt="Chat Icon" className="chat-pulse max-w-[180px] md:max-w-[440px]" /> */}
        <div>
          <div 
            className=" 
               bg-[#18b720] hover:bg-[#0abb13] transition-colors duration-500 rounded-full py-2 chat-pulse montserrat-font text-4xl uppercase cursor-pointer max-w-xs mx-auto"
            onClick={openChat}
          >
              Chatear
          </div>
        </div>
      </div>
    </div>
  )
}