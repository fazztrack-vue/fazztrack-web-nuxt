import axios, { AxiosResponse } from 'axios'
import { IAuth } from '@/interfaces/IAuth'
const actions = {
    register(_contex: any, body: IAuth) {
        return new Promise((resolve, reject) => {
            axios.post(`https://fazz-track-sample-api.vercel.app/register`, body)
                .then((res: AxiosResponse) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
        })
    },
}


export default actions