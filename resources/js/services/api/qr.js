import { DELETE, POST, PUT } from "@/helpers/api"
import { CreateQrRoute, CreateQrTypeRoute, DeleteQrRoute, DeleteQrTypeRoute, UpdateQrRoute, UpdateQrTypeRoute } from "@/routes/qr"
import { route } from "ziggy-js"

export const qrTypeCreate = (formRequest = {}) => {
    return POST(route(CreateQrTypeRoute), formRequest)
}

export const qrTypeUpdate = (id, formRequest = {}) => {
    return PUT(route(UpdateQrTypeRoute, id), formRequest)
}

export const qrTypeDelete = (id) => {
    return DELETE(route(DeleteQrTypeRoute, id))
}

export const qrCreate = (formRequest = {}) => {
    return POST(route(CreateQrRoute), formRequest)
}

export const qrUpdate = (id, formRequest = {}) => {
    return PUT(route(UpdateQrRoute, id), formRequest)
}

export const qrDelete = (id) => {
    return DELETE(route(DeleteQrRoute, id))
}
