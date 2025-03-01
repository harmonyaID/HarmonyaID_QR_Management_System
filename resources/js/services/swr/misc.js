import { useSwr } from "@/hooks/useSwr"
import { GetFaqRoute, GetSystemRoute, GetSystemSizeRoute } from "@/routes/misc"
import { route } from "ziggy-js"

export const useGetFaq = (filter = {}) => {
    return useSwr(route(GetFaqRoute), filter)
}

export const useGetSystem = (filter = {}) => {
    return useSwr(route(GetSystemRoute), filter)
}

export const useGetSystemSize = (filter = {}) => {
    return useSwr(route(GetSystemSizeRoute), filter)
}