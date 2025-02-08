import { AppLayout } from "@/components/layouts/AppLayout"
import { SelectUsageCategorySection } from "./components/SelectUsageCategorySection"
import { goBack } from "@/helpers/navigation"

const UsageCategoryPage = () => {
    return (
        <AppLayout
            title="Change Usage Category"
        >
            <SelectUsageCategorySection
                className="h-screen-70"
                onSuccess={() => goBack()}
            />
        </AppLayout>
    )
}

export default UsageCategoryPage
