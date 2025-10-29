import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "../services/service";
import toast from "react-hot-toast";
import { setChatProfile } from "../store/slices/chat_profile";
import { setUser } from "../store/slices/user";
import { login } from "../store/slices/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
interface LoginForm {
  pk_username: string;
  pk_password: string;
}

/* Create yup validation schema */
  const schema = yup.object().shape({
    pk_username: yup.string().required('Usuario es requerido'),
    pk_password: yup.string().required('Contraseña es requerida').min(6, 'Contraseña debe tener al menos 3 caracteres'),
  }); 

const useLogin = () => {
  const [loginMutation, resMutation] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    defaultValues: {
      pk_username: '',
      pk_password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  /* Classes for Login */
  const classNames = {
    container: "relative min-h-screen flex items-center justify-center p-4 pt-0 w-[100vw]",
    passwordForgot: "block text-right text-sm text-gray-600 hover:text-gray-900 mb-4 max-w-max float-end",
    welcome: "!text-2xl font-bold text-gray-900 mb-2",
    back: "w-5 h-5 text-white-700 hover:text-gray-300",
    inputBase: "w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all text-gray-900",
    icon: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",
    cardWrapper: "bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30",
    backBtn: "mb-6 p-2 rounded-full bg-white/60 hover:bg-white/80 transition-all shadow-md",
    submitBtn: "w-full py-3 bg-gray-900 hover:text-gray-300 text-white font-medium rounded-xl hover:bg-gray-800 shadow-lg caret-transparent"
  }

  const onSubmit = async (data: LoginForm) => {
    console.log(data)
    const promise = loginMutation(data).unwrap(); // returns typed payload or throws
    const error = (resMutation as any).error;
    toast.promise(promise, {
      loading: 'Logging in...',
      success: 'Login exitoso',
      error: error?.data || 'Error en el login',
    });
    try {
        const result = await promise; // no second request, sólo espera el mismo promise
        console.log('result', result);
        // if your endpoint returns { success, data }, access it:
        if (!result.success) {
          // failure branch — LoginFailure
          toast.error(result.error || 'Invalid credentials');
          return;
        }
        const token = result?.data?.token;
        console.log('token', token);
        dispatch(login());
        dispatch(setChatProfile(result?.data?.chat_profile));
        dispatch(setUser(result?.data?.user));
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
    errors
  }
}

export default useLogin