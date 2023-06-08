import { Context } from "@nuxt/types";

export default (contex: Context) => {
    const token = localStorage.getItem('auth._token.local')
    if (!token) {
        contex.redirect('/login')
    }
}