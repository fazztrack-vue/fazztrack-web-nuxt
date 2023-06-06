import axios from 'axios'
import { Commit } from 'vuex'
import { IVidioState } from './interface';


const token = localStorage.getItem('token')

const actions = {
    getListVidios({ commit }: { commit: Commit }) {
        commit('GET_LIST_VIDIOS_PENDING')
        return new Promise((resolve, reject) => {
            axios.get(`https://fazz-track-sample-api.vercel.app/video`, {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                resolve(res)
                const payload = {
                    data: res.data
                }
                commit('GET_LIST_VIDIOS_FULFILLED', payload)
            }).catch((err: unknown) => {
                if (err instanceof Error) {
                    reject(err)
                    const payload = {
                        message: err.message
                    }
                    commit('GET_LIST_VIDIOS_REJECTED', payload)
                }
            })
        })
    },
    getVidioDetail({ commit }: { commit: Commit }, id: number) {
        commit('GET_DETAIL_VIDIO_PENDING')
        return new Promise((resolve, reject) => {
            axios
                .get(`https://fazz-track-sample-api.vercel.app/video/${id}`, {
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => {
                    resolve(res.data)
                    const payload = {
                        data: res.data
                    }
                    commit('GET_DETAIL_VIDIO_FULFILLED', payload)
                })
                .catch((err: unknown) => {
                    if (err instanceof Error) {
                        reject(err.message)
                        const payload = {
                            message: err.message
                        }
                        commit('GET_DETAIL_VIDIO_REJECTED', payload)
                    }
                })
        })
    },
    editVidio(_context: any, data: { id: number, body: IVidioState }) {
        return new Promise((resolve, reject) => {
            axios
                .put(`https://fazz-track-sample-api.vercel.app/video/${data.id}`, data.body, {
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => {
                    resolve(res.data)

                })
                .catch((err: unknown) => {
                    if (err instanceof Error) {
                        reject(err)
                    }
                })
        })
    },
    postVidio(_context: any, body: IVidioState) {
        return new Promise((resolve, reject) => {
            axios
                .post(`https://fazz-track-sample-api.vercel.app/video`, body, {
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => {
                    resolve(res.data)

                })
                .catch((err: unknown) => {
                    if (err instanceof Error) {
                        reject(err)
                    }
                })
        })
    },
    deleteVidio(_context: any, id: number) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`https://fazz-track-sample-api.vercel.app/video/${id}`, {
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => {
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