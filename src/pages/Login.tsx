import { MdLock, MdArrowBack, MdVisibilityOff, MdVisibility } from 'react-icons/md'
import { FaUserCog } from "react-icons/fa";
import useLogin from '../hooks/useLogin'
import '../components/liveChat/MaskedInput/MaskedInput.css'
import { inputErrors } from '../constants/chat';
import { useEffect, useState } from 'react';
// import MaskedInput from '../components/liveChat/MaskedInput/MaskedInput';
import '../components/liveChat/ContactForm/ContactForm.css'

const Login = () => {
  const { classNames, register, handleSubmit, onSubmit, errors, isLoading } = useLogin()
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    console.log('isLoading changed:', isLoading);
  }, [isLoading])

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-sky-100 to-sky-50" />
      </div>

      <div className={classNames.container}>

        {/* Card */}
        <div className="w-full max-w-md relative -top-6">
          <div className={classNames.cardWrapper}>
            <button className={classNames.backBtn}>
              <MdArrowBack className={classNames.back} />
            </button>

            <h1 className={classNames.welcome}>Bienvenido de nuevo</h1>

            {/* Login form */}
            <form 
              className="space-y-4" 
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >

              <div className="relative">
                <FaUserCog 
                  className={`
                    ${classNames.icon}
                    ${errors.pk_username ? 'text-red-400' : ''}
                  `}
                />
                <input
                  type="text"
                  placeholder="Usuario"
                  className={
                    classNames.inputBase
                    + (errors.pk_username ? inputErrors : '')}
                  autoComplete="on"
                  {...register('pk_username', { required: true })}
                />
              </div>

              <div className="relative">
                <MdLock 
                  className={`
                    ${classNames.icon}
                    ${errors.pk_password ? 'text-red-400' : ''}
                  `} 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password-input'
                  placeholder="Contraseña"
                  className={`
                    ${classNames.inputBase}
                    ${errors.pk_password ? inputErrors : ''}
                  `}
                  autoComplete="off"
                  {...register('pk_password', { required: true })}
                />
                {/* Eye toggle */}
                <span
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </span>
              </div>
              
              <div className="text-right border border-transparent">
                <a href="#" className={classNames.passwordForgot}>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* <button
                type="submit"
                className={classNames.submitBtn + ` 
                  ${isLoading ? 'animate-compress-spin ' : ''}
                  focus:!outline-none focus:!ring-2 focus:!ring-opacity-75 
                text-white py-2.5 px-4 font-semibold
                  mt-2 relative overflow-hidden mx-auto w-full transition duration-100
                  `}
              >
                {isLoading ? <div className="loading-spinner" /> : 'Iniciar sesión'}
              </button> */}

              <div className='flex items-center w-full'>
                <button
                  type="submit" 
                  className={`
                    focus:!outline-none focus:!ring-2 focus:!ring-green-400 focus:!ring-opacity-75 
                  text-white py-2.5 px-4 rounded-lg font-semibold
                    mt-2 relative overflow-hidden w-full transition duration-100 mx-auto`
                  }
                  disabled={isLoading}
                >
                  {/* text toggled during animation */}
                  <span 
                    className={`transition-opacity duration-75 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}
                  >
                    Iniciar sesión
                  </span>
                  {/* spinner shown while animating */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-75 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
                  </div>
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default Login