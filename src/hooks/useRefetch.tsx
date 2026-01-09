import { useEffect } from 'react'
import { useGetAssignedChatsQuery, useGetWaitingChatsQuery, useGetGuestChatStatusQuery, useGetNotificationsQuery } from '../services/service';
import { setAssignedChats, setNotifications } from '../store/slices/agent';
import { setHasNotificationsSoundPlayed, setTickets } from '../store/slices/base';
import { setGuestMessages, setGuestStatus } from '../store/slices/guest';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setHasAutoOpened } from '../store/slices/base';
import { selectNotificationsArray } from '../utils/selectors';

/* Refetches and re-set assigned chats  */
export const useRefetchMyChat = () => {
  const dispatch = useDispatch();
  const is_superuser = useSelector((state: any) => state.user.is_superuser);
  const { data: assignChatsData } = useGetAssignedChatsQuery<any>(undefined, { skip: is_superuser });

  useEffect(() => {
    dispatch(setAssignedChats(assignChatsData?.chats || []));
  }, [assignChatsData, dispatch]);

  return {
    
  }
}


/* Refetches and re-set waiting chats  */
export const useRefetchWaitingChats = () => {
  const dispatch = useDispatch();
  const is_superuser = useSelector((state: any) => state.user.is_superuser);
  const { data: waitingChatsData } = useGetWaitingChatsQuery<any>(undefined, { skip: is_superuser });

  useEffect(() => {
    dispatch(setTickets(waitingChatsData?.chats || []));
  }, [waitingChatsData, dispatch]);

  return {
    
  }
}

/* Refetches Notifications */
export const useRefetchNotifications = () => {
  const dispatch = useDispatch();
  const { data: notificationsData } = useGetNotificationsQuery<any>(undefined, { skip: false });
  const unreadNotifications = useSelector(selectNotificationsArray).filter(notif => !notif.is_read);
  const lastFiveNotifications = unreadNotifications.sort((a, b) => 
    (Number(a.is_read) - Number(b.is_read))
  ).slice(0, 5);

  useEffect(() => {
    dispatch(setNotifications(notificationsData?.notifications || []));
    if (lastFiveNotifications.some(n => n.notification_type === 'new_message' || n.notification_type === 'new_chat')) {
      dispatch(setHasNotificationsSoundPlayed(false));
      dispatch(setHasAutoOpened(false));
    }
  }, [notificationsData, dispatch]);

  return {
    
  }
}

/* Refetches guest chat status */
export const useRefetchGuestChatStatus = () => {
  const { id: chat_room_id, /* session_id: sessionId, */ status } = useSelector((state: any) => state.guest);
  // Ejecuta la query si hay sessionId y el status no es 'closed' ni 'resolved'
  const skipQuery = status === 'closed' || status === 'resolved';
  const { data: guestChatStatusData } = useGetGuestChatStatusQuery<any>({ chat_room_id }, { skip: skipQuery, refetchOnMountOrArgChange: true });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!guestChatStatusData) return;

    let settableMessages = guestChatStatusData?.message_history || [];
    settableMessages = settableMessages.filter((msg: any) => msg.sender_type !== 'system')
      .map((msg: any) => ({
        type: msg.sender_type === 'user' ? 'guest' : (msg.sender_type === 'agent' || msg.sender_type === 'system') ? 'agent' : 'unknown',
        content: msg.content
      }));
    dispatch(setGuestStatus(guestChatStatusData?.status || ''));
    if (settableMessages.length > 0) {
      dispatch(setGuestMessages([]))
      dispatch(setGuestMessages(settableMessages));
    }
  }, [guestChatStatusData, dispatch]);

  return {};
}