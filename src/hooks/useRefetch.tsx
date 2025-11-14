import { useEffect } from 'react'
import { useGetAssignedChatsQuery, useGetWaitingChatsQuery, useGetGuestChatStatusQuery } from '../services/service';
import { setAssignedChats } from '../store/slices/agent';
import { setTickets } from '../store/slices/base';
import { setGuestMessages } from '../store/slices/guest';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

/* Refetches and re-set assigned chats  */
export const useRefetchMyChat = () => {
  const dispatch = useDispatch();
  const { data: assignChatsData } = useGetAssignedChatsQuery<any>(undefined, { pollingInterval: 5000 });

  useEffect(() => {
    dispatch(setAssignedChats(assignChatsData?.chats || []));
  }, [assignChatsData, dispatch]);

  return {
    
  }
}


/* Refetches and re-set waiting chats  */
export const useRefetchWaitingChats = () => {
  const dispatch = useDispatch();
  const { data: waitingChatsData } = useGetWaitingChatsQuery<any>(undefined, { pollingInterval: 5000 });

  useEffect(() => {
    dispatch(setTickets(waitingChatsData?.chats || []));
  }, [waitingChatsData, dispatch]);

  return {
    
  }
}


/* Refetches guest chat status */
export const useRefetchGuestChatStatus = () => {
  const { id: chat_room_id, session_id: sessionId } = useSelector((state: any) => state.guest);
  const skipQuery = !sessionId;
  const { data: guestChatStatusData } = useGetGuestChatStatusQuery<any>({ chat_room_id }, { pollingInterval: 5000, skip: skipQuery });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(guestChatStatusData)
    
    let settableMessages = guestChatStatusData?.message_history || [];
    // Map the messages to match the guest slice structure
    settableMessages = settableMessages.filter((msg: any) => msg.sender_type !== 'system')
    .map((msg: any) => ({
      type: msg.sender_type === 'user' ? 'guest' : (msg.sender_type === 'agent' || msg.sender_type === 'system') ? 'agent' : 'unknown',
      content: msg.content
    }));
    console.log(settableMessages)
    dispatch(setGuestMessages(settableMessages));


    // setGuestMessages(guestChatStatusData?.message_history || []);
  }, [guestChatStatusData, dispatch]);

  return {
    
  }
}