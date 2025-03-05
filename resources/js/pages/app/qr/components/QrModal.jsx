import { Button } from "@/components/buttons/Button"
import { Modal } from "@/components/modals/Modal"
import { MDQr } from "@/configs/modalId"
import { ArrowLeft } from "@/icons/ArrowLeft"
import { Download } from "@/icons/Download"
import { Plus } from "@/icons/Plus"
import { QrCreateRoute, QrImageRoute, QrRoute } from "@/routes/app"
import { createContext, useContext, useState } from "react"
import { route } from "ziggy-js"

export const QrModalContext = createContext()
export const QrModalProvider= ({children}) => {
    const [qr, setQr] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)

    return (
        <QrModalContext value={{ qr, setQr, isUpdate, setIsUpdate }}>
            { children }
        </QrModalContext>
    )
}

export const QrModal = () => {
    const { qr, isUpdate } = useContext(QrModalContext)

    const handleToCreate = (event) => {
        event.preventDefault()
        window.open(route(QrCreateRoute), '_self');
    }

    const handleReturn = (event) => {
        event.preventDefault()
        window.open(route(QrRoute), '_self');
    }
    
    return (
        <Modal
            id={MDQr}
            preventClose
        >
            <section className="text-center">
                <h3 
                    className="mb-3"
                >
                    QR Code Successfully { isUpdate ? 'Updated' : 'Created' }
                </h3>
                <img 
                    src={qr?.id ? `${route(QrImageRoute, qr.id)}?v=${qr.version}` : undefined}
                    alt={`Generated ${ qr?.name } QR Code`}
                    height={240}
                    width="auto"
                    className="mb-3"
                />
                <div className="d-grid grid-cols-2 gap-3">
                    <Button
                        className="grid-span-2"
                        small
                        linkAsButton
                        href={ qr?.id ? route(QrImageRoute, qr.id) : undefined }
                        download={`${qr?.name} QR Code`}
                    >
                        <Download size={24} className="me-2"/>Download
                    </Button>
                    <Button
                        outline
                        small
                        linkAsButton
                        onClick={handleToCreate}
                        href={route(QrCreateRoute)}
                    >
                        <Plus size={24} className="me-2"/>Create Another
                    </Button>
                    <Button
                        outline
                        small
                        linkAsButton
                        onClick={handleReturn}
                        href={route(QrRoute)}
                    >
                        <ArrowLeft size={24} className="me-2"/>Return
                    </Button>
                </div>
            </section>
        </Modal>
    )
}