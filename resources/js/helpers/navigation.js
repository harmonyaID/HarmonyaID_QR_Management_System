import { DashboardRoute } from "@/routes/app"
import { route } from "ziggy-js"

export const goBack = () => {
    history.back()
}

export const toDashboard = () => {
    window.open(route(DashboardRoute), '_self')
}