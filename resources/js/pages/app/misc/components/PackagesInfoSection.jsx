import { useGetSystem } from "@/services/swr/misc"
import { SystemInfoTemplate } from "./SystemInfoTemplate"
import { Card } from "@/components/cards/Card"

export const PackagesInfoSection = ({
    className
}) => {
    const { data, isLoading } = useGetSystem()

    if (isLoading) {
        return <></>
    }

    return (
        <Card noBorder className={className}>
            <h4>Installed Packages</h4>
            { data.result.packages.map((item, index, packages) => (
                <SystemInfoTemplate 
                    key={item.name}
                    hasBorder={index < packages.length - 1} 
                    label={item.name}
                >
                    { item.version }
                </SystemInfoTemplate>
            )) }
        </Card>
    )
}