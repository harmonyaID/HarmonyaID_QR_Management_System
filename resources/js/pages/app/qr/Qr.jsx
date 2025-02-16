import { SearchFormProvider } from "@/components/forms/SearchForm"
import { AppLayout } from "@/components/layouts/AppLayout"
import { QrSection } from "./components/QrSection"

const Qr = () => {
    return (
        <AppLayout title="My Qr Codes">
            <SearchFormProvider>
                <QrSection/>
            </SearchFormProvider>
        </AppLayout>
    )
}

export default Qr