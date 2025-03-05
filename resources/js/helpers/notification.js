import { toast } from "react-toastify"

const toastPosition = 'top-right'
const defaultTimeout = 3500

export const notifyError = (message, timeout = defaultTimeout) => {
    toast.error(message, {
        position: toastPosition,
        autoClose: timeout,
    })
}

export const notifySuccess = (message, timeout = defaultTimeout) => {
    toast.success(message, {
        position: toastPosition,
        autoClose: timeout
    })
}

export const notifyWarning = (message, timeout = defaultTimeout) => {
    toast.warning(message, {
        position: toastPosition,
        autoClose: timeout
    })
}

export const notifyInfo = (message, timeout = defaultTimeout) => {
    toast.info(message, {
        position: toastPosition,
        autoClose: timeout
    })
}