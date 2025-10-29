


export default function DashboardPage() {

  /* Make .container 100vh, by calculating  */

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div 

            className='bg-amber-50 container min-h-screen min-w-screen'
          >
        
            {/* Header */}
            <div className="navbar bg-base-100 shadow-sm">
              <div className="navbar-start">
                {/* <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                  </div>
                  <ul
                    tabIndex={-1}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a>Item 1</a></li>
                    <li>
                      <a>Parent</a>
                      <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                      </ul>
                    </li>
                    <li><a>Item 3</a></li>
                  </ul>
                </div> */}
                <a className="btn btn-ghost text-xl">Logo</a>
              </div>
              {/* <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  <li><a>Item 1</a></li>
                  <li>
                    <details>
                      <summary>Parent</summary>
                      <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                      </ul>
                    </details>
                  </li>
                  <li><a>Item 3</a></li>
                </ul>
              </div> */}
              <div className="navbar-end">
                <a className="btn">Log out</a>
              </div>
            </div>

          <label htmlFor="my-drawer-1" className="btn drawer-button rounded-none absolute bottom-[0.5px] left-[0.25px]">Open drawer</label>
          </div>  
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        </div>
      </div>

    </>
  );
}