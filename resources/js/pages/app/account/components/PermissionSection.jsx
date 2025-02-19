import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { PermissionSearchContext, PermissionSearchForm } from "./PermissionSearchForm"
import { useContext, useRef } from "react"
import { useGetPermissions } from "@/services/swr/account"
import { Table } from "@/components/tables/Table"
import { Loader } from "@/components/misc/Loader"
import { upperCaseFirst } from "@/helpers/formatter"
import { PermissionCheck } from "./PermissionCheck"
import { usePage } from "@inertiajs/react"

export const PermissionSection = () => {
    const { committedFilter } = useContext(PermissionSearchContext)
    const { data, isLoading, mutate } = useGetPermissions(committedFilter)

    const updateTimeoutRef = useRef()

    const { props } = usePage()

    const handleUpdate = () => {
        clearTimeout(updateTimeoutRef.current)

        updateTimeoutRef.current = setTimeout(() => {
            mutate()
        }, 1500)
    }

    return (
        <section
            className={`${
                "tab-pane fade show active"
            }`}
        >
            <header className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                <h3 className="flex-shrink-0 fs-5 mb-0">
                    Manage Permissions
                </h3>
            </header>
            <PermissionSearchForm
                className="mb-3"
            />
            { !committedFilter?.roleId ? (
                <ErrorMsg message="Please select a role"/>
            ) : isLoading ? (
                <div className="text-center">
                    <Loader/> Loading...
                </div>
            ) : !data?.result?.permissions ? (
                <ErrorMsg message="Unable to find any permission"/>
            ) : (
                <Table tableClassName="table-striped">
                    <thead>
                        <tr>
                            <th>
                                Action
                            </th>
                            { data.result.groups.map((group) => (
                                <th key={`group-${group}-head`}>
                                    { upperCaseFirst(group) }
                                </th>
                            )) }
                        </tr>
                    </thead>
                    <tbody>
                        { data.result.actions.map(action => (
                            <tr 
                                key={`action-${action}`}
                            >
                                <th>
                                    { action == '*' ? 'All' : upperCaseFirst(action) }
                                </th>
                                { data.result.groups.map((group) => (
                                    <td 
                                        className="text-center"
                                        key={`action-${group}-${action}`}
                                    >
                                        { data.result.permissions[group][action] ? (
                                            <PermissionCheck
                                                permission={data.result.permissions[group][action]}
                                                roleId={committedFilter.roleId}
                                                checked={
                                                    data.result.permissions[group][action].checked || 
                                                    ( action != '*' && data.result.permissions[group]['*'].checked )
                                                }
                                                disabled={
                                                    committedFilter.roleId == props.superadminRoleId || 
                                                    ( committedFilter.roleId == props.user.roleId && group == 'permissions' ) ||
                                                    ( action != '*' && data.result.permissions[group]['*'].checked )
                                                }
                                                onSuccess={handleUpdate}
                                            />
                                        ) : (<></>) }
                                    </td>
                                )) }
                            </tr>
                        )) }
                    </tbody>
                </Table>
            ) }
        </section>
    )
}