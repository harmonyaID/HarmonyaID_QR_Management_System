import { useSwr } from "@/hooks/useSwr"
import { GetMyUsageCategoryRoute, GetPermissionRoute, GetPlanRoute, GetRoleRoute, GetUsageCategoryRoute, GetUserRoute } from "@/routes/account"
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

export const useGetUsers = (filter = {}) => {
    return useSwr(route(GetUserRoute), filter)
}

export const useGetRoles = (filter = {}) => {
    return useSwr(route(GetRoleRoute), filter)
}

export const useGetPermissions = (filter = {}) => {
    return useSwr(route(GetPermissionRoute), filter)
}
