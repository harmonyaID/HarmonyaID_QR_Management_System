import { useSwr } from "@/hooks/useSwr"
import { GetActivityRoute, GetActivityTypeRoute } from "@/routes/activity"
import { route } from "ziggy-js"

export const useGetActivities = (filter = {}) => {
    return useSwr(route(GetActivityRoute), filter)
}

export const useGetActivityTypes = (filter = {}) => {
    return useSwr(route(GetActivityTypeRoute), filter)
}

