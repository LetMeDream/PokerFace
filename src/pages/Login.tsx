import React from 'react'
import { MdEmail, MdLock, MdArrowBack } from 'react-icons/md';

const Login = () => {
  return (
    <>
      {/* Fondo */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-sky-100 to-sky-50" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4 w-[100vw]">

        {/* Tarjeta */}
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
            <button className="mb-6 p-2 rounded-full bg-white/60 hover:bg-white/80 transition-all shadow-md">
              <MdArrowBack className="w-5 h-5 text-white-700 hover:text-gray-300" />
            </button>

            <h1 className="!text-2xl  font-bold text-gray-900 mb-2">Welcome back</h1>


            <form className="space-y-4" autoComplete='off'>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  autoComplete='new-password'
                />
              </div>

              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  autoComplete='new-password'
                />
              </div>

              <a href="#" className="block text-right text-sm text-gray-600 hover:text-gray-900 mb-4">
                Forgot password?
              </a>

              <button
                type="submit"
                className="w-full py-3 bg-gray-900 hover:text-gray-300 text-white font-medium rounded-xl hover:bg-gray-800 shadow-lg"
              >
                Get Started
              </button>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default Login