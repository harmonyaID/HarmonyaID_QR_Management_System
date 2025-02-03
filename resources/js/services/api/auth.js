import { DELETE, POST } from "@/helpers/api"
import { route } from "ziggy-js"

export const authLogin = (formRequest = {}) => {
    return POST(route('web.auth.login'), formRequest)
}

export const authRegister = (formRequest = {}) => {
    return POST(route('web.auth.register'), formRequest)
}

export const authLogout = () => {
    return DELETE(route('web.auth.logout'))
}

export const authForgotPassword = (formRequest = {}) => {
    return POST(route('web.auth.forgot-password'), formRequest)
}

export const authResetPassword = (formRequest = {}) => {
    return POST(route('web.auth.reset-password'), formRequest)
}
