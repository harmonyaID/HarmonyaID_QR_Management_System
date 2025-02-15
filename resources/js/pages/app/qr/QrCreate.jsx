import { AppLayout } from "@/components/layouts/AppLayout"
import { QrCreateForm, QrCreateProvider } from "./components/QrCreateForm"

const QrCreate = () => {
    return (
        <AppLayout
            title="Create New QR Code"
        >
            <QrCreateProvider>
                <QrCreateForm/>
            </QrCreateProvider>
        </AppLayout>
    )
}

export default QrCreate