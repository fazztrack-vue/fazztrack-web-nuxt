import IStateUser from "./inteface"
import IUser from "~/interfaces/IUser"

export default {
  GET_DETAIL_USER_PENDING(state: IStateUser){
    state.detail.isLoading = true
  },
  GET_DETAIL_USER_FULLFILLED(state: IStateUser, payload : IUser){
    state.detail.isLoading = false
    state.detail.data = payload
  },
  GET_DETAIL_USER_REJECTED(state: IStateUser, payload : string){
    state.detail.isLoading = false
    state.detail.isError = true
    state.detail.isMessage = payload
  },
}