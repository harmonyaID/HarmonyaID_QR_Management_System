import { useGetMyCategoryUsage } from "@/services/swr/account"
import { UsageCategoryCard } from "./UsageCategoryCard"
import { ErrorMsg } from "@/components/misc/ErrorMsg"

export const AccountSection = () => {
    const {data, isLoading} = useGetMyCategoryUsage()

    return (
        <div className="d-grid grid-cols-lg-2 gap-3">
            <UsageCategoryCard
                category={data?.result}
                loading={isLoading}
            />
            
            <ErrorMsg
                message="Work In Progress"
            />
        </div>
    )
}