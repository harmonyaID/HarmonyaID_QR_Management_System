import axios from "axios";
import { notifyError } from "./notification";

const cancelers = {}
const CancelToken = axios.CancelToken

const isSuccess = (response) => response.status == 200
const handleError = (error) => {
    if (axios.isCancel(error)) {
        return
    }

    const responseData = error?.response?.data
    if (!responseData) {
        return
    }

    const message = responseData.status?.message
    if (!message) {
        return
    }
    
    const internalMsg = responseData.status?.internalMsg

    notifyError(message + (internalMsg ? ` (${internalMsg})` : ''))
}

const handleGetErrorMessage = (error) => {
    if (axios.isCancel(error)) {
        return ''
    }

    const responseData = error?.response?.data
    if (!responseData) {
        return ''
    }

    const message = responseData.status?.message
    if (!message) {
        return ''
    }
    
    const internalMsg = responseData.status?.internalMsg
    return message + (internalMsg ? ` (${internalMsg})` : '')
}

export const getCancelToken = (name) => {
    if (cancelers[name]) {
        cancelers[name]()
    }

    return new CancelToken((canceler) => {
        cancelers[name] = canceler
    })
}

export const objectToParam = (object) => {
    let output = ''
    
    for (const key in object) {
        if (!Object.prototype.hasOwnProperty.call(object, key)) {
            continue
        }

        let value = object[key]

        if (!value) {
            continue
        }

        if (Array.isArray(value)) {
            value = value.join(',')
        }

        output += output == '' ? '?' : '&'
        output += `${key}=${value}`
    }

    return output
}

export const objectToFormData = (data, namespace, parentFormData) => {
    const formData = parentFormData || new FormData

    let key = '';

    for (const property in data) {

        if (!Object.hasOwnProperty.call(data, property)) {
            continue
        }

        if (typeof data[property] == 'undefined') {
            continue
        }

        if (namespace) {
            key = `${namespace}[${property}]`
        } else {
            key = property
        }

        if (Array.isArray(data[property])) {

            data[property].forEach((entry, index) => {
                const entryKey = `${key}[${index}]`

                if (entry && typeof entry == 'object' && entry.constructor === Object) {
                    objectToFormData(entry, entryKey, formData)
                    return
                }

                formData.append(entryKey, entry)
            })
            continue

        }

        if (typeof data[property] == 'object' && !(data[property] instanceof File)) {

            objectToFormData(data[property], key, formData)
            continue

        }

        if (typeof data[property] == 'boolean') {

            formData.append(key, data[property] ? '1' : '0')
            continue

        }

        formData.append(key, data[property])
    }

    return formData
}

export const GET = async (url, tokenCancel = '', headers = {}) => {
    try {
        const response = await axios({
            method          : 'GET',
            url             : url,
            headers         : headers,
            cancelToken     : getCancelToken(tokenCancel),
            validateStatus  : (status) => true,
        })
    
        if (isSuccess(response)) {
            return response.data
        }
    
        return response
    } catch (error) {
        handleError(error)
    }
}

export const send = async (method, url, payload = {}, headers = {}) => {
    try {
        const response = await axios({
            method  : method,
            url     : url,
            data    : payload,
            headers : headers
        })

        if (isSuccess(response)) {
            return response.data
        }

        return response
    } catch (error) {
        handleError(error)
    }
}

export const POST = async (url, payload = {}, headers = {}) => {
    return await send('POST', url, payload, headers)
}
export const PUT = async (url, payload = {}, headers = {}) => {
    let method = 'PUT'
    if (payload instanceof FormData) {
        payload.append('_method', method)
        method = 'POST'
    }

    return await send(method, url, payload, headers)
}
export const PATCH = async (url, payload = {}, headers = {}) => {
    let method = 'PATCH'
    if (payload instanceof FormData) {
        payload.append('_method', method)
        method = 'POST'
    }
    
    return await send(method, url, payload, headers)
}
export const DELETE = async (url, headers = {}) => {
    return await send('DELETE', url, {}, headers)
}

export const swrFetcher = async (...params) => {
    try {
        const response = await axios.get(...params)

        return response.data
    } catch (error) {
        const message = handleGetErrorMessage(error)

        if (message) {
            notifyError(message)
        }

        throw new Error(message)
    }
}
