import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetTokenMutation, useLoginMutation } from "../services/service";
import type { LOGINJWTSuccess, LoginSuccess } from "../types/Slices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser, setAuthToken } from "../utils/actions";

interface LoginForm {
  username: string;
  password: string;
}

/* Create yup validation schema */
  const schema = yup.object().shape({
    username: yup.string().required('Usuario es requerido'),
    password: yup.string().required('Contraseña es requerida').min(6, 'Contraseña debe tener al menos 3 caracteres'),
  }); 

const useLogin = () => {
  const [getTokenMutation, resMutation] = useGetTokenMutation();
  const [loginMutation] = useLoginMutation();
  const { isLoading } = resMutation;
    /* Fetch tickets */
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  /* Classes for Login */
  const classNames = {
    container: "relative min-h-screen flex items-center justify-center p-4 pt-0 w-[100vw]",
    passwordForgot: "block text-right text-sm text-gray-600 hover:text-gray-900 mb-4 max-w-max float-end caret-transparent",
    welcome: "!text-2xl font-bold text-gray-900 mb-2",
    back: "w-5 h-5 text-white-700 hover:text-gray-300",
    inputBase: "w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all text-gray-900",
    icon: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",
    cardWrapper: "bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30",
    backBtn: "mb-6 p-2 rounded-full bg-[#1a1a1a] hover:bg-white/80 transition-all shadow-md",
    submitBtn: "w-full py-3 bg-gray-900 hover:text-gray-300 text-white font-medium rounded-xl hover:bg-gray-800 shadow-lg caret-transparent"
  }

  const onSubmit = async (data: LoginForm) => {
    const getTokenPromise = getTokenMutation(data).unwrap(); // returns typed payload or throws
    const error = (resMutation as any).error;
    toast.promise(getTokenPromise, {
      loading: 'Logging in...',
      success: 'Login exitoso',
      error: error?.data || 'Error en el login',
    });
    try {
        const result = await getTokenPromise as LOGINJWTSuccess; // no second request, sólo espera el mismo promise
        // if your endpoint returns { success, data }, access it:
        if (!result) {
          // failure branch — LoginFailure
          toast.error('Error inesperado durante el login');
          return;
        }
        setAuthToken(result);
        const loginResults = await loginMutation(data).unwrap() as LoginSuccess;
        await setLoggedInUser(loginResults);
        navigate('/dashboard')
      } catch (err: any) {
        console.error('login failed', err);
        // already handled by toast.promise, but you can add extra handling here
      }
  }

  return {
    classNames,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading
  }
}

export default useLogin