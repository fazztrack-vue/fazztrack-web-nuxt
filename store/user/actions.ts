import { Commit } from 'vuex';
import type { NuxtAxiosInstance } from "@nuxtjs/axios";
import { AxiosResponse } from "axios";

export default {
  getDetailUser({commit}: {commit : Commit}, {$axios} : {$axios : NuxtAxiosInstance}){
    //   const payload = response.data.data
    //   context.commit("GET_DETAIL_USER_FULLFILLED" , payload)
    // } catch (error: any) {
    //   const payload = error.message
    //   context.commit("GET_DETAIL_USER_REJECTED", payload)
    // }
    commit('GET_DETAIL_USER_PENDING')
    return new Promise((resolve, reject) => {
      $axios.get(`/profile`)
            .then((res: AxiosResponse) => {
                resolve(res.data.dara)
                commit('GET_DETAIL_USER_FULLFILLED', res.data.data)
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    reject(err.message)
                    commit('GET_DETAIL_USER_REJECTED', err.message)
                }
            })
    })
  },
}