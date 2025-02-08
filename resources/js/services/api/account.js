import { DELETE, POST, PUT } from "@/helpers/api"
import { CreatePlanRoute, CreateUsageCategoryRoute, DeletePlanRoute, DeleteUsageCategoryRoute, SelectUsageCategoryRoute, UpdatePlanRoute, UpdateUsageCategoryRoute } from "@/routes/account"
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

export const usageCategorySelect = (id) => {
    return POST(route(SelectUsageCategoryRoute, id))
}

export const planCreate = (formRequest = {}) => {
    return POST(route(CreatePlanRoute), formRequest)
}

export const planUpdate = (id, formRequest = {}) => {
    return PUT(route(UpdatePlanRoute, id), formRequest)
}

export const planDelete = (id) => {
    return DELETE(route(DeletePlanRoute, id))
}