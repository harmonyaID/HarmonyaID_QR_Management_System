import { useSwr } from "@/hooks/useSwr"
import { GetMyUsageCategoryRoute, GetPlanRoute, GetUsageCategoryRoute } from "@/routes/account"
import { route } from "ziggy-js"

export const useGetCategoryUsage = (filter = {}) => {
    return useSwr(route(GetUsageCategoryRoute), filter)
}

export const useGetMyCategoryUsage = (filter = {}) => {
    return useSwr(route(GetMyUsageCategoryRoute), filter)
}

export const useGetPlans = (filter = {}) => {
    return useSwr(route(GetPlanRoute), filter)
}