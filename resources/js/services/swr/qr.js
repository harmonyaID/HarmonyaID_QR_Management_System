import { useSwr } from "@/hooks/useSwr"
import { GetQrRoute, GetQrTypeRoute } from "@/routes/qr"
import { route } from "ziggy-js"

export const useGetQrTypes = (filter = {}) => {
    return useSwr(route(GetQrTypeRoute), filter)
}

export const useGetQrCodes = (filter = {}) => {
    return useSwr(route(GetQrRoute), filter)
}
