import React from 'react'
import Header from './Header';
import GeneralInbox from './GeneralInbox/GeneralInbox';
import { useSelector } from 'react-redux';
/* We NORMALIZED tickets in our store, so now we need to SELECT them properly */
import { selectTicketsByChatRoomId } from '../../utils/selectors';
import type { RootState } from '../../store/store';
import AgentChat from './AgentChat';

const DrawersContent = ({classnames, containerRef, drawerButtonRef}: {
  classnames: { container: string; drawerBtn: string };
  containerRef: React.RefObject<HTMLDivElement | null>;
  drawerButtonRef: React.RefObject<HTMLLabelElement | null>; 
}) => {
  const selectedTicketId = useSelector((state: any) => state.base.selectedTicketId);
  const chatRoomId = useSelector((state: RootState) => state.chatProfile.chat_id);
  const tickets = useSelector((state: RootState) => selectTicketsByChatRoomId(state.base, chatRoomId));
  const ticketsQty = tickets.length;
  /*
  TODO: Commented since we would need to pass searchValue from DashboardPage to here
  TODO: and currently 'searchValue' is a local state of DashboardPage only used in SideBar component.
  TODO: Would need to change that to a global state or context to be able to use it here.
  */
  // const filteredTickets = useSelector((state: RootState) => selectFilteredTicketsByChatRoomId(state.base, chatRoomId));

  return (
    <div 
            className={classnames.container}
            ref={containerRef}
          >
            {/* Header */}
            <Header />

            {/* Current Selected chat conversation */}
            {selectedTicketId ? (                
              <AgentChat selectedTicketId={selectedTicketId} />
            ) : (
                <GeneralInbox />
            )}

            {/* Button for drawer */}
            <label 
              htmlFor="my-drawer-1" className={classnames.drawerBtn}
              ref={drawerButtonRef}
            >
                Conversaciones <span className="badge bg-secondary">{ticketsQty}</span>
            </label>
          </div>  
  )
}

export default DrawersContent