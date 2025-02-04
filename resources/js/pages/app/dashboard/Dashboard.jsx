import { AppLayout } from "@/components/layouts/AppLayout"
import { ErrorMsg } from "@/components/misc/ErrorMsg"

const DashboardPage = () => {
    return (
        <AppLayout
            title="Dashboard"
        >
            <ErrorMsg
                message="Working In Progress"
            />
        </AppLayout>
    )
}

export default DashboardPage
