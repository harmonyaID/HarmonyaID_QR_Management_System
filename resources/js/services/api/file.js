import { POST } from "@/helpers/api"
import { UploadFileRoute } from "@/routes/file"

export const fileUpload = (formRequest = {}) => {
    return POST(route(UploadFileRoute), formRequest)
}