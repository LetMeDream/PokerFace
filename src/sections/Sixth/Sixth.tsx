import './Sixth.css'
import tribetClub from '../../assets/sections/sixth/tribet-club.png'
import instagram from '../../assets/sections/sixth/instagram.png'
import whatssap from '../../assets/sections/sixth/whatssapp.png'

const Sixth = () => {
  return (
    <div className="main-container">
      <img src={tribetClub} alt="Tribet Club" className='max-w-[300px] mx-auto pt-12 pb-6' />
      <div className='flex items-center justify-center px-1'>
        <img src={whatssap} alt="WhatsApp" className=' mx-auto pt-12 pb-6 max-w-[72px] relative -top-2' />
        <span className=' relative montserrat-font text-2xl -left-12'>
          +54 911 722 35 159
        </span>
      </div>
      <div className='flex items-center justify-center px-10 relative -top-4'>
        <img src={instagram} alt="Instagram" className=' mx-auto pt-12 pb-6 max-w-[72px] relative -top-2' />
        <span className=' relative montserrat-font text-2xl -left-12'>
          tribet.club_
        </span>
      </div>
    </div>
  )
}

export default Sixth