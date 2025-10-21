import { useState } from "react";

const useChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const classnames = {
    // 'overflow-hidden' is crucial so the chat body is hidden when collapsed
    widgetWrapper: 'fixed rounded-tl text-sm bottom-0 left-10 max-w-[80vw] w-[310px] caret-transparent overflow-hidden !caret-transparent',
    // Base classes for the chat body; includes height/opacity transitions
    chatBody: 'bg-white h-[450px] shadow-lg flex flex-col transition-all duration-300 ease-in-out',
    // Clickable banner at the top
    banner: 'bg-gray-500 text-primary montserrat regular px-3 py-2 cursor-pointer flex items-center justify-between gap-2'
  };


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  /* Message for visitor */
  const agentMessage = (message: string) => (<>
    <div className="flex items-start gap-2.5 mb-4">
      <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" title="Guest"></div>
        <div className="flex flex-col gap-1">
          <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
            <p className="text-sm text-gray-700">{message}</p>
          </div>
        </div>
    </div>

  </>)

  /* Message for Service Agent */
  const guestMessage = (message: string) => (<>
    <div className="flex justify-end gap-2.5 mb-4">
      <div className="bg-green-600 text-white p-2 rounded-lg max-w-xs">
          <p className="text-sm">{message}</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" title="Dev"></div>
    </div>
  </>)

  return {
    isOpen,
    toggleChat,
    agentMessage,
    guestMessage,
    classnames
  }
}

export default useChat