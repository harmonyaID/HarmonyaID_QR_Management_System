import { SearchFormProvider } from "@/components/forms/SearchForm"
import { AppLayout } from "@/components/layouts/AppLayout"
import { QrSection } from "./components/QrSection"
import { QrDetailProvider } from "./components/QrDetail"

const Qr = () => {
    return (
        <AppLayout title="My Qr Codes">
            <SearchFormProvider>
                <QrDetailProvider>
                    <QrSection/>
                </QrDetailProvider>
            </SearchFormProvider>
        </AppLayout>
    )
}

export default Qr