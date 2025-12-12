import { logout, login, setToken, setKeepLoggedIn } from "../store/slices/auth"
import { clearUser, setUser } from "../store/slices/user"
import { unsetChatProfile, setChatProfile, setAssignedChats } from "../store/slices/agent"
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
  // ensure agent profile matches expected AgentState shape (add default assigned_chats)
  const normalizedAgent = {
    ...agentData,
    assigned_chats: (agentData as any)?.assigned_chats ?? []
  }
  store.dispatch(setUser(userData))
  store.dispatch(setChatProfile(normalizedAgent as any))
  store.dispatch(login())

  // Fetch tickets and assigned chats after login
  const allChatsRes: any = await store.dispatch(tribet_api.endpoints.getWaitingChats.initiate())
  const chats = allChatsRes?.data?.chats ?? []
  store.dispatch(setTickets(chats))

  const myChatsRes: any = await store.dispatch(tribet_api.endpoints.getAssignedChats.initiate())
  const myChats = myChatsRes?.data?.chats ?? []
  store.dispatch(setAssignedChats(myChats))
}

/* Set 'keepLoggedIn' flag */
export const setKeepLoggedInFlag = (keepLoggedIn: boolean) => {
  store.dispatch(setKeepLoggedIn(keepLoggedIn));
}