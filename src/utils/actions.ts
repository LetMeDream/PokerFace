import { logout } from "../store/slices/auth"
import { clearUser } from "../store/slices/user"
import { unsetChatProfile } from "../store/slices/chat_profile"
import { unsetBase } from "../store/slices/base"
import { store } from "../store/store"

export const logUserOut = () => {
  store.dispatch(logout())
  store.dispatch(clearUser())
  store.dispatch(unsetChatProfile())
  store.dispatch(unsetBase())
}