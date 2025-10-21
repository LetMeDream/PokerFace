import { useState } from "react";

const useChat = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    guestMessage
  }
}

export default useChat