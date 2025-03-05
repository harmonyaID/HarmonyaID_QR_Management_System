import { AppLayout } from "@/components/layouts/AppLayout"
import { PlanFormProvider } from "./components/PlanForm"
import { PlanSection } from "./components/PlanSection"
import { SearchFormProvider } from "@/components/forms/SearchForm"

const PlanPage = () => {
    return (
        <AppLayout
            title="Plans"
        >
            <PlanFormProvider>
                <SearchFormProvider>
                    <PlanSection/>
                </SearchFormProvider>
            </PlanFormProvider>
        </AppLayout>
    )
}

export default PlanPage
