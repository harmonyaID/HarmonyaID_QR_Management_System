import { useSwr } from "@/hooks/useSwr"
import { GetFaqRoute, GetSystemPackageRoute, GetSystemRoute, GetSystemSizeRoute } from "@/routes/misc"
import { route } from "ziggy-js"

export const useGetFaq = (filter = {}) => {
    return useSwr(route(GetFaqRoute), filter)
}

export const useGetSystem = (filter = {}) => {
    return useSwr(route(GetSystemRoute), filter)
}

export const useGetSystemPackage = (filter = {}) => {
    return useSwr(route(GetSystemPackageRoute), filter)
}

export const useGetSystemSize = (filter = {}) => {
    return useSwr(route(GetSystemSizeRoute), filter)
}