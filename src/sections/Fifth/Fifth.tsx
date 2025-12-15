import videoIcono from '../../assets/sections/fifth/video-icono.webp'
import video1 from '../../assets/videos/juega365bet.webm'
import video2 from '../../assets/videos/juega365bet2.1.webm'
import './Fifth.css'

const Fifth = () => {


  const togglePlay = (videoId: string) => {
    const videoElement = document.getElementById(`video-${videoId}`) as HTMLVideoElement | null;
    const iconElement = document.getElementById(`video1-icon-${videoId}`);
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        if (iconElement) {
          iconElement.style.display = 'none';
        }
      } else {
        videoElement.pause();
        if (iconElement) {
          iconElement.style.display = 'block';
        }
      }
    }
  }

  const finishVideo = (videoId: string) => {
    const iconElement = document.getElementById(`video1-icon-${videoId}`);
    if (iconElement) {
      iconElement.style.display = 'block';
    }
  }

  return (
    <section className="caret-transparent overflow-hidden">
      <div className="bg-black">
        <div className=' relative pt-12 flex flex-row justify-center 2xl:max-w-[900px] 2xl:mx-auto px-2'>  
          <div className=' flex-1 mb-3 flex flex-col items-center'>
            {/* VIDEO 1 */}
            <div className="video-container relative md:mt-10 cursor-pointer max-w-[45vw] w-[140px] md:w-[240px]">
              <video id='video-1' preload='metadata' className=' w-[240px] aspect-square border'
                onEnded={() => finishVideo('1')}
                onClick={() => togglePlay('1')}
              >
                <source src={video1} type="video/webm" />
              </video>

              <img src={videoIcono} id='video1-icon-1' alt="Play Icon" className=' pb-3 absolute top-0 left-0 pointer-events-none' />
            </div>
            <p className=' text-center text-white uppercase montserrat-normal text-[10px] md:text-2xl md:pb-6 max-w-[60%]'>
              Si sabés jugar bien tus cartas
            </p>
          </div>

          <div className=' flex-1 mb-3 flex flex-col items-center'>
            {/* VIDEO 2 */}
            <div className="video-container relative md:mt-10 cursor-pointer max-w-[45vw] w-[140px] md:w-[240px]">
              <video id='video-2' preload='metadata' className=' w-[240px] aspect-square border'
                onEnded={() => finishVideo('2')}
                onClick={() => togglePlay('2')}
              >
                <source src={video2} type="video/webm" />
              </video>
              <img src={videoIcono} alt="Play Icon" id='video1-icon-2' className='absolute top-0 left-0 pb-3 pointer-events-none' />
            </div>
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