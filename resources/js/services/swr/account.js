import { useSwr } from "@/hooks/useSwr"
import { GetUsageCategoryRoute } from "@/routes/account"
import { route } from "ziggy-js"

export const useGetCategoryUsage = (filter = {}) => {
    return useSwr(route(GetUsageCategoryRoute), filter)
}