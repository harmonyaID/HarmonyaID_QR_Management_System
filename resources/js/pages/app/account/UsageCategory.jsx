import { AppLayout } from "@/components/layouts/AppLayout"
import { SelectUsageCategorySection } from "./components/SelectUsageCategorySection"

const UsageCategoryPage = () => {
    return (
        <AppLayout
            title="Change Usage Category"
        >
            <SelectUsageCategorySection
                className="h-screen-70"
            />
        </AppLayout>
    )
}

export default UsageCategoryPage
