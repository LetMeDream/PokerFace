import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import './ContactForm.css'

const ContactForm = ({
  isSending,
  setIsSending,
  setIsUserConected
}: {
  isSending: boolean;
  setIsSending: (animating: boolean) => void;
  setIsUserConected: (connected: boolean) => void;
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

  const handleClick = () => {
    if (isSending) return; // prevent duplicate animations

    setIsSending(true);

    // simulate async submit (replace with real request)
    setTimeout(() => {
      setIsSending(false); // reset animation state
      setIsUserConected(true); // mark user connected
    }, 3000); // match animation duration
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
              className={`!bg-green-500 text-white py-2.5 px-4 rounded-lg font-semibold !hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 mt-2 relative overflow-hidden mx-auto w-full ${isSending ? 'animate-compress-spin' : ''}`}
            >
              {/* text toggled during animation */}
              <span className={`transition-opacity duration-75 ${!isSending ? 'opacity-100' : 'opacity-0'}`}>
                Send
              </span>
              
              {/* spinner shown while animating */}
              
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-75 ${isSending ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
              </div>
              
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