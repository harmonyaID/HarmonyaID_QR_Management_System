import { QrTypeSelectForm, QrTypeSelectFormContext, QrTypeSelectFormProvider } from "./QrTypeSelectForm"
import { useContext, useEffect, useRef } from "react"
import { QrForm, QrFormContext, QrFormProvider } from "./QrForm"
import { QrModal, QrModalContext, QrModalProvider } from "./QrModal"
import { toggleModal } from "@/helpers/toggleModal"
import { MDQr } from "@/configs/modalId"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"
import { QR_GROUP_CREATE } from "@/configs/permissions"
import { toDashboard } from "@/helpers/navigation"
import { Button } from "@/components/buttons/Button"
import { route } from "ziggy-js"
import { QrRoute } from "@/routes/app"
import { ArrowLeft } from "@/icons/ArrowLeft"

export const QrCreateProvider = ({children}) => (
    <QrTypeSelectFormProvider>
        <QrFormProvider>
            <QrModalProvider>
                { children }
            </QrModalProvider>
        </QrFormProvider>
    </QrTypeSelectFormProvider>
)

export const QrCreateForm = () => {
    const [selectedType]= useContext(QrTypeSelectFormContext)
    const { setQr }     = useContext(QrModalContext)
    const { setForm }   = useContext(QrFormContext)

    const formRef = useRef()

    const canCreate = useHasAnyPermissions(QR_GROUP_CREATE)

    const handleSuccess = (result) => {
        setQr(result)
        toggleModal(MDQr, true)
    }
    
    useEffect(() => {
        setForm((prevState) => {
            if (prevState.qrType?.id == selectedType?.id) {
                return prevState
            }

            return {
                ...prevState,
                qrType: selectedType
            }
        })
    }, [selectedType])

    useEffect(() => {
        if (!canCreate) {
            toDashboard()
        }
    }, [canCreate])

    useEffect(() => {
        if (!selectedType) {
            return
        }

        formRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [selectedType])

    return (
        <>
            <div className="text-end mb-3">
                <Button
                    outline
                    small
                    linkAsButton
                    href={route(QrRoute)}
                >
                    <ArrowLeft size={24}/> Back
                </Button>
            </div>
            <section className="d-grid grid-cols-lg-2 gap-3 h-100">
                <QrTypeSelectForm/>
                { !selectedType ? (
                    <section className="d-flex flex-column justify-content-center align-items-center h-100 text-center px-4 py-5">
                        <h3 className="mb-0">What kind of QR Code do you want to create?</h3>
                    </section>
                ) : (
                    <QrForm
                        ref={formRef}
                        onSuccess={handleSuccess}
                    />
                ) }
            </section>
            <QrModal/>
        </>
    )
}