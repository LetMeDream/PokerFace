import { logout, login } from "../store/slices/auth"
import { clearUser, setUser } from "../store/slices/user"
import { unsetChatProfile, setChatProfile } from "../store/slices/agent"
import { unsetBase, setTickets } from "../store/slices/base"
import { store } from "../store/store"
import type { LoginSuccess } from "../services/service"
import { mockApi } from "../services/service"

export const logUserOut = () => {
  store.dispatch(logout())
  store.dispatch(clearUser())
  store.dispatch(unsetChatProfile())
  store.dispatch(unsetBase())
}
  
export const setLoggedInUser = async (result: LoginSuccess) => {
  const { user: userData, agent: agentData } = result;
  store.dispatch(setUser(userData))
  store.dispatch(setChatProfile(agentData))
  store.dispatch(login())
  const res: any = await store.dispatch(mockApi.endpoints.getTickets.initiate())
  store.dispatch(setTickets(res?.data?.data ?? []))
}
