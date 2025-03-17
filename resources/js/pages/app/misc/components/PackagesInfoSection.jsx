import { useGetSystemPackage } from "@/services/swr/misc"
import { SystemInfoTemplate } from "./SystemInfoTemplate"
import { Card } from "@/components/cards/Card"
import { Loader } from "@/components/misc/Loader"

export const PackagesInfoSection = ({
    className
}) => {
    const { data, isLoading } = useGetSystemPackage()

    return (
        <Card noBorder className={className}>
            <h4>Installed Packages</h4>
            { isLoading ? (
                <div className="text-center">
                    <Loader small/> Loading...
                </div>
            ) : data.result.map((item, index, packages) => (
                <SystemInfoTemplate 
                    key={item.name}
                    hasBorder={index < packages.length - 1} 
                    label={item.name}
                    className={`${
                        !item.version ? 'text-crimson' : ''
                    }`}
                >
                    { item.version ? item.version : 'Not installed' }
                </SystemInfoTemplate>
            )) }
        </Card>
    )
}