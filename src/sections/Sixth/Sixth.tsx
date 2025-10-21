import './Sixth.css'
import tribetClub from '../../assets/sections/sixth/tribet-club.png'
import instagram from '../../assets/sections/sixth/instagram.png'
import whatssap from '../../assets/sections/sixth/whatssapp.png'

const Sixth = () => {
  return (
    <section className="main-container pb-4 2xl:flex 2xl:flex-row-reverse 2xl:items-center md:pb-12 2xl:justify-center 2xl:py-14 caret-transparent 2xl:gap-6">
      <img src={tribetClub} alt="Tribet Club" className='max-w-[300px] w-[70px] md:w-[160px] md:pt-6 mx-auto 2xl:mx-[0px] pt-3 pb-5 ' />

      <div className="icons flex flex-col gap-2">

        <div className='icon-container flex gap-2 items-center justify-center px-1 max-w-[90vw] mx-auto md:gap-3 md:!max-w-max 2xl:py-0 2xl:px-0 2xl:mx-[unset] relative'>
          <img src={whatssap} alt="WhatsApp" className=' max-w-[22px]  relative' />
          <span className=' text-white relative montserrat-normal text-xs md:text-lg 2xl:text-2xl '>
            +54 911 722 35 159
          </span>
        </div>

        <div className='icon-container flex gap-2 items-center justify-center  relative max-w-[90vw] mx-auto md:gap-3 md:!max-w-max 2xl:py-0 2xl:px-0 2xl:mx-[unset]'>
          <img src={instagram} alt="Instagram" className=' max-w-[22px] relative' />
          <span className=' text-white relative montserrat-normal text-xs md:text-lg 2xl:text-2xl '>
            tribet.club_
          </span>
        </div>
      </div>
    </section>
  )
}

export default Sixth