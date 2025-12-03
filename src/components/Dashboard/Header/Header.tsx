import { logUserOut } from "../../../utils/actions"
import { useSelector } from "react-redux"
import type { UserState } from "../../../types/Slices";
import { Notifications } from "./Notifications";
import { useNavigate, useLocation } from "react-router-dom";
import { unsetSelectedTicketId } from "../../../store/slices/base";
import { useDispatch } from "react-redux";

const Header = () => {
  const user = useSelector((state: any) => state.user) as UserState;
  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim(); 
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleOnClick = () => {
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
    } else {
      dispatch(unsetSelectedTicketId());
    }
  }

  return (
    <div className="navbar bg-gray-600 shadow-sm">
      <div className="navbar-start">

        <a className="btn btn-ghost text-lg !text-sky-50" onClick={handleOnClick}>Agente</a>
      </div>

      <div className="navbar-end gap-4">

        <Notifications />

        <span
          className="welcome text-sm font-medium leading-4 text-gray-200"
        >
          Bienvenido, <br/> 
          {fullName || user.username || 'Usuario'}!
        </span>
        <a className="btn !text-primary !bg-secondary" onClick={logUserOut}>Log out</a>
      </div>
    </div>
  )
}

export default Header