import { Plugin } from "@nuxt/types";
import { AxiosRequestConfig } from "axios";


const axiosInterceptor: Plugin = ({ $axios, app }: any) => {
    $axios.interceptors.request.use((config: AxiosRequestConfig) => {
        const token = app.$auth.getState('_token.local')
        config.headers.common.Authorization = token
        return config
    })
}

export default axiosInterceptor