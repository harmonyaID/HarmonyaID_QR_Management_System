import { SetupLayout } from "@/components/layouts/SetupLayout"
import { SelectUsageCategorySection } from "../app/account/components/SelectUsageCategorySection"
import { route } from "ziggy-js"
import { DashboardRoute } from "@/routes/app"

const UsageCategorySetupPage = () => {
    return (
        <SetupLayout
            title="Usage"
        >
            <SelectUsageCategorySection
                onSuccess={() => {
                    setTimeout(() => {
                        window.location.href = route(DashboardRoute)
                    }, 500)
                }}
                className="h-100"
            />
        </SetupLayout>
    )
}

export default UsageCategorySetupPage