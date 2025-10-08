import './Second.css'

const Second = () => {
  return (
    <div className=' bg-black pt-10 py-6 md:py-26 px-2 md:px-0 flex flex-col md:flex-row gap-8 md:gap-2 text-center md:text-center text-[22px] leading-[26px] montserrat-font pb-10'>
      
      <div className='flex-1'>
        <p>
          <b>
            100% Seguro
          </b>
        </p>
        <p>Jugá tranquilo en una</p>
        <p>plataforma confiable</p>
      </div>
      <div className='flex-1'>
        <p>
          <b>
            Rápido y fácil
          </b>
        </p>
        {/* For UI-reasons; these p's down here will be for the responsive only */}
        <div className='md:hidden'>
          <p>Accedé a tus juegos favoritos</p>
          <p>en segundos.</p>
        </div>

        {/* Down here, the 'md' and on version */}
        <div className='hidden md:block'>
          <p>Accedé a tus juegos</p>
          <p>favoritos en segundos.</p>
        </div>
      </div>
      <div className='flex-1'>
        <p><b>Bono de Bienvenida</b></p>
        {/* For UI-reasons; these p's down here will be for the responsive only */}
        <div className='md:hidden'>
          <p>Empezá con ventaja desde tu</p>
          <p>primera jugada.</p>
        </div>

        {/* Down here, the 'md' and on version */}
        <div className='hidden md:block'>
          <p>Empezá con ventaja</p>
          <p>desde tu primera jugada.</p>
        </div>
      </div>
    </div>
  )
}

export default Second