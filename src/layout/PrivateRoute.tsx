// Import the 'Navigate' component from the 'react-router-dom' library.
import { Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

export interface AuthState {
  isLoggedIn: boolean
}

// Define the 'PrivateRoute' component as a functional component that takes 'children' as a prop.
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  // Use the 'useAuthStore' hook to check the user's authentication status.
  // It appears to be using a state management solution like 'zustand' or 'mobx-state-tree'.
  const { isLoggedIn } = useSelector((state: { auth: AuthState }) => state.auth)

  // Conditionally render the children if the user is authenticated.
  // If the user is not authenticated, redirect them to the login page.
  return isLoggedIn ? <>{children}</> : <Navigate to='/login' />
}

// Export the 'PrivateRoute' component to make it available for use in other parts of the application.
export default PrivateRoute
