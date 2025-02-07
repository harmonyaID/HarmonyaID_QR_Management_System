import { Card, CardNav } from "@/components/cards/Card"
import { upperCaseFirst } from "@/helpers/formatter"
import { useEffect, useMemo, useState } from "react"
import { UsageCategorySection } from "./UsageCategorySection"
import { UsageCategoryFormProvider } from "./UsageCategoryForm"
import { SearchFormProvider } from "@/components/forms/SearchForm"
import { DropboxProvider } from "@/components/inputs/Dropbox"
import { PlanFormProvider } from "./PlanForm"
import { PlanSection } from "./PlanSection"
import { RoleSection } from "./RoleSection"
import { PermissionSection } from "./PermissionSection"

export const AccountSettingSection = () => {
    const [index, setIndex] = useState(0)
    const [openPanel, setOpenPanel] = useState()

    const availablePanels = useMemo(() => {
        return ['roles', 'permissions', 'usage categories', 'plans']
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
                { openPanel == 'roles' ? (
                    <RoleSection/>
                ) : openPanel == 'permissions' ? (
                    <PermissionSection/>
                ) : openPanel == 'usage categories' ? (
                    <UsageCategoryFormProvider>
                        <SearchFormProvider>
                            <DropboxProvider>
                                <UsageCategorySection/>
                            </DropboxProvider>
                        </SearchFormProvider>
                    </UsageCategoryFormProvider>
                ) : openPanel == 'plans' ? (
                    <PlanFormProvider>
                        <SearchFormProvider>
                            <PlanSection/>
                        </SearchFormProvider>
                    </PlanFormProvider>
                ) : (<></>) }
            </div>
        </Card>
    )
}