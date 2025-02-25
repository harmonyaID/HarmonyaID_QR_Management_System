import { AppLayout } from "@/components/layouts/AppLayout"
import { ActivitySection } from "./components/ActivitySection"
import { ActivityFilterProvider } from "./components/ActivityFilterForm"

const ActivityPage = () => {
    return (
        <AppLayout
            title="Activity"
        >
            <ActivityFilterProvider>
                <ActivitySection/>
            </ActivityFilterProvider>
        </AppLayout>
    )
}

export default ActivityPage
