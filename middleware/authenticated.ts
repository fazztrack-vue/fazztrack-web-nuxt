import { Context } from "@nuxt/types";

export default (contex: Context) => {
    const token = localStorage.getItem('token')
    if (!token) {
        contex.redirect('/login')
    }
}