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
import { RoleFormProvider } from "./RoleForm"
import { PermissionSearchProvider } from "./PermissionSearchForm"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"
import { PERMISSIONS_GROUP_ALL, PLANS_GROUP_ALL, ROLES_GROUP_ALL, USAGE_CATEGORIES_GROUP_ALL, USERS_GROUP_ALL } from "@/configs/permissions"
import { UserFormProvider } from "./UserForm"
import { UserSection } from "./UserSection"

export const AccountSettingSection = () => {
    const [index, setIndex] = useState(0)
    const [openPanel, setOpenPanel] = useState()
    const canAccessUser     = useHasAnyPermissions(USERS_GROUP_ALL)
    const canAccessRole     = useHasAnyPermissions(ROLES_GROUP_ALL)
    const canAccessPerm     = useHasAnyPermissions(PERMISSIONS_GROUP_ALL)
    const canAccessUsage    = useHasAnyPermissions(USAGE_CATEGORIES_GROUP_ALL)
    const canAccessPlan     = useHasAnyPermissions(PLANS_GROUP_ALL)

    const availablePanels = useMemo(() => {
        const panels = []

        if (canAccessUser) {
            panels.push('users')
        }

        if (canAccessRole) {
            panels.push('roles')
        }

        if (canAccessPerm) {
            panels.push('permissions')
        }

        if (canAccessUsage) {
            panels.push('usage categories')
        }

        if (canAccessPlan) {
            panels.push('plans')
        }

        return panels
    }, [canAccessRole, canAccessPerm, canAccessUsage, canAccessPlan])

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
                { openPanel == 'users' ? (
                    <UserFormProvider>
                        <SearchFormProvider>
                            <UserSection/>
                        </SearchFormProvider>
                    </UserFormProvider>
                ) : openPanel == 'roles' ? (
                    <RoleFormProvider>
                        <SearchFormProvider>
                            <RoleSection/>
                        </SearchFormProvider>
                    </RoleFormProvider>
                ) : openPanel == 'permissions' ? (
                    <PermissionSearchProvider>
                        <PermissionSection/>
                    </PermissionSearchProvider>
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