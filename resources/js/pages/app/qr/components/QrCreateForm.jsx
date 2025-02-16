import { Button } from "@/components/buttons/Button"
import { QrTypeSelectForm, QrTypeSelectFormContext, QrTypeSelectFormProvider } from "./QrTypeSelectForm"
import { useContext, useState } from "react"
import { Input } from "@/components/inputs/Input"
import { LINK_ID, WHATSAPP_ID, WIFI_ID } from "@/configs/qrDataTypes"
import { QRWAForm, QRWAFormContext, QRWAFormProvider } from "./QrWAForm"
import { Card } from "@/components/cards/Card"
import { QRLinkForm, QrLinkFormContext, QrLinkFormProvider } from "./QrLinkForm"
import { QRWIFIForm, QRWIFIFormContext, QRWIFIFormProvider } from "./QRWIFIForm"
import { Dropbox, DropboxContext, DropboxProvider } from "@/components/inputs/Dropbox"
import { QrStyleForm, QrStyleFormContext, QrStyleFormProvider } from "./QrStyleForm"
import { notifyError, notifySuccess } from "@/helpers/notification"
import { qrCreate } from "@/services/api/qr"
import { QrRoute } from "@/routes/app"
import { route } from "ziggy-js"

export const QrCreateProvider = ({children}) => (
    <QrTypeSelectFormProvider>
        <QrStyleFormProvider>
            <DropboxProvider>
                <QrLinkFormProvider>
                    <QRWAFormProvider>
                        <QRWIFIFormProvider>
                            { children }
                        </QRWIFIFormProvider>
                    </QRWAFormProvider>
                </QrLinkFormProvider>
            </DropboxProvider>
        </QrStyleFormProvider>
    </QrTypeSelectFormProvider>
)

export const QrCreateForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName]   = useState('')
    const [selectedType]    = useContext(QrTypeSelectFormContext)
    const [selectedStyle]   = useContext(QrStyleFormContext)
    const { form: linkForm, validate: validateLink }  = useContext(QrLinkFormContext)
    const { form: waForm, validate: validateWA }  = useContext(QRWAFormContext)
    const { form: wifiForm, validate: validateWifi }  = useContext(QRWIFIFormContext)
    const { files, resetDropbox } = useContext(DropboxContext)

    const handleChange = ({value}) => {
        setName(value)
    }

    const handleSubmit = () => {
        if (isLoading) {
            return
        }

        if (!name) {
            notifyError('Name is missing')
            return
        }

        let validationPassed = true
        let data
        switch (selectedType.dataType.id) {
            case LINK_ID:
                validationPassed = validateLink()
                data = linkForm
                break;
                
            case WHATSAPP_ID:
                validationPassed = validateWA()
                data = {
                    phone: {
                        number  : waForm.phoneNumber,
                        country : waForm.phoneCode.code,
                    },
                    message     : waForm.message,
                }
                break;
                
            case WIFI_ID:
                validationPassed = validateWifi()
                data = wifiForm
                break;
        }
        if (!validationPassed) {
            return
        }

        setIsLoading(true)
        
        const form = {
            name    : name,
            qrTypeId: selectedType.id,
            data    : data,
            style   : {
                qr_style: selectedStyle,
                image   : files?.length ? files[0].url : ''
            }
        }

        qrCreate(form).then((response) => {
            if (response.status.code != 200) {
                return
            }

            notifySuccess('Qr Code successfully created');

            setTimeout(() => {
                window.open(route(QrRoute), '_self')
            }, 500)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }
    

    return (
        <section className="d-grid grid-cols-lg-2 gap-3 h-100">
            <QrTypeSelectForm/>
            { !selectedType ? (
                <section className="d-flex flex-column justify-content-center align-items-center h-100 text-center px-4 py-5">
                    <h3 className="mb-0">What kind of QR Code do you want to create?</h3>
                </section>
            ) : (
                <Card noBorder>
                    <div className="d-flex flex-column justify-content-between gap-3 h-100">
                        <Input
                            name="name"
                            label="Name"
                            onChange={handleChange}
                            value={name}
                            required
                        />
                        { selectedType?.dataType?.id == LINK_ID ? (
                            <QRLinkForm/>
                        ) : selectedType?.dataType?.id == WHATSAPP_ID ? (
                            <QRWAForm/>
                        ) : selectedType?.dataType?.id == WIFI_ID ? (
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
                            disabled={!name || isLoading}
                        >
                            Create
                        </Button>
                    </div>
                </Card>
            ) }
        </section>
    )
}