import './Sixth.css'
import tribetClub from '../../assets/sections/sixth/tribet-club.png'
import instagram from '../../assets/sections/sixth/instagram.png'
import whatssap from '../../assets/sections/sixth/whatssapp.png'

const Sixth = () => {
  return (
    <section className="main-container pb-4 2xl:flex 2xl:flex-row-reverse 2xl:items-center 2xl:justify-center 2xl:py-14 caret-transparent">
      <img src={tribetClub} alt="Tribet Club" className='max-w-[300px] w-[70px] mx-auto 2xl:mx-[0px] pt-3 pb-5 ' />

      <div className="icons flex flex-col gap-2">

        <div className='icon-container flex gap-2 items-center justify-center px-1 max-w-[90vw] mx-auto md:gap-6 md:!max-w-max 2xl:py-0 2xl:px-0 2xl:mx-[unset] relative 2xl:top-6'>
          <img src={whatssap} alt="WhatsApp" className=' max-w-[22px]  relative' />
          <span className=' relative montserrat-font text-xs'>
            +54 911 722 35 159
          </span>
        </div>

        <div className='icon-container flex gap-2 items-center justify-center  relative max-w-[90vw] mx-auto md:gap-6 md:!max-w-max 2xl:py-0 2xl:px-0 2xl:mx-[unset] 2xl:-top-6'>
          <img src={instagram} alt="Instagram" className=' max-w-[22px] relative' />
          <span className=' relative montserrat-font text-xs '>
            tribet.club_
          </span>
        </div>
      </div>
    </section>
  )
}

export default Sixth