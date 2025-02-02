import { DELETE, POST } from "@/helpers/api"
import { route } from "ziggy-js"

export const authLogin = (formRequest = {}) => {
    return POST(route('web.auth.login'), formRequest)
}

export const authLogout = () => {
    return DELETE(route('web.auth.logout'))
}

export const authForgotPassword = (formRequest = {}) => {
    return POST(route('web.auth.forgotPassword'), formRequest)
}

export const authResetPassword = (formRequest = {}) => {
    return POST(route('web.auth.resetPassword'), formRequest)
}
