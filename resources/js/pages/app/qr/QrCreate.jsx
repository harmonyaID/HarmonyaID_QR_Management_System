import { AppLayout } from "@/components/layouts/AppLayout"
import { QrTypeSelectFormProvider } from "./components/QrTypeSelectForm"
import { QrCreateForm } from "./components/QrCreateForm"

const QrCreate = () => {
    return (
        <AppLayout
            title="Create New QR Code"
        >
            <QrTypeSelectFormProvider>
                <QrCreateForm/>
            </QrTypeSelectFormProvider>
        </AppLayout>
    )
}

export default QrCreate