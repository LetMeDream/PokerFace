import { useRef, useEffect, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { setHasAutoOpened, addTicket, removeTicket } from "../store/slices/base";
import { useDispatch } from "react-redux";
import { useRefetchWaitingChats } from "./useRefetch";
import type { RootState } from "../store/store";
import { setAssignedChatMessage } from "../store/slices/agent";
import { endpoints } from "../constants/envSettings";
import type { NotificationItem } from "../types/Slices";
import { addNotification } from "../store/slices/agent";
import { addMessageToTicket } from "../store/slices/base";
import useSound from "use-sound";
import guest from '../assets/sounds/guest.mp3'

const useDashboard = () => {
  /* Resizing Logic */
  const drawerButtonRef = useRef<HTMLLabelElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Make .container 100vh, by calculating on Mobile */
  const isMobile = useMediaQuery('(max-width: 767px)');
  useEffect(() => {
    const drawerButtonHeight = drawerButtonRef.current?.offsetHeight || 0;
    if (isMobile && containerRef.current) {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      containerRef.current.style.minHeight = `${viewportHeight - drawerButtonHeight}px`;
    }
  }, [isMobile, drawerButtonRef, containerRef])
  /* Resizing Logic END */

  /* Opening drawer automatically upon login in */
  const { hasAutoOpened } = useSelector((state: any) => state.base);
  const is_superuser = useSelector((state: any) => state.user.is_superuser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!hasAutoOpened && !is_superuser) {
      setTimeout(() => {
        const drawerCheckbox = document.getElementById('my-drawer-1') as HTMLInputElement;
        if (drawerCheckbox) drawerCheckbox.checked = true;
        dispatch(setHasAutoOpened(true));
      }, 100);
    }
  }, [hasAutoOpened, dispatch]);
  /* Opening drawer automatically upon login in END */

  const classnames = {
    container: 'bg-secondary container !min-w-full !min-h-[100dvh]',
    drawerBtn: 'btn drawer-button bg-gray-600 rounded-none fixed bottom-[0.5px] left-[0.25px] px-10 py-6',
    searchInput: "input input-bordered w-full caret-primary active:!ring-1 focus-within:!ring-1 focus-visible:!ring-1 focus:!ring-1 active:!outline-none focus-within:!outline-none focus-visible:!outline-none focus:!outline-none active:!border-none focus-within:!border-none focus-visible:!border-none focus:!border-none"
  }

  /* Search logic value */
  const [searchValue, setSearchValue] = useState<string>('');
  useRefetchWaitingChats();
  const { token } = useSelector((state: RootState) => state.auth)
  const agentId = useSelector((state: RootState) => state.agent.id);
  const [ping] = useSound(guest);


  useEffect(() => {
    const ws = new WebSocket(`${endpoints.WS_BASE_URL}/my_chats/?token=` + token.access);
  
    /* Conectando con el web socket de Dashboard de agentes */
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log(data)

      
      if (data.type === 'guest_message') {
        // Manejar mensaje del guest
        const payload = {
          chat_room_id: data.room_id,
          message: data.message
        }
        dispatch(setAssignedChatMessage(payload));
        // Scroll to bottom could be handled in the component displaying the messages
        const agentChatBodyContainer = document.getElementById('agent-chat-body-scrollable-container');
        if (agentChatBodyContainer) {
          setTimeout(() => {
            agentChatBodyContainer.scrollTop = agentChatBodyContainer.scrollHeight;
          }, 10);
        }
      }

      if (data.type === 'new_chat') {
        dispatch(addTicket(data.chat_instance));
      }

      if (data.type === 'chat_taken_by_other') {
        dispatch(removeTicket({ ticketId: data.chat_id }));
      }

      if (data.type === 'chat_unassigned_by_other') {
        dispatch(addTicket(data.chat_instance));
      }

      if (data.type === 'chat_closed') {
        dispatch(removeTicket({ ticketId: data.chat_id }));
      }

      if (data.type === 'chat_resolved') {
        dispatch(removeTicket({ ticketId: data.chat_id }));
      }

      if (data.type === 'notify_new_chat') {
        const notificationForCurrentAgent = data?.notification?.length > 0 ? 
          data.notification.filter((n: NotificationItem) => n.agent_info.id === agentId) : data.notification; 
        if (!notificationForCurrentAgent[0]) {
          dispatch(addNotification(data?.notification));
        } else {
          dispatch(addNotification(notificationForCurrentAgent[0]));
        }
        ping();
      }

      if (data.type === 'notify_send_message') {
        let notificationForCurrentAgent = data?.notification?.length > 0 ? 
          data.notification.filter((n: NotificationItem) => n.agent_info.id === agentId) : data.notification; 
        if (!notificationForCurrentAgent[0]) {
          notificationForCurrentAgent = data?.notification;
          dispatch(addNotification(notificationForCurrentAgent));
        } else {
          dispatch(addNotification(notificationForCurrentAgent[0]));
        }
        ping();

        const completeMessage = data.message;
        const newMessage = {
          "sender_type": completeMessage.sender_type,
          "sender_diplay:": completeMessage.sender_display_name,
          "content": completeMessage.content,
          "created_at": completeMessage.created_at,
          "is_read": false
        }
        if (notificationForCurrentAgent[0]?.message) {
          dispatch(addMessageToTicket({
              chatRoomId: completeMessage.chat_room_id,
              message: newMessage
          }))
        }
      }

    };

    return () => ws.close();
  }, []);

  return {
    drawerButtonRef,
    containerRef,
    searchValue,
    setSearchValue,
    classnames
  }
}

export default useDashboard