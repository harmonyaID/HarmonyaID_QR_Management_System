import { Card } from "@/components/cards/Card"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { Loader } from "@/components/misc/Loader"
import { upperCaseFirst } from "@/helpers/formatter"
import { Check } from "@/icons/Check"
import { Plus } from "@/icons/Plus"
import { useGetSystem, useGetSystemSize } from "@/services/swr/misc"
import { SystemInfoTemplate } from "./SystemInfoTemplate"
import { SystemInfoSection } from "./SystemInfoSection"
import { ServerInfoSection } from "./ServerInfoSection"
import { PackagesInfoSection } from "./PackagesInfoSection"

export const SystemSection = () => {
    
    const { data: systemData, isLoading: systemLoading } = useGetSystem()
    const { data: sizeData, isLoading: sizeLoading } = useGetSystemSize()

    return (
        <section className="d-grid grid-cols-md-2 gap-4">
            <Card className="grid-span-md-2" noBorder>
                <SystemInfoTemplate
                    label="Application Size"
                    notes="(Recalculated twice a day)"
                >
                    { sizeLoading ? (
                        <>
                            <Loader small className="me-2"/>
                            Loading...
                        </>
                    ) : !sizeData?.result?.size ? (
                        <span className="text-crimson">
                            Unable to calculate the size of the application
                        </span>
                    ) : (
                        <p className="mb-0 fs-3 fw-medium">
                            { sizeData.result.size }
                        </p>
                    ) }
                </SystemInfoTemplate>
            </Card>
            { systemLoading ? (
                <section className="grid-span-md-2">
                    <Card noBorder>
                        <Loader small/> Loading...
                    </Card>
                </section>
            ) : !systemData.result? (
                <section className="grid-span-md-2">
                    <ErrorMsg message="Unable to load system information"/>
                </section>
            ) : (
                <>
                    <SystemInfoSection/>
                    <ServerInfoSection className={"grid-row-span-md-2"}/>
                    <PackagesInfoSection/>
                </>
            ) }
        </section>
    )
}