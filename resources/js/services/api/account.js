import { DELETE, POST, PUT } from "@/helpers/api"
import { CreatePlanRoute, CreateRoleRoute, CreateUsageCategoryRoute, DeletePlanRoute, DeleteRoleRoute, DeleteUsageCategoryRoute, SelectUsageCategoryRoute, UpdatePlanRoute, UpdateRoleRoute, UpdateUsageCategoryRoute } from "@/routes/account"
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

export const roleCreate = (formRequest = {}) => {
    return POST(route(CreateRoleRoute), formRequest)
}

export const roleUpdate = (id, formRequest = {}) => {
    return PUT(route(UpdateRoleRoute, id), formRequest)
}

export const roleDelete = (id) => {
    return DELETE(route(DeleteRoleRoute, id))
}

export const permissionAssign = (id, roleId) => {
    return PUT(route(AssignPermissionRoute, {id, roleId}))
}

export const permissionUnassign = (id, roleId) => {
    return PUT(route(UnassignPermissionRoute, {id, roleId}))
}
