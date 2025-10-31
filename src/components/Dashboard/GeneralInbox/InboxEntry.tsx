import React from 'react'
import { SlOptionsVertical } from "react-icons/sl";
import { HiUserAdd } from "react-icons/hi";

const longText = ` "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
"Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.

"Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.`;


const InboxEntry = () => {
  return (
    <>
      <div className="">
          <div className="flex items-center gap-3 p-3 bg-cyan-50 text-secondary transition-colors">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                className="w-10 h-10 rounded-xl object-cover"
                src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                alt="Avatar"
              />
            </div>

            {/* Nombre + Estado + Mensaje */}
            <div className="flex-1 min-w-0 flex gap-2 max-h-[60px]">
              {/* Columna: Nombre y Status */}
              <div className="flex flex-col flex-1 basis-1/5 md:basis-2/6 truncate">
                <div className="md:px-2 text-sm font-medium truncate">
                  Dio LupaDio LupaDio LupaDio LupaDio Lupasadasdasdas
                </div>
                <div className="md:px-2 text-xs uppercase font-semibold opacity-60">
                  Status
                </div>
              </div>

              {/* Columna: Último mensaje */}
              <div className="flex-1 basis-4/5 md:basis-4/6">
                <p className="text-xs text-gray-700 line-clamp-3 overflow-hidden">
                  {longText}
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2">
              {/* Asignar e ir */}
              <div
                title="Asignar e Ir a conversación"
                aria-label="Asignar ticket y abrir conversación"
                className="text-indigo-700 hover:text-indigo-900 transition-colors"
                onClick={() => {
                  const dialog = document.getElementById('my_modal_1') as HTMLDialogElement | null;
                  if (dialog) dialog.showModal();
                }}
              >
                <HiUserAdd className="w-5 h-5" />
              </div>

              {/* Menú de opciones */}
              <div className="relative">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <SlOptionsVertical role='button' tabIndex={0} className="!w-5 !h-5 text-indigo-700 hover:text-indigo-900 focus:text-indigo-900" />
                  <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>
                      <a>
                        Asignar 
                      </a>
                    </li>
                    <li>
                      <a>
                        Marcar como Resuelto
                      </a>
                    </li>
                    <li>
                      <a>
                        Eliminar
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default InboxEntry