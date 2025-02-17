import { SummaryCard } from "@/components/cards/SummaryCard"
import { formatNumber } from "@/helpers/formatter"
import { useGetDashboard } from "@/services/swr/dashboard"

export const DashboardSummary = () => {
    const { data, isLoading } = useGetDashboard()

    return (
        <section
            className="d-grid grid-cols-md-2 grid-cols-lg-3 grid-cols-xl-4 gap-3 mb-4"
        >
            <SummaryCard
                label="Created Qr Codes"
                data={ formatNumber(data?.result?.totalQr || 0) }
                loading={isLoading}
            />
        </section>
    )
}