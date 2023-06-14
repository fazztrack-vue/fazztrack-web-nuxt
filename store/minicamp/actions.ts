import { Commit } from 'vuex';
import { AxiosResponse } from "axios";
import type { NuxtAxiosInstance } from "@nuxtjs/axios";
import IDataMinicamp from "~/interfaces/IMinicamp";

export default {
  getListMinicamp({commit} :{commit: Commit}, {$axios}: {$axios : NuxtAxiosInstance}){
    commit("GET_MINICAMPS_PENDING");
    return new Promise((resolve, reject)=> {
      $axios.get('/minicamp').then((res : AxiosResponse) => {
        resolve(res.data)
        commit("GET_MINICAMPS_FULLFILLED" , res.data)
      }).catch((err : unknown) => {
        if( err instanceof Error){
         reject(err.message)
          commit("GET_MINICAMPS_REJECTED", err.message)
        }
      })
    })
  },
  getDetailMinicamp({commit} :{commit: Commit}, { $axios, id }: { $axios: NuxtAxiosInstance, id: number }){
    commit("GET_DETAIL_MINICAMP_PENDING");
    return new Promise((resolve, reject) => {
      $axios.get(`/minicamp/${id}`).then((res : AxiosResponse) => {
        resolve(res.data)
        commit("GET_DETAIL_MINICAMP_FULLFILLED" , res.data)
      }).catch((err : unknown) => {
        if(err instanceof Error){
          reject(err.message)
          commit("GET_DETAIL_MINICAMP_REJECTED", err.message)
        }
      })
    })
  },
  insertDataMinicamp(_:any, {$axios, data} : { $axios: NuxtAxiosInstance, data: IDataMinicamp }){
    return new Promise((resolve, reject)=>{
       $axios.post('/minicamp',data).
       then((res) => {
        resolve(res.data)
       })
       .catch((error)=>{
        reject(error.message)
       })
    })
  },
  updateDataMinicamp(_context:any,{ $axios, data }: { $axios: NuxtAxiosInstance, data: IDataMinicamp }){
    return new Promise((resolve, reject)=>{
        $axios.put(`/minicamp/${data.id}`,data).
       then((res) => {
        resolve(res.data)
       })
       .catch((error)=>{
        reject(error.message)
       })
    })
  },
  deleteDataMinicamp(_context:any, { $axios, id }: { $axios: NuxtAxiosInstance, id: number }){
    return new Promise((resolve, reject)=>{
      $axios.delete(`/minicamp/${id}`).
      then((res) => {
       resolve(res.data)
      })
      .catch((error)=>{
       reject(error.message)
      })
   })
  },
}