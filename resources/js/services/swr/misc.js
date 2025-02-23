import { useSwr } from "@/hooks/useSwr"
import { GetFaqRoute } from "@/routes/misc"
import { route } from "ziggy-js"

export const useGetFaq = (filter = {}) => {
    return useSwr(route(GetFaqRoute), filter)
}