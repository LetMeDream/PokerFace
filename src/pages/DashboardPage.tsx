import useDashboard from "../hooks/useDashboard";
import { setSelectedTicket } from "../store/slices/base";
import { useDispatch } from "react-redux";
import type { ChatTicket } from "../types/Slices";
import { useSelector } from "react-redux";
import SideBar from "../components/Dashboard/SideBar";
import DrawersContent from "../components/Dashboard/DrawersContent";

export default function DashboardPage() {
  const { drawerButtonRef, containerRef, searchValue, setSearchValue, classnames } = useDashboard();
  const selectedTicket = useSelector((state: any) => state.base.selectedTicket);

  const dispatch = useDispatch();

  const handleTicketClick = (ticket: ChatTicket) => {
    dispatch(setSelectedTicket(ticket));
  };

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <DrawersContent
            classnames={classnames}
            containerRef={containerRef}
            selectedTicket={selectedTicket}
            drawerButtonRef={drawerButtonRef}
          />
        </div>

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

