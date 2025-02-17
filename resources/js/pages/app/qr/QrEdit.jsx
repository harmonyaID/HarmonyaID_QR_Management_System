import { AppLayout } from "@/components/layouts/AppLayout"
import { QrEditForm, QrEditProvider } from "./components/QrEditForm"

const QrEdit = () => {
    return (
        <AppLayout
            title="Update QR Code"
        >
            <QrEditProvider>
                <QrEditForm/>
            </QrEditProvider>
        </AppLayout>
    )
}

export default QrEdit