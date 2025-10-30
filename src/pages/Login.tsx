import { MdLock, MdArrowBack } from 'react-icons/md'
import { FaUserCog } from "react-icons/fa";
import useLogin from '../hooks/useLogin'
import '../components/liveChat/MaskedInput/MaskedInput.css'
import { inputErrors } from '../constants/chat';
// import MaskedInput from '../components/liveChat/MaskedInput/MaskedInput';

const Login = () => {
  const { classNames, register, handleSubmit, onSubmit, errors } = useLogin()

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
                  type="password"
                  placeholder="Contraseña"
                  className={`
                    ${classNames.inputBase} password-look
                    ${errors.pk_password ? inputErrors : ''}
                  `}
                  autoComplete="off"
                  {...register('pk_password', { required: true })}
                />
              </div>

              <a href="#" className={classNames.passwordForgot}>
                ¿Olvidaste tu contraseña?
              </a>

              <button
                type="submit"
                className={classNames.submitBtn}
              >
                Iniciar sesión
              </button>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default Login