import React from 'react'
import Header from './Header';
import GeneralInbox from './GeneralInbox/GeneralInbox';
import { useSelector } from 'react-redux';
/* We NORMALIZED tickets in our store, so now we need to SELECT them properly */
import { selectTicketsArray } from '../../utils/helpers';
import type { RootState } from '../../store/store';
import AgentChat from './AgentChat';

const DrawersContent = ({classnames, containerRef, drawerButtonRef}: {
  classnames: { container: string; drawerBtn: string };
  containerRef: React.RefObject<HTMLDivElement | null>;
  drawerButtonRef: React.RefObject<HTMLLabelElement | null>; 
}) => {
  const selectedTicketId = useSelector((state: any) => state.base.selectedTicketId);
  const tickets = useSelector((state: RootState) => selectTicketsArray(state.base));
  const ticketsQty = tickets.length;

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