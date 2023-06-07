import IStateMinicamp from "./inteface"

export default {
  getList(state: IStateMinicamp){
    return state.list
  },
  getDetail(state: IStateMinicamp){
    return state.detail
  },
  getListDisalurkan(state : IStateMinicamp){
    const dataMinicamps = state.list.data
    const dataFilter = dataMinicamps.filter(val => val.isWork === true)
    return dataFilter
  },
  getListTidakDisalurkan(state : IStateMinicamp){
    const dataMinicamps = state.list.data
    const dataFilter = dataMinicamps.filter(val => val.isWork === false)
    return dataFilter
  }
}