
const useLogin = () => {

  /* Classes for Login */
  const classNames = {
    inputBase: "w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900",
    icon: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",
    cardWrapper: "bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30",
    backBtn: "mb-6 p-2 rounded-full bg-white/60 hover:bg-white/80 transition-all shadow-md",
    submitBtn: "w-full py-3 bg-gray-900 hover:text-gray-300 text-white font-medium rounded-xl hover:bg-gray-800 shadow-lg"
  }

  return {
    classNames
  }
}

export default useLogin