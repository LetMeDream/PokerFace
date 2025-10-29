import { logUserOut } from "../../utils/actions"
import { useSelector } from "react-redux"
import type { UserState } from "../../types/Slices";

const Header = () => {
  const user = useSelector((state: any) => state.user) as UserState;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">

        <a className="btn btn-ghost text-xl !text-primary">Logo</a>
      </div>

      <div className="navbar-end gap-4">
        <span>
          Bienvenido, {user.username || 'Usuario'}!
        </span>
        <a className="btn !text-primary !bg-secondary" onClick={logUserOut}>Log out</a>
      </div>
    </div>
  )
}

export default Header