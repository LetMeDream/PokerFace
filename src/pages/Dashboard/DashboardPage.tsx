import useDashboard from "../../hooks/useDashboard";
import SideBar from "../../components/Dashboard/SideBar";
import DrawersContent from "../../components/Dashboard/DrawersContent";
import { useSelector } from "react-redux";
import SuperUserDrawersContent from "../../components/Dashboard/SuperUserDrawersContent";
import { useRefetchNotifications } from "../../hooks/useRefetch";

export default function DashboardPage() {
  useRefetchNotifications();
  const { drawerButtonRef, containerRef, searchValue, setSearchValue, classnames } = useDashboard();
  const is_superuser = useSelector((state: any) => state.user.is_superuser);

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
          />
        </div>
      </div>

    </>
  );
}

