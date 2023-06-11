import { AxiosResponse } from 'axios'
import { Commit } from 'vuex'
import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IVidioState } from './interface';


const actions = {
    getListVidios({ commit }: { commit: Commit }, { $axios }: { $axios: NuxtAxiosInstance }) {
        commit('GET_LIST_VIDIOS_PENDING')
        return new Promise((resolve, reject) => {
            $axios.get(`/video`).then((res: AxiosResponse) => {
                resolve(res)
                commit('GET_LIST_VIDIOS_FULFILLED', res.data)
            }).catch((err: unknown) => {
                if (err instanceof Error) {
                    reject(err)
                    commit('GET_LIST_VIDIOS_REJECTED', err.message)
                }
            })
        })
    },
    getVidioDetail({ commit }: { commit: Commit }, { $axios, id }: { $axios: NuxtAxiosInstance, id: number }) {
        commit('GET_DETAIL_VIDIO_PENDING')
        return new Promise((resolve, reject) => {
            $axios.get(`/video/${id}`)
                .then((res: AxiosResponse) => {
                    resolve(res.data)
                    commit('GET_DETAIL_VIDIO_FULFILLED', res.data.data)
                })
                .catch((err: unknown) => {
                    if (err instanceof Error) {
                        reject(err.message)
                        commit('GET_DETAIL_VIDIO_REJECTED', err.message)
                    }
                })
        })
    },
    editVidio(_context: any, { id, body, $axios }: { id: number, body: IVidioState, $axios: NuxtAxiosInstance }) {
        return new Promise((resolve, reject) => {
            $axios.put(`/video/${id}`, body)
                .then((res: AxiosResponse) => {
                    resolve(res.data)

                })
                .catch((err: unknown) => {
                    if (err instanceof Error) {
                        reject(err)
                    }
                })
        })
    },
    postVidio(_context: any, { body, $axios }: { body: IVidioState, $axios: NuxtAxiosInstance }) {
        return new Promise((resolve, reject) => {
            $axios.post(`https://fazz-track-sample-api.vercel.app/video`, body)
                .then((res: AxiosResponse) => {
                    resolve(res.data)

                })
                .catch((err: unknown) => {
                    if (err instanceof Error) {
                        reject(err)
                    }
                })
        })
    },
    deleteVidio(_context: any, { id, $axios }: { id: number, $axios: NuxtAxiosInstance }) {
        return new Promise((resolve, reject) => {
            $axios.delete(`https://fazz-track-sample-api.vercel.app/video/${id}`)
                .then((res: AxiosResponse) => {
                    resolve(res.data)

                })
                .catch((err: unknown) => {
                    if (err instanceof Error) {
                        reject(err)
                    }
                })
        })
    }
}


export default actions