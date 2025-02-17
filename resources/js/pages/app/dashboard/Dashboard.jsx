import { AppLayout } from "@/components/layouts/AppLayout"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { DashboardSummary } from "./components/DashboardSummary"

const DashboardPage = () => {
    return (
        <AppLayout
            title="Dashboard"
        >
            <DashboardSummary/>
        </AppLayout>
    )
}

export default DashboardPage
