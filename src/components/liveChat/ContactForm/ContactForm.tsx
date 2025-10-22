import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useState } from "react";
import './ContactForm.css'

const ContactForm = ({
  isAnimating,
  setIsAnimating
}: {
  isAnimating: boolean;
  setIsAnimating: (animating: boolean) => void;
}) => {
  type FormValues = {
    name: string;
    phone: string;
    email: string;
  };

  const { register, handleSubmit, /* formState: { errors } */ } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      name: 'Test User',
      phone: '123345567',
      email: ''
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const [showText, setShowText] = useState(true);

  const handleClick = () => {
    if (isAnimating) return; // Evita múltiples animaciones si se hace clic rápido

    setIsAnimating(true);
    setShowText(false); // Oculta el texto al inicio de la animación

    // Aquí simularías una acción asíncrona (ej. envío de formulario)
    // Por simplicidad, usaremos un setTimeout
    setTimeout(() => {
      // Después de la animación, el botón vuelve a su estado normal
      setIsAnimating(false);
      setShowText(true); // Muestra el texto de nuevo
    }, 3000); // Ajusta este tiempo para que coincida con la duración total de tu animación
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 mb-1">
        <p className="text-sm text-gray-700 text-center mb-2">
          Please fill in your contact information to send this message.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm border border-gray-100">
          <form className="flex flex-col gap-5" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-green-600">Your name</label>
              <input
                type="text"
                id="name"
                required
                className="w-full border-0 border-b-2 border-gray-200 focus:border-green-500 focus:ring-0 pt-1 px-0 text-sm"
                autoComplete="new-password"
                {...register("name")}
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-green-600">Your phone</label>
              <div className="flex items-center border-b-2 border-gray-200 focus-within:border-green-500">
                <input
                  type="tel"
                  id="phone"
                  className="w-full border-0 focus:ring-0 p-1 pl-2 text-sm"
                  placeholder="+54 9 11 1234-5678"
                  autoComplete="off"
                  {...register("phone")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-green-600">Your email*</label>
              <input
                type="email"
                id="email"
                required
                className="w-full border-0 border-b-2 border-gray-200 focus:border-green-500 focus:ring-0 pt-1 px-0 text-sm"
                autoComplete="off"
                {...register("email")}
              />
            </div>


            {/* Send Contact Form Button */}
            <button
              type="button" // use button (not form submit)
              onClick={handleClick}
              onMouseDown={(e) => e.preventDefault()} // prevent focus stealing on mousedown
              className={`!bg-green-500 text-white py-2.5 px-4 rounded-lg font-semibold !hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 mt-2 relative overflow-hidden mx-auto w-full ${isAnimating ? 'animate-compress-spin' : ''}`}
              style={{
                  // compact square when animating
                  minWidth: isAnimating ? '40px' : 'auto',
                  height: isAnimating ? '40px' : 'auto',
              }}
            >
              {/* text toggled during animation */}
              <span className={`transition-opacity duration-200 ${showText ? 'opacity-100' : 'opacity-0'}`}>
                Send
              </span>
              
              {/* spinner shown while animating */}
              {isAnimating && (
                  <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
                  </div>
              )}
            </button>



          </form>
        </div>

        {/* Branding link */}
        <a 
          className="text-xs text-gray-500 hover:text-gray-600 text-center mt-2 block"
          target="_blank"
          rel="noopener noreferrer"
        >
          Business Messenger by SSN
        </a>
      </div>
    </>
  )
}

export default ContactForm