import { createContext, useContext, useEffect, useState } from "react"
import { QrStyleForm, QrStyleFormContext, QrStyleFormProvider } from "./QrStyleForm"
import { Dropbox, DropboxContext, DropboxProvider } from "@/components/inputs/Dropbox"
import { QRLinkForm } from "./QrLinkForm"
import { QRWAForm } from "./QrWAForm"
import { QRWIFIForm } from "./QRWIFIForm"
import { notifyError, notifySuccess } from "@/helpers/notification"
import { LINK_ID, WHATSAPP_ID, WIFI_ID } from "@/configs/qrDataTypes"
import { qrCreate, qrUpdate } from "@/services/api/qr"
import { Card } from "@/components/cards/Card"
import { Input } from "@/components/inputs/Input"
import { Button } from "@/components/buttons/Button"
import { route } from "ziggy-js"
import { QrEmbedImageRoute, QrRoute } from "@/routes/app"
import { QrDataFormContext, QrDataFormProvider } from "../contexts/QrDataForm"
import { phoneCodes } from "@/configs/phoneCodes"

export const QrFormContext  = createContext(null)
export const QrFormProvider = ({children}) => {
    const [form, setForm] = useState({
        name    : '',
        qrType  : null,
        data    : {},
        style   : {
            qr_style: '',
            image   : '',
        }
    })

    const [selectedId, setSelectedId] = useState('')

    return (
        <QrFormContext 
            value={{
                form, setForm,
                selectedId, setSelectedId
            }}
        >
            <QrStyleFormProvider>
                <DropboxProvider>
                    <QrDataFormProvider>
                        { children }
                    </QrDataFormProvider>
                </DropboxProvider>
            </QrStyleFormProvider>
        </QrFormContext>
    )
}

export const QrForm = ({
    onSuccess,
}) => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [selectedStyle, setSelectedStyle]   = useContext(QrStyleFormContext)

    const { 
        form, setForm,
        selectedId
    } = useContext(QrFormContext)
    
    const { setForm: setDataForm, validate } = useContext(QrDataFormContext)
    const { files, setFiles, resetDropbox } = useContext(DropboxContext)

    const handleChange = ({name, value}) => {
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        if (isLoading) {
            return
        }

        if (!form.name) {
            notifyError('Name is missing')
            return
        }

        const { validationPassed, data } = validate(form.qrType.dataType.id)
        if (!validationPassed) {
            return
        }

        setIsLoading(true)

        const formRequest = {
            ...form,
            qrTypeId: form.qrType.id,
            data    : data,
            style   : {
                qr_style: selectedStyle,
                image   : files?.length ? files[0].url : form?.style?.image
            }
        }

        let service
        if (!selectedId) {
            service = qrCreate(formRequest)
        } else {
            service = qrUpdate(selectedId, formRequest)
        }

        service.then((response) => {
            if (response.status.code != 200) {
                return
            }

            notifySuccess(`Qr Code successfully ${ selectedId ? 'updated' : 'created' }`);
            resetDropbox()

            if (typeof onSuccess == 'function') {
                onSuccess(response.result)
                return
            }

            setTimeout(() => {
                window.open(route(QrRoute), '_self')
            }, 500)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (!form?.qrType?.dataType?.id) {
            return
        }

        setDataForm((prevState) => {
            switch (form.qrType.dataType.id) {
                case LINK_ID:
                    return {
                        ...prevState,
                        url: form?.data?.url
                    }
            
                case WHATSAPP_ID:
                    return {
                        ...prevState,
                        phoneCode   : phoneCodes.find(code => form?.data?.phone?.country),
                        phoneNumber : form?.data?.phone?.number,
                        message     : form?.data?.message,
                    }

                case WIFI_ID:
                    return {
                        ...prevState,
                        ssid        : form?.data?.ssid,
                        encryption  : form?.data?.encryption,
                        password    : form?.data?.password,
                    }
            }
        })

    }, [form.data])

    useEffect(() => {
        if (!selectedId || !form?.style?.image) {
            return
        }

        setFiles((prevState) => [{
            url         : form.style.image,
            absoluteUrl : route(QrEmbedImageRoute, selectedId)
        }])
    }, [form.style.image, selectedId])

    useEffect(() => {
        if (!form?.style?.qr_style) {
            return
        }
        
        setSelectedStyle(form.style.qr_style)
    }, [form.style.qr_style])

    return (
        <Card noBorder>
            <div className="d-flex flex-column justify-content-between gap-3 h-100">
                <Input
                    name="name"
                    label="Name"
                    onChange={handleChange}
                    value={form.name}
                    required
                />
                { form?.qrType?.dataType?.id == LINK_ID ? (
                    <QRLinkForm/>
                ) : form?.qrType?.dataType?.id == WHATSAPP_ID ? (
                    <QRWAForm/>
                ) : form?.qrType?.dataType?.id == WIFI_ID ? (
                    <QRWIFIForm/>
                ) : (
                    <></>
                ) }
                <QrStyleForm/>
                <div>
                    <label className="form-label">Image</label>
                    <Dropbox/>
                </div>
                <Button
                    onClick={handleSubmit}
                    className="position-sticky bottom-0"
                    disabled={!form?.name || isLoading}
                >
                    { selectedId ? 'Update' : 'Create' }
                </Button>
            </div>
        </Card>
    )
}