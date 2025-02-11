import { DELETE, POST, PUT } from "@/helpers/api"
import { CreateQrTypeRoute, DeleteQrTypeRoute, UpdateQrTypeRoute } from "@/routes/qr"
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
