import { logout, login } from "../store/slices/auth"
import { clearUser, setUser } from "../store/slices/user"
import { unsetChatProfile, setChatProfile } from "../store/slices/agent"
import { unsetBase, setTickets } from "../store/slices/base"
import { store } from "../store/store"
import type { LoginSuccess } from "../types/Slices"
import { mockApi } from "../services/service"
import toast from "react-hot-toast"
import { getApiErrorMessage } from "../utils/helpers"

export const logUserOut = async () => {
  const result = await store.dispatch(mockApi.endpoints.logout.initiate())
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
  
export const setLoggedInUser = async (result: LoginSuccess) => {
  const { user: userData, agent: agentData, token } = result;
  store.dispatch(setUser(userData))
  store.dispatch(setChatProfile(agentData))
  store.dispatch(login({ token }))
  /* 
  TODO: Fetch initial data after login (I thing its done)
  */
  const res: any = await store.dispatch(mockApi.endpoints.getWaitingChats.initiate())
  const chats = res?.data?.chats ?? []
  store.dispatch(setTickets(chats))
}
