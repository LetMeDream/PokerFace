import { logUserOut } from "../../../utils/actions"
import { useSelector } from "react-redux"
import type { UserState } from "../../../types/Slices";
import { Notifications } from "./Notifications";

const Header = () => {
  const user = useSelector((state: any) => state.user) as UserState;
  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim(); 

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">

        <a className="btn btn-ghost text-lg !text-sky-50">Agente</a>
      </div>

      <div className="navbar-end gap-4">

        <Notifications />

        <span
          className="welcome text-sm font-medium leading-4"
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