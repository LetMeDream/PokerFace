import { useEffect } from 'react'
import { useGetAssignedChatsQuery, useGetWaitingChatsQuery } from '../services/service';
import { setAssignedChats } from '../store/slices/agent';
import { setTickets } from '../store/slices/base';
import { useDispatch } from 'react-redux';

/* Refetches and re-set assigned chats  */
export const useRefetchMyChat = () => {
  const dispatch = useDispatch();
  const { data: assignChatsData } = useGetAssignedChatsQuery<any>(undefined, { pollingInterval: 4000 });

  useEffect(() => {
    dispatch(setAssignedChats(assignChatsData?.chats || []));
  }, [assignChatsData, dispatch]);

  return {
    
  }
}


/* Refetches and re-set waiting chats  */
export const useRefetchWaitingChats = () => {
  const dispatch = useDispatch();
  const { data: waitingChatsData } = useGetWaitingChatsQuery<any>(undefined, { pollingInterval: 4000 });

  useEffect(() => {
    dispatch(setTickets(waitingChatsData?.chats || []));
  }, [waitingChatsData, dispatch]);

  return {
    
  }
}