import { useState } from 'react'
import { FaUserAstronaut } from "react-icons/fa6";

const ReceivedMessage = ({
  avatarSrc,
  name,
  messages
}: {
  avatarSrc: string;
  name: string;
  messages: any;
}) => {
  const [imgError, setImgError] = useState(false);
  const lastMessage = messages?.length ? messages[messages.length - 1] : null;

  return (
    <li className="flex-row items-center flex-nowrap group !rounded-sm border min-h-[80px]">
      {/* Avatar */}
      {avatarSrc && !imgError ? (
            <div className="rounded-l-sm rounded-r-none !basis-3/12 group-hover:!bg-slate-600">
              <div className="mask mask-squircle w-12">
                <img src={avatarSrc} onError={() => setImgError(true)} />
              </div>
            </div>
          ) : (
            <div className="rounded-l-sm self-stretch flex justify-center group-hover:!bg-slate-600">
              <FaUserAstronaut className="text-white w-12 h-12" />
            </div>
          )}

      {/* Content */}
      <div className="content rounded-r-sm rounded-l-none flex flex-col items-start grow group-hover:!bg-slate-600 relative -left-[0.75px] self-stretch">
        <a className="!text-primary">{name}</a>
        <span className="text-sm text-white">{lastMessage?.content}</span>
      </div>
    </li>
  )
}

export default ReceivedMessage