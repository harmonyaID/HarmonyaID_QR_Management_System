import { DELETE, POST } from "@/helpers/api"
import { ForgotPasswordApiRoute, LoginApiRoute, LogoutApiRoute, RegisterApiRoute, ResetPasswordApiRoute } from "@/routes/auth"
import { route } from "ziggy-js"

export const authLogin = (formRequest = {}) => {
    return POST(route(LoginApiRoute), formRequest)
}

export const authRegister = (formRequest = {}) => {
    return POST(route(RegisterApiRoute), formRequest)
}

export const authLogout = () => {
    return DELETE(route(LogoutApiRoute))
}

export const authForgotPassword = (formRequest = {}) => {
    return POST(route(ForgotPasswordApiRoute), formRequest)
}

export const authResetPassword = (formRequest = {}) => {
    return POST(route(ResetPasswordApiRoute), formRequest)
}
