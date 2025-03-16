import { useGetSystem } from "@/services/swr/misc"
import { SystemInfoTemplate } from "./SystemInfoTemplate"
import { Check } from "@/icons/Check"
import { Plus } from "@/icons/Plus"
import { upperCaseFirst } from "@/helpers/formatter"
import { Card } from "@/components/cards/Card"

export const SystemInfoSection = ({
    className
}) => {
    const { data, isLoading } = useGetSystem()

    if (isLoading) {
        return <></>
    }
    
    return (
        <Card noBorder className={className}>
            <h4>System Information</h4>
            <SystemInfoTemplate hasBorder label="App Version">
                { data.result.system.versions.app }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="Laravel Version">
                { data.result.system.versions.laravel }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="Timezone">
                { data.result.system.timezone }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="Log Channel">
                { upperCaseFirst(data.result.system.debug.channel) }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="Debug Mode">
                { data.result.system.debug.mode ? (
                    <span className="text-crimson">
                        <Check size={18} className="me-2"/>
                        Yes
                    </span>
                ) : (
                    <span className="text-forest">
                        <Plus size={18} className="transform rotate-45 me-2"/>
                        No
                    </span>
                ) }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="Cache Writable">
                { data.result.system.dirWritable.cache ? (
                    <span className="text-forest">
                        <Check size={18} className="me-2"/>
                        Yes
                    </span>
                ) : (
                    <span className="text-crimson">
                        <Plus size={18} className="transform rotate-45 me-2"/>
                        No
                    </span>
                ) }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="Storage Writable">
                { data.result.system.dirWritable.storage ? (
                    <span className="text-forest">
                        <Check size={18} className="me-2"/>
                        Yes
                    </span>
                ) : (
                    <span className="text-crimson">
                        <Plus size={18} className="transform rotate-45 me-2"/>
                        No
                    </span>
                ) }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="Storage Linked">
                { data.result.system.storageLink?.exists ? (
                    <span className="text-forest">
                        <Check size={18} className="me-2"/>
                        Yes
                    </span>
                ) : (
                    <span className="text-crimson">
                        <Plus size={18} className="transform rotate-45 me-2"/>
                        No
                    </span>
                ) }
            </SystemInfoTemplate>
            <SystemInfoTemplate label="Storage Link Permission">
                { data.result.system.storageLink?.permission }
            </SystemInfoTemplate>
        </Card>
    )
}