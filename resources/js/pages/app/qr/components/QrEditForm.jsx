import { usePage } from "@inertiajs/react";
import { QrForm, QrFormContext, QrFormProvider } from "./QrForm";
import { QrModal, QrModalContext, QrModalProvider } from "./QrModal";
import { useContext, useEffect } from "react";
import { MDQr } from "@/configs/modalId";
import { toggleModal } from "@/helpers/toggleModal";
import { QR_GROUP_UPDATE } from "@/configs/permissions";
import { toDashboard } from "@/helpers/navigation";
import { useHasAnyPermissions } from "@/hooks/useHasPermissions";
import { Button } from "@/components/buttons/Button";
import { route } from "ziggy-js";
import { QrRoute } from "@/routes/app";
import { ArrowLeft } from "@/icons/ArrowLeft";

export const QrEditProvider = ({children}) => (
    <QrFormProvider>
        <QrModalProvider>
            { children }
        </QrModalProvider>
    </QrFormProvider>
)

export const QrEditForm = () => {
    const { setQr }                     = useContext(QrModalContext)
    const { setForm, setSelectedId }    = useContext(QrFormContext)
    const { props }                     = usePage()

    const canUpdate = useHasAnyPermissions(QR_GROUP_UPDATE)

    const handleSuccess = (result) => {
        setQr(result)
        toggleModal(MDQr, true)
    }

    useEffect(() => {

        const data = props.data
        setSelectedId(data.id)
        setForm((prevState) => ({
            ...prevState,
            name    : data.name,
            qrType  : data.type,
            data    : data.data,
            style   : data.styles,
        }))

    }, [])

    useEffect(() => {
        if (!canUpdate) {
            toDashboard()
        }
    }, [canUpdate])

    return (
        <>
            <div className="container text-end mb-3">
                <Button
                    outline
                    small
                    linkAsButton
                    href={route(QrRoute)}
                >
                    <ArrowLeft size={24}/> Back
                </Button>
            </div>
            <section className="container">
                <QrForm
                    onSuccess={handleSuccess}
                />
            </section>
            <QrModal/>
        </>
    )
}
