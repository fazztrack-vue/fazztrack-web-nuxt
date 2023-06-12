import { Commit } from 'vuex';
import axios, { AxiosResponse } from "axios";
import type { NuxtAxiosInstance } from "@nuxtjs/axios";
import IDataMinicamp from "~/interfaces/IMinicamp";

const tempToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTI2VDA1OjU4OjI0LjI0ODI1KzAwOjAwIiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGRaeXJuYUQyS0lrbm5zZ2p4RnRkb082a2p5SHYzSXo1ZmNFMjZKM3huNC9yOVJ5S1prTkRXIiwiaWF0IjoxNjg1MTA0MzY2fQ.s8cgoCIfngy75U-VzF-SIP52u04qZ33b7myhpcwyUHI'
const config = {
  headers: { Authorization:  tempToken }
};

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
  async getDetailMinicamp({commit} :{commit: Commit}, id : number){
    commit("GET_DETAIL_MINICAMP_PENDING");
    try {
      const response : AxiosResponse = await axios.get(`https://fazz-track-sample-api.vercel.app/minicamp/${id}`, config)    
      const payload = response.data
      commit("GET_DETAIL_MINICAMP_FULLFILLED" , payload)
    } catch (error: any) {
      const payload = error.message
      commit("GET_DETAIL_MINICAMP_REJECTED", payload)
    }
  },
  insertDataMinicamp(_:any, data : IDataMinicamp){
    return new Promise((resolve, reject)=>{
       axios.post('https://fazz-track-sample-api.vercel.app/minicamp',data, config).
       then((res) => {
        resolve(res.data)
       })
       .catch((error)=>{
        reject(error.message)
       })
    })
  },
  updateDataMinicamp(_context:any, data : IDataMinicamp){
    return new Promise((resolve, reject)=>{
       axios.put(`https://fazz-track-sample-api.vercel.app/minicamp/${data.id}`,data, config).
       then((res) => {
        resolve(res.data)
       })
       .catch((error)=>{
        reject(error.message)
       })
    })
  },
  deleteDataMinicamp(_context:any, id : number){
    return new Promise((resolve, reject)=>{
      axios.delete(`https://fazz-track-sample-api.vercel.app/minicamp/${id}`, config).
      then((res) => {
       resolve(res.data)
      })
      .catch((error)=>{
       reject(error.message)
      })
   })
  },
}