import useDashboard from "../hooks/useDashboard";
import { setSelectedTicketId } from "../store/slices/base";
import { useDispatch } from "react-redux";
import type { ChatTicket } from "../types/Slices";
import SideBar from "../components/Dashboard/SideBar";
import DrawersContent from "../components/Dashboard/DrawersContent";
import { useSelector } from "react-redux";
import SuperUserDrawersContent from "../components/Dashboard/SuperUserDrawersContent";

export default function DashboardPage() {
  const { drawerButtonRef, containerRef, searchValue, setSearchValue, classnames } = useDashboard();
  const is_superuser = useSelector((state: any) => state.user.is_superuser);

  const dispatch = useDispatch();

  const handleTicketClick = (ticket: ChatTicket) => {
    dispatch(setSelectedTicketId(ticket.id));
  };

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        
        {/* General Chat Dashboard; for agents */}
        { !is_superuser ? (
          <div className="drawer-content">
            {/* Page content here */}
            <DrawersContent
              classnames={classnames}
              containerRef={containerRef}
              drawerButtonRef={drawerButtonRef}
            />
          </div>
        ) : (<>
          {/* Dashboard of Agents; for superusers */}
          <div className="drawer-content">
            <SuperUserDrawersContent
              classnames={classnames}
              containerRef={containerRef}
              // drawerButtonRef={drawerButtonRef}
            />
          </div>
          </>
        )}



        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
          <SideBar 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            classnames={classnames}
            handleTicketClick={handleTicketClick}
          />
        </div>
      </div>

    </>
  );
}

