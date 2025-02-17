import { useSwr } from "@/hooks/useSwr"
import { GetDashboardRoute } from "@/routes/dashboard"
import { route } from "ziggy-js"

export const useGetDashboard = (filter = {}) => {
    return useSwr(route(GetDashboardRoute), filter)
}
