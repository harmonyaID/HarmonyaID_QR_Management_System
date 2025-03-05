import { useGetSystem } from "@/services/swr/misc"
import { SystemInfoTemplate } from "./SystemInfoTemplate"
import { Check } from "@/icons/Check"
import { Plus } from "@/icons/Plus"
import { upperCaseFirst } from "@/helpers/formatter"
import { Card } from "@/components/cards/Card"

export const ServerInfoSection = ({
    className
}) => {
    const { data, isLoading } = useGetSystem()
    
    if (isLoading) {
        return <></>
    }

    return (
        <Card noBorder className={className}>
            <h4>Server Information</h4>
            <SystemInfoTemplate hasBorder label="PHP Version">
                { data.result.server.version }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="Operating System">
                { data.result.server.OS }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="Software">
                { data.result.server.software }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="Database Driver">
                { data.result.server.dbConnectionName }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="Cache Driver">
                { upperCaseFirst(data.result.server.drivers.cache) }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="Session Driver">
                { upperCaseFirst(data.result.server.drivers.session) }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="SSL (HTTPS)">
                { data.result.server.curl ? (
                    <span className="text-forest">
                        <Check size={18} className="me-2"/>
                        Enabled
                    </span>
                ) : (
                    <span className="text-crimson">
                        <Plus size={18} className="transform rotate-45 me-2"/>
                        Disabled
                    </span>
                ) }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="CURL Extension">
                { data.result.server.curl ? (
                    <span className="text-forest">
                        <Check size={18} className="me-2"/>
                        Enabled
                    </span>
                ) : (
                    <span className="text-crimson">
                        <Plus size={18} className="transform rotate-45 me-2"/>
                        Disabled
                    </span>
                ) }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="EXIF Extension">
                { data.result.server.exif ? (
                    <span className="text-forest">
                        <Check size={18} className="me-2"/>
                        Enabled
                    </span>
                ) : (
                    <span className="text-crimson">
                        <Plus size={18} className="transform rotate-45 me-2"/>
                        Disabled
                    </span>
                ) }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="FileInfo Extension">
                { data.result.server.fileinfo ? (
                    <span className="text-forest">
                        <Check size={18} className="me-2"/>
                        Enabled
                    </span>
                ) : (
                    <span className="text-crimson">
                        <Plus size={18} className="transform rotate-45 me-2"/>
                        Disabled
                    </span>
                ) }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="MBString Extension">
                { data.result.server.mbstring ? (
                    <span className="text-forest">
                        <Check size={18} className="me-2"/>
                        Enabled
                    </span>
                ) : (
                    <span className="text-crimson">
                        <Plus size={18} className="transform rotate-45 me-2"/>
                        Disabled
                    </span>
                ) }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="OpenSSL Extension">
                { data.result.server.openssl ? (
                    <span className="text-forest">
                        <Check size={18} className="me-2"/>
                        Enabled
                    </span>
                ) : (
                    <span className="text-crimson">
                        <Plus size={18} className="transform rotate-45 me-2"/>
                        Disabled
                    </span>
                ) }
            </SystemInfoTemplate>
            <SystemInfoTemplate hasBorder label="PDO Extension">
                { data.result.server.pdo ? (
                    <span className="text-forest">
                        <Check size={18} className="me-2"/>
                        Enabled
                    </span>
                ) : (
                    <span className="text-crimson">
                        <Plus size={18} className="transform rotate-45 me-2"/>
                        Disabled
                    </span>
                ) }
            </SystemInfoTemplate>
            <SystemInfoTemplate label="Tokenizer Extension">
                { data.result.server.curl ? (
                    <span className="text-forest">
                        <Check size={18} className="me-2"/>
                        Enabled
                    </span>
                ) : (
                    <span className="text-crimson">
                        <Plus size={18} className="transform rotate-45 me-2"/>
                        Disabled
                    </span>
                ) }
            </SystemInfoTemplate>
        </Card>
    )
}