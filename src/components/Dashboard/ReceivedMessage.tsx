import { useState } from 'react'
import { FaUserAstronaut } from "react-icons/fa6";

const ReceivedMessage = ({
  avatarSrc,
  name,
  messages,
  onClick
}: {
  avatarSrc: string;
  name: string;
  messages: any;
  onClick: () => void;
}) => {
  const [imgError, setImgError] = useState(false);
  const lastMessage = messages?.length ? messages[messages.length - 1] : null;

  return (
    <li className="flex-row items-center flex-nowrap group !rounded-sm border min-h-[80px] max-w-full" onClick={onClick}>
      {/* Avatar */}
      {avatarSrc && !imgError ? (
            /* Avatar image */
            <div className="rounded-l-sm rounded-r-none !basis-3/12 group-hover:!bg-slate-600 self-stretch flex justify-center items-center">
              <div className="mask mask-squircle w-12">
                <img src={avatarSrc} onError={() => setImgError(true)} />
              </div>
            </div>
          ) : (
            /* Fallback avatar */
            <div className="rounded-l-sm self-stretch flex justify-center group-hover:!bg-slate-600">
              <FaUserAstronaut className="text-white w-12 h-12" />
            </div>
          )}

      {/* Content */}
      <div className="content rounded-r-sm rounded-l-none flex flex-col overflow-hidden items-start grow group-hover:!bg-slate-600 relative -left-[0.75px] self-stretch">
        <a className="!text-primary">{name}</a>
        <span className="text-sm text-white break-words">{lastMessage?.content}</span>
      </div>
    </li>
  )
}

export default ReceivedMessage