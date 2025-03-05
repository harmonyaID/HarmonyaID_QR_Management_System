import { SearchFormProvider } from "@/components/forms/SearchForm"
import { FaqFormProvider } from "./components/FaqForm"
import { FaqSection } from "./components/FaqSection"
import { AppLayout } from "@/components/layouts/AppLayout"

const ManageFaqPage = () => (
    <AppLayout
        title="Manage FAQ"
    >
        <FaqFormProvider>
            <SearchFormProvider>
                <FaqSection/>
            </SearchFormProvider>
        </FaqFormProvider>
    </AppLayout>
)

export default ManageFaqPage