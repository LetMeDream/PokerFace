import './Main.css'
import tokenImg from '../../assets/token.png';
import whatsapp from '../../assets/whatsapp.png';

const Main = () => {
  return (
    <div className='main-container'>
      <section>
        <div className="main-container__section flex flex-col md:flex-row lg:flex-row">
          <div
            className='w-full hero-font pt-3 px-2 flex items-center' 
          >
            <h1
              className='uppercase !lg:text-7xl !text-[47px] !leading-[47px] text-center text-[#e5aa42] md:!text-[80px] md:!leading-[77px] lg:!mt-3 lg:ml-[-8px] xl:ml-[38px]'
            >
              <i>Viví la emoción <br className='hidden md:block'/> del casino online</i>
            </h1>
          </div>
          <div
            className='w-full flex items-center lg:mt-[20px] lg:ml-[-28px]'
          >
              <img 
                src={tokenImg} 
                alt="Background" 
                className=" w-[243px] md:w-[499px] mt-1 mx-auto"
              />
          </div>
        </div>
      </section>
      {/* Whatsapp image */}
      <img 
        src={whatsapp} 
        alt="WhatsApp" 
        className=" max-w-full mt-2 lg:mt-[21px] mx-auto px-2 lg:px-[unset] md:max-w-[95vw] lg:max-w-[745px] md:py-8 lg:py-[unset]"
      />
      <div className='text-center text-white pt-7 lg:pt-14 pb-7'>
        <em className='text-[23px]  leading-0 md:text-[46px] md:leading-[50px] comfortaa-font lg:text-[50px] xl:px-[40px]'>
          Ruleta, póker, tragamonedas y mucho más. Jugá cuando quieras, desde tu celu.
        </em>
      </div>
    </div>    
  )
}

export default Main