import { useSwr } from "@/hooks/useSwr"
import { GetQrTypeRoute } from "@/routes/qr"
import { route } from "ziggy-js"

export const useGetQrTypes = (filter = {}) => {
    return useSwr(route(GetQrTypeRoute), filter)
}