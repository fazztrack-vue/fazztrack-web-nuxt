import { IVidioState } from "./interface"
import { IVidio } from "~/interfaces/IVidio"


export default {
    GET_LIST_VIDIOS_PENDING(state: IVidioState) {
        state.list.isLoading = true
    },
    GET_LIST_VIDIOS_FULFILLED(state: IVidioState, payload: IVidio[]) {
        state.list.isLoading = false
        state.list.data = payload
    },
    GET_LIST_VIDIOS_REJECTED(state: IVidioState, payload: string) {
        state.list.isLoading = false
        state.list.isError = true
        state.list.errMessage = payload
    },
    GET_DETAIL_VIDIO_PENDING(state: IVidioState) {
        state.detail.isLoading = true
    },
    GET_DETAIL_VIDIO_FULFILLED(state: IVidioState, payload: IVidio) {
        state.detail.isLoading = false
        state.detail.data = payload

    },
    GET_DETAIL_VIDIO_REJECTED(state: IVidioState, payload: string) {
        state.detail.isLoading = false
        state.detail.isError = true
        state.detail.errMessage = payload
    }
}