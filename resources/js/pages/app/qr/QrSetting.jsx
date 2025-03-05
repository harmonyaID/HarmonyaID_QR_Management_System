import { AppLayout } from "@/components/layouts/AppLayout"
import { QrSettingSection } from "./components/QrSettingSection"

const QrSettingPage = () => {
    return (
        <AppLayout
            title="Qr Settings"
        >
            <QrSettingSection/>
        </AppLayout>
    )
}

export default QrSettingPage
