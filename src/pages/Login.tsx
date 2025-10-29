import { MdEmail, MdLock, MdArrowBack } from 'react-icons/md'
import useLogin from '../hooks/useLogin'

const Login = () => {
  const { classNames } = useLogin()

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-sky-100 to-sky-50" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4 pt-0 w-[100vw]">

        {/* Card */}
        <div className="w-full max-w-md relative -top-6">
          <div className={classNames.cardWrapper}>
            <button className={classNames.backBtn}>
              <MdArrowBack className="w-5 h-5 text-white-700 hover:text-gray-300" />
            </button>

            <h1 className="!text-2xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h1>

            {/* Login form */}
            <form className="space-y-4" autoComplete="off">

              <div className="relative">
                <MdEmail className={classNames.icon} />
                <input
                  type="text"
                  name='username'
                  placeholder="Usuario"
                  className={classNames.inputBase}
                  autoComplete="new-password"
                />
              </div>

              <div className="relative">
                <MdLock className={classNames.icon} />
                <input
                  type="password"
                  name='pass'
                  placeholder="Contraseña"
                  className={classNames.inputBase}
                  autoComplete="new-password"
                />
              </div>

              <a href="#" className="block text-right text-sm text-gray-600 hover:text-gray-900 mb-4">
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