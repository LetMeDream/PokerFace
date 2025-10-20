import './Sixth.css'
import tribetClub from '../../assets/sections/sixth/tribet-club.png'
import instagram from '../../assets/sections/sixth/instagram.png'
import whatssap from '../../assets/sections/sixth/whatssapp.png'

const Sixth = () => {
  return (
    <div className="main-container pb-4 2xl:flex 2xl:flex-row-reverse 2xl:items-center 2xl:justify-center 2xl:py-14">
      <img src={tribetClub} alt="Tribet Club" className='max-w-[300px] mx-auto 2xl:mx-[0px] pt-12 pb-6 ' />

      <div className="icons md:flex md:flex-col ">
        <div className='icon-container flex items-center justify-center px-1 max-w-[90vw] mx-auto md:gap-6 md:!max-w-max 2xl:py-0 2xl:px-0 2xl:mx-[unset] relative 2xl:top-6 '>
          <img src={whatssap} alt="WhatsApp" className=' mx-auto pt-12 pb-6 max-w-[64px] relative -top-2' />
          <span className=' relative montserrat-font text-2xl'>
            +54 911 722 35 159
          </span>
        </div>

        <div className='icon-container flex items-center justify-center px-10 relative -top-4 max-w-[90vw] mx-auto md:gap-6 md:!max-w-max 2xl:py-0 2xl:px-0 2xl:mx-[unset] 2xl:-top-6'>
          <img src={instagram} alt="Instagram" className=' mx-auto pt-12 pb-6 max-w-[64px] relative -top-2' />
          <span className=' relative montserrat-font text-2xl '>
            tribet.club_
          </span>
        </div>
      </div>
    </div>
  )
}

export default Sixth