import { Card, CardNav } from "@/components/cards/Card"
import { upperCaseFirst } from "@/helpers/formatter"
import { useEffect, useMemo, useState } from "react"
import { QrTypeSection } from "./QrTypeSection"
import { QrTypeFormProvider } from "./QrTypeForm"
import { SearchFormProvider } from "@/components/forms/SearchForm"
import { DropboxProvider } from "@/components/inputs/Dropbox"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"
import { QR_TYPES_GROUP_ALL } from "@/configs/permissions"

export const QrSettingSection = () => {
    const [index, setIndex] = useState(0)
    const [openPanel, setOpenPanel] = useState()

    const canAccessQrType = useHasAnyPermissions(QR_TYPES_GROUP_ALL)

    const availablePanels = useMemo(() => {
        const panels = []

        if (canAccessQrType) {
            panels.push('qr types')
        }

        return panels
    }, [])

    useEffect(() => {
        setOpenPanel(availablePanels[0])
        setIndex(0)
    }, [availablePanels])

    return (
        <Card
            noBorder
            navigation={ availablePanels.map((panel, i) => (
                <CardNav
                    key={panel}
                    onClick={() => {
                        setOpenPanel(panel)
                        setIndex(i)
                    }}
                    active={openPanel == panel}
                    label={upperCaseFirst(panel)}
                    onNavNext={() => {
                        if (index == availablePanels.length - 1) {
                            return
                        }
    
                        const newIndex = index + 1
                        setOpenPanel(availablePanels[newIndex])
                        setIndex(newIndex)
                    }}
                    navNextDisabled={index == availablePanels.length - 1}
                    onNavPrev={() => {
                        if (index == 0) {
                            return
                        }
    
                        const newIndex = index - 1
                        setOpenPanel(availablePanels[newIndex])
                        setIndex(newIndex)
                    }}
                    navPrevDisabled={index == 0}
                />
            )) }
        >
            <div className="tab-content">
                { openPanel == 'qr types' ? (
                    <QrTypeFormProvider>
                        <SearchFormProvider>
                            <DropboxProvider>
                                <QrTypeSection/>
                            </DropboxProvider>
                        </SearchFormProvider>
                    </QrTypeFormProvider>
                ) : (<></>) }
            </div>
        </Card>
    )
}