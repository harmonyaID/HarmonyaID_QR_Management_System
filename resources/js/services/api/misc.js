import { DELETE, POST, PUT } from "@/helpers/api"
import { CreateFaqRoute, DeleteFaqRoute, UpdateFaqRoute } from "@/routes/misc"
import { route } from "ziggy-js"

export const faqCreate = (formRequest = {}) => {
    return POST(route(CreateFaqRoute), formRequest)
}

export const faqUpdate = (id, formRequest = {}) => {
    return PUT(route(UpdateFaqRoute, id), formRequest)
}

export const faqDelete = (id) => {
    return DELETE(route(DeleteFaqRoute, id))
}
