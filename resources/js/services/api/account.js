import { DELETE, POST, PUT } from "@/helpers/api"
import { CreateUsageCategoryRoute, DeleteUsageCategoryRoute, UpdateUsageCategoryRoute } from "@/routes/account"
import { route } from "ziggy-js"

export const usageCategoryCreate = (formRequest = {}) => {
    return POST(route(CreateUsageCategoryRoute), formRequest)
}

export const usageCategoryUpdate = (id, formRequest = {}) => {
    return PUT(route(UpdateUsageCategoryRoute, id), formRequest)
}

export const usageCategoryDelete = (id) => {
    return DELETE(route(DeleteUsageCategoryRoute, id))
}