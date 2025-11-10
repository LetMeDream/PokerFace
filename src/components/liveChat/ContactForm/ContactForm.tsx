import './ContactForm.css'
import { useForm, FormProvider } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import type { FormValues } from "../../../types/Chat"
import { ContactFormSchema } from '../../../constants/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState, useEffect } from 'react'
import ReCaptcha from 'react-google-recaptcha'
import { useCompleteChatMutation } from '../../../services/service'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'
import { handleCompleteChatError } from '../../../utils/helpers'

const ContactForm = ({
  isSending,
  setIsSending,
  setIsUserConected,
  isUserConected,
  chatBodyRef
}: {
  isSending: boolean;
  setIsSending: (animating: boolean) => void;
  setIsUserConected: (connected: boolean) => void;
  isUserConected: boolean;
  chatBodyRef: React.RefObject<HTMLDivElement | null>;
}) => {


  // Use FormValues as the form generic and cast the resolver to that type to avoid type mismatch
  const methods = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(ContactFormSchema),
    defaultValues: {
      name: 'Test User',
      email: 'test@example.com',
      phone: undefined,
    }
  });

  const { register, handleSubmit, formState: { isValid } } = methods;
  const { guestSessionId } = useSelector((state: RootState) => state.auth); // get chat state if needed

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  const [completeChat, { isSuccess, isError, error }] = useCompleteChatMutation();

  const handleSend = () => {
    if (isSending) return; // prevent duplicate animations
    (document.activeElement as HTMLElement | null)?.blur(); // remove focus from input
    setIsSending(true);
    const values = methods.getValues();
    completeChat({
      session_id: guestSessionId,
      email: values.email,
      full_name: values.name,
      phone_number: values.phone || '',
      recaptcha_token: values.recaptcha,
    }).unwrap()

    // simulate async submit (replace with real request)

  };


  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSending(false); // reset animation state
        setIsUserConected(true); // mark user connected
      }, 1000); // match animation duration
    } else if (isError) {
      setTimeout(() => {
        setIsSending(false); // reset animation state
        handleCompleteChatError(error);
      }, 1000);
    }
  }, [isSuccess, setIsSending, setIsUserConected, isError, error]);


  const [isAgentAlerted, setIsAgentAlerted] = useState(false);

  useEffect(() => {
    if (isUserConected) {
      setTimeout(() => {
        setIsAgentAlerted(true);
      }, 333);
    }
  }, [isUserConected]);

  useEffect(() => {
    setTimeout(() => {
      if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, 333);
  }, [isAgentAlerted, chatBodyRef]);

  return (
    <>
      <FormProvider {...methods}>
        <div className="flex flex-col items-center justify-center px-4 mb-1">
          <p className="text-sm text-gray-600 text-center mb-2">
            Por favor complete su información de contacto para enviar este mensaje.
          </p>

          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm border border-gray-100">
            <form className="flex flex-col gap-5" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="text-sm font-medium text-green-600">Tu nombre*</label>
                <div className="flex items-center border-b-2 border-gray-200 focus-within:border-green-500">
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full border-0 focus:ring-0 p-1 pl-2 text-sm focus-visible:!outline-none focus-visible:!ring-1 focus-visible:ring-green-300 rounded-sm"
                    autoComplete="new-password"
                    {...register("name")}
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="text-sm font-medium text-green-600">Tu correo electrónico*</label>
                <div className="flex items-center border-b-2 border-gray-200">
                  <input
                    type="email"
                    id="email"
                    required 
                    className="w-full border-0 focus:ring-0 p-1 pl-2 text-sm focus-visible:!outline-none focus-visible:!ring-1 focus-visible:ring-green-300 rounded-sm"
                    autoComplete="off"
                    {...register("email")}
                  />
                </div>
              </div>
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-green-600">Tu teléfono*</label>
                <div className="flex items-center border-b-2 border-gray-200 focus-within:border-green-500">
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border-0 focus:ring-0 p-1 pl-2 text-sm focus-visible:!outline-none focus-visible:!ring-1 focus-visible:ring-green-300 rounded-sm"
                    placeholder="+54 9 11 1234-5678"
                    autoComplete="off"
                    {...register("phone")}
                  />
                </div>
              </div>
              <div className={`
                  w-full overflow-hidden
                  ${isUserConected ? 'hidden' : 'block'}
                `
              }>
                <ReCaptcha 
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} 
                  onChange={(value: string | null) => {
                    methods.setValue('recaptcha', value || '', {
                      shouldValidate: true,   // ← Fuerza validación
                      shouldDirty: true,      // ← Marca como "sucio"
                      shouldTouch: true,      // ← Marca como "tocado"
                    });
                  }}
                />
              </div>
              {/* Send Contact Form Button */}
              {!isUserConected && (
                <button
                  type="button" // use button (not form submit)
                  onClick={isValid ? handleSend : undefined}
                  onMouseDown={(e) => e.preventDefault()} // prevent focus stealing on mousedown
                  className={`
                    ${isUserConected ? 'opacity-50 !cursor-not-allowed' : ''}
                    ${isValid ? '!bg-green-500' : '!bg-gray-300 hover:!border-transparent'}
                    focus:!outline-none focus:!ring-2 focus:!ring-green-400 focus:!ring-opacity-75 
                  text-white py-2.5 px-4 rounded-lg font-semibold
                    mt-2 relative overflow-hidden mx-auto w-full transition duration-100
                    ${isSending ? 'animate-compress-spin' : ''} `
                  }
                  disabled={!isValid || isUserConected}
                >
                  {/* text toggled during animation */}
                  <span 
                    className={`transition-opacity duration-75 ${!isSending ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {!isUserConected ? 'Send' : 'Thank you! 🎉'} 
                  </span>
                  {/* spinner shown while animating */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-75 ${isSending ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
                  </div>
                </button>
              )}


              {/* Button for displaying when user is connected */}
              { isUserConected && (
                <button
                  type="button" // use button (not form submit)
                  onMouseDown={(e) => e.preventDefault()} // prevent focus stealing on mousedown
                  className={`
                    focus:!outline-none focus:!ring-2 focus:!ring-green-400 focus:!ring-opacity-75 
                  text-white py-2.5 px-4 rounded-lg font-semibold
                    mt-2 relative overflow-hidden mx-auto w-full transition duration-100 !bg-green-500`
                  }
                >
                  <span>
                    Thank you! 🎉
                  </span>
                  {/* spinner shown while animating */}
                  
                </button>
              )}
            </form>
          </div>

          {/* Branding link */}
          <a 
            className="text-[11px] !text-gray-500 hover:text-gray-600 text-center mt-2 block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Business Messenger by SSN
          </a>
        </div>
      </FormProvider>

      {/* Agent Alert */}
      {isAgentAlerted && (
        <div className="flex flex-col items-center justify-center px-4 mb-1">
          <p className="text-sm text-gray-600 text-center mb-2">Tu mensaje está siendo enviado al equipo. Se pondrán en contacto pronto.</p>
        </div>
      )}
    </>
  )
}

export default ContactForm