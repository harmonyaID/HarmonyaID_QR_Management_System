import { LINK_ID, WHATSAPP_ID, WIFI_ID } from "@/configs/qrDataTypes";
import { notifyError } from "@/helpers/notification";
import { createContext, useState } from "react";

export const QrDataFormContext = createContext()
export const QrDataFormProvider = ({ children }) => {
    const [form, setForm] = useState({
        url         : '',
        phoneCode   : undefined,
        phoneNumber : '',
        message     : '',
        ssid        : '',
        encryption  : '',
        password    : '',
    })

    const validateLink = () => {
        if (!form?.url) {
            notifyError('URL is missing')
            return false
        }

        return true
    }

    const validateWhatsapp = () => {
        if (!form?.phoneCode) {
            notifyError('Phone code is missing')
            return false
        }

        if (!form?.phoneNumber) {
            notifyError('Whatsapp number is missing')
            return false
        }

        return true
    }

    const validateWifi = () => {
        if (!form?.ssid) {
            notifyError('Network Name is missing')
            return false;
        }

        if (form?.encryption && !form?.password) {
            notifyError('Password is missing')
            return false
        }

        return true
    }

    const validate = (dataTypeId) => {
        let validationPassed
        let data
        switch (dataTypeId) {
            case LINK_ID:
                validationPassed = validateLink()
                data = {
                    url: form.url
                }
                break;
                
            case WHATSAPP_ID:
                validationPassed = validateWhatsapp()
                data = {
                    phone: {
                        number  : form.phoneNumber,
                        country : form.phoneCode.code,
                    },
                    message     : form.message,
                }
                break;
                
            case WIFI_ID:
                validationPassed = validateWifi()
                data = {
                    ssid        : form.ssid,
                    encryption  : form.encryption,
                    password    : form.password,
                }
                break;
        }

        return { validationPassed, data }
    }

    return (
        <QrDataFormContext value={{ form, setForm, validate }}>
            { children }
        </QrDataFormContext>
    )
}