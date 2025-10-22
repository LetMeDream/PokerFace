import { useState, useEffect } from "react";

interface ContactFormProps {
  chatMessages: { type: string; content: string; }[];
  chatBodyRef: React.RefObject<HTMLDivElement | null>;
}

const useContactForm = ({ chatMessages, chatBodyRef }: ContactFormProps) => {
  /* Variables used to handle the form for the 'register' logic */
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [isUserConected] = useState(false);
  /* useEffect to show the Contact Form */
  useEffect(() => {
    if (chatMessages.length === 1) {
      setTimeout(() => {
        setIsContactFormVisible(true);
        // Scroll to bottom when contact form appears
        console.log(chatBodyRef.current)
        setTimeout(() => {
          if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
          }
        }, 10);

      }, 1300);
    }
  }, [chatMessages])
  /* Contact Form, after initial message */
  const contactFormMessage = () => (
    <>
      <div className="flex flex-col items-center justify-center px-4 mb-1">
        <p className="text-sm text-gray-700 text-center mb-2">
          Please fill in your contact information to send this message.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm border border-gray-100">
          <form className="flex flex-col gap-5" autoComplete="off">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-green-600">Your name</label>
              <input
                type="text"
                id="name"
                required
                className="w-full border-0 border-b-2 border-gray-200 focus:border-green-500 focus:ring-0 pt-1 px-0 text-sm"
                autoComplete="new-password"
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
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 mt-2"
            >
              Send
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
  );


  return {
    contactFormMessage,
    isContactFormVisible,
    setIsContactFormVisible,
    isUserConected
  }
}

export default useContactForm