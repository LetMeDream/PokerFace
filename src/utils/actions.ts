import { logout, login, setToken } from "../store/slices/auth"
import { clearUser, setUser } from "../store/slices/user"
import { unsetChatProfile, setChatProfile } from "../store/slices/agent"
import { unsetBase, setTickets } from "../store/slices/base"
import { store } from "../store/store"
import type { LOGINJWTSuccess, LoginSuccess } from "../types/Slices"
import { tribet_api } from "../services/service"
import toast from "react-hot-toast"
import { getApiErrorMessage } from "../utils/helpers"

export const logUserOut = async () => {
  const result = await store.dispatch(tribet_api.endpoints.logout.initiate())
  // Check for error in the API without typescript yelling at us
  if ('error' in result && result.error) {
    console.error("Logout failed", result.error);
    const message = getApiErrorMessage(result);
    toast.error(message);
    return;
  } else {
    store.dispatch(logout())
    store.dispatch(clearUser())
    store.dispatch(unsetChatProfile())
    store.dispatch(unsetBase())
    toast.success("Logged out successfully")
  }

}
  
/* Set Token coming from /token */
export const setAuthToken = (token: LOGINJWTSuccess) => {
  store.dispatch(setToken(token))
  // Here we would set the token in the auth slice if needed
  // But for now, we just mark as logged in
}

/* Set user info coming from Login */
export const setLoggedInUser = async (result: LoginSuccess) => {
  const { user: userData, agent: agentData } = result;
  store.dispatch(setUser(userData))
  store.dispatch(setChatProfile(agentData))
  store.dispatch(login())
  /* 
  TODO: Fetch initial data after login (I thing its done)
  */
  const res: any = await store.dispatch(tribet_api.endpoints.getWaitingChats.initiate())
  const chats = res?.data?.chats ?? []
  store.dispatch(setTickets(chats))
}
