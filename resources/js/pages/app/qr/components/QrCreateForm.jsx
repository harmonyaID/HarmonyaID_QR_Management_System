import { QrTypeSelectForm, QrTypeSelectFormContext, QrTypeSelectFormProvider } from "./QrTypeSelectForm"
import { useContext, useEffect } from "react"
import { QrForm, QrFormContext, QrFormProvider } from "./QrForm"
import { QrModal, QrModalContext, QrModalProvider } from "./QrModal"
import { toggleModal } from "@/helpers/toggleModal"
import { MDQr } from "@/configs/modalId"

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

    return (
        <section className="d-grid grid-cols-lg-2 gap-3 h-100">
            <QrTypeSelectForm/>
            { !selectedType ? (
                <section className="d-flex flex-column justify-content-center align-items-center h-100 text-center px-4 py-5">
                    <h3 className="mb-0">What kind of QR Code do you want to create?</h3>
                </section>
            ) : (
                <QrForm
                    onSuccess={handleSuccess}
                />
            ) }
            <QrModal/>
        </section>
    )
}