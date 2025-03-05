import { Button } from "@/components/buttons/Button"
import { DataDisplay } from "@/components/misc/DataDisplay"
import { Offcanvas } from "@/components/offcanvas/Offcanvas"
import { QR_GROUP_UPDATE } from "@/configs/permissions"
import { LINK_ID, WHATSAPP_ID, WIFI_ID } from "@/configs/qrDataTypes"
import { qrStyleTypes } from "@/configs/qrStyleTypes"
import { wifiEncryptionTypes } from "@/configs/wifiEncryptionTypes"
import { storage_url } from "@/helpers/url"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"
import { Download } from "@/icons/Download"
import { Edit } from "@/icons/Edit"
import { QrEditRoute, QrEmbedImageRoute, QrImageRoute } from "@/routes/app"
import { createContext, useContext, useMemo, useState } from "react"
import { route } from "ziggy-js"

export const QrDetailContext = createContext(null)
export const QrDetailProvider = ({ children }) => {
    const [selected, setSelected] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <QrDetailContext
            value={{
                selected, setSelected,
                open, setOpen
            }}
        >
            { children }
        </QrDetailContext>
    )
}

export const QrDetail = () => {
    const canUpdate = useHasAnyPermissions(QR_GROUP_UPDATE)

    const {
        selected, setSelected,
        open, setOpen
    } = useContext(QrDetailContext)

    const handleHide = () => {
        setOpen(false)
        setSelected(null)
    }

    const handleEdit = (event) => {
        event.preventDefault()
        if (!canUpdate) {
            return
        }
        
        window.open(route(QrEditRoute, selected?.id), '_self')
    }

    return (
        <Offcanvas
            title={`QR Code Detail`}
            open={open}
            onHide={handleHide}
        >
            <div className="d-flex flex-column justify-item-between gap-4">

                <div className="d-grid grid-cols-2 gap-4 h-100">
                    <div className="grid-span-2">
                        <img
                            src={ selected?.id ? `${route(QrImageRoute, selected.id)}?v=${selected.version}` : undefined }
                            alt={`${selected?.name} QR Code`}
                            height="auto"
                            className="w-100"
                        />
                    </div>
                    <DataDisplay
                        label="Name"
                        dataClassName="mb-0"
                    >
                        { selected?.name || '-' }
                    </DataDisplay>
                    <DataDisplay
                        label="Type"
                        dataClassName="d-flex gap-2 justify-item-center align-items-center mb-0"
                    >
                        <div className="flex-shrink-0">
                            <img 
                                src={selected?.type?.icon ? storage_url(selected.type.icon) : undefined}
                                alt={`${selected?.type?.name} icon`}
                                height="auto"
                                width={32}
                            />
                        </div>
                        <div className="flex-grow-1">
                            { selected?.type?.name || '-' }
                        </div>
                    </DataDisplay>
                    { selected?.dataType?.id == LINK_ID ? (
                        <LinkQrDetail/>
                    ) : selected?.dataType?.id == WHATSAPP_ID ? (
                        <WAQrDetail/>
                    ) : selected?.dataType?.id == WIFI_ID ? (
                        <WifiQrDetail/>
                    ) : (
                        <></>
                    ) }
                    <QrStyleDetail/>
                </div>
                <div className="d-grid gap-2 position-sticky bottom-0 pt-4 bg-white border-top border-neutral-50">
                    { canUpdate ? (
                        <Button
                            small
                            outline
                            linkAsButton
                            href={ selected?.id ? route(QrEditRoute, selected.id) : undefined }
                            onClick={handleEdit}
                        >
                            <Edit size={24} className="me-2"/>Edit
                        </Button>
                    ) : (<></>) }
                    <Button
                        small
                        linkAsButton
                        title={`Download ${selected?.name} QR Code`}
                        href={ selected?.id ? route(QrImageRoute, selected.id) : undefined }
                        download={`${selected?.name} QR Code`}
                    >
                        <Download size={24} className="me-2"/>Download
                    </Button>
                </div>
            </div>
        </Offcanvas>
    )
}

const LinkQrDetail = () => {
    const { selected } = useContext(QrDetailContext)

    return (
        <>
            <DataDisplay
                dataClassName="mb-0"
                label="Website URL"
            >
                { selected?.data?.url }
            </DataDisplay>
            <div/>
        </>
    )
}

const WAQrDetail = () => {
    const { selected } = useContext(QrDetailContext)

    return (
        <>
            <DataDisplay
                dataClassName="mb-0"
                className="grid-span-2"
                label="Whatsapp Number"
            >
                { selected?.phone }
            </DataDisplay>
            <DataDisplay
                dataClassName="mb-0"
                className="grid-span-2"
                label="Message"
            >
                { selected?.message || '-' }
            </DataDisplay>
        </>
    )
}

const WifiQrDetail = () => {
    const { selected } = useContext(QrDetailContext)

    const security = useMemo(() => {
        return wifiEncryptionTypes.find((type) => type.value == selected?.data?.encryption).name
    }, [selected])

    return (
        <>
            <DataDisplay
                dataClassName="mb-0"
                className="grid-span-2"
                label="Network Name"
            >
                { selected?.data?.ssid }
            </DataDisplay>
            <DataDisplay
                dataClassName="mb-0"
                label="Security"
            >
                { security }
            </DataDisplay>
            <DataDisplay
                dataClassName="mb-0"
                label="Password"
            >
                { selected?.data?.password || '-' }
            </DataDisplay>
        </>
    )
}

const QrStyleDetail = () => {
    const { selected } = useContext(QrDetailContext)

    const styleType = useMemo(() => {
        return qrStyleTypes.find(style => style.value == selected?.styles?.qr_style)
    }, [selected])

    return (
        <>
            <DataDisplay
                label="Qr Style"
            >
                <div className="d-flex align-items-center gap-1">
                    <img
                        className="rounded"
                        src={styleType?.src ? styleType.src : undefined}
                        alt={`${styleType?.name || ''} sample`}
                        width={64}
                        height={64}
                    />
                    <span>
                        { styleType?.name || '' }
                    </span>
                </div>
            </DataDisplay>
            <DataDisplay
                label="Embed Image"
            >
                { selected?.styles?.image ? (
                    <div className="qr-embed-image-container rounded border border-neutral-100">
                        <img 
                            src={ route(QrEmbedImageRoute, selected?.id) }
                            alt={`Image embedded in the middle of ${selected?.name} QR Code`}
                            className="image-cover h-100 w-100"
                        />
                    </div>
                ) : '-' }
            </DataDisplay>
        </>
    )
}