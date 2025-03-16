import { SummaryCard } from "@/components/cards/SummaryCard"
import { USERS_GROUP_READ } from "@/configs/permissions"
import { formatNumber } from "@/helpers/formatter"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"
import { useGetDashboard } from "@/services/swr/dashboard"

export const DashboardSummary = () => {
    const { data, isLoading }   = useGetDashboard()
    const hasUserPermission     = useHasAnyPermissions(USERS_GROUP_READ)

    return (
        <section
            className="d-grid grid-cols-md-2 grid-cols-lg-3 grid-cols-xl-4 gap-3 mb-4"
        >
            <SummaryCard
                label="Created Qr Codes"
                data={ formatNumber(data?.result?.totalQr || 0) }
                loading={isLoading}
            />
            { hasUserPermission && typeof data?.result?.totalUser == 'number' ? (
                <SummaryCard
                    label="Number of Users"
                    data={ formatNumber(data.result.totalUser || 0) }
                    loading={isLoading}
                />
            ) : (<></>) }
        </section>
    )
}