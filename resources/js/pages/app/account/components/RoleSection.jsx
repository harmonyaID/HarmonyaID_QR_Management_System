import { RoleForm, RoleFormContext } from "./RoleForm"
import { Button } from "@/components/buttons/Button"
import { useContext, useState } from "react"
import { SearchForm, SearchFormContext } from "@/components/forms/SearchForm"
import { useGetRoles } from "@/services/swr/account"
import { Loader } from "@/components/misc/Loader"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { DataCard } from "@/components/cards/DataCard"
import { MDRoleDelete } from "@/configs/modalId"
import { toggleModal } from "@/helpers/toggleModal"
import { notifyError, notifySuccess } from "@/helpers/notification"
import { roleDelete } from "@/services/api/account"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"
import { ROLES_GROUP_CREATE, ROLES_GROUP_DELETE, ROLES_GROUP_READ, ROLES_GROUP_UPDATE } from "@/configs/permissions"
import { Pagination } from "@/components/navigations/Pagination"

export const RoleSection = () => {
    const [sendLoading, setSendLoading] = useState(false)
    const [selectedId, setSelectedId]   = useState('')

    const canCreate = useHasAnyPermissions(ROLES_GROUP_CREATE)
    const canRead   = useHasAnyPermissions(ROLES_GROUP_READ)
    const canUpdate = useHasAnyPermissions(ROLES_GROUP_UPDATE)
    const canDelete = useHasAnyPermissions(ROLES_GROUP_DELETE)
    
    const { committedFilter, setCommittedFilter }   = useContext(SearchFormContext)
    const { setForm, setOpen }  = useContext(RoleFormContext)

    const {data, isLoading, mutate} = useGetRoles(canRead ? committedFilter : false)

    const handlePaginate = (page) => {
        if (!canRead) {
            return
        }

        setCommittedFilter((prevState) => ({
            ...prevState,
            page: page,
        }))
    }

    const handleEdit = (selected) => {
        if (!canUpdate) {
            return
        }

        setForm((prevState) => ({
            ...prevState,
            name: selected.name,
            icon: selected.icon,
        }))

        setOpen(true)
        setSelectedId(selected.id)
    }

    const handleDelete = (selected) => {
        if (!canDelete) {
            return
        }

        setSelectedId(selected.id)
        toggleModal(MDRoleDelete, true)
    }

    const handleConfirmDelete = () => {
        if (!canDelete) {
            return
        }

        if (!selectedId) {
            notifyError('No role is selected')
            return
        }

        if (sendLoading) {
            return
        }

        setSendLoading(true)

        roleDelete(selectedId)
            .then((response) => {
                if (!response) {
                    return
                }

                notifySuccess(response.status.message)
                mutate()
                handleCloseDelete()
            })
            .finally(() => {
                setSendLoading(false)
            })
    }

    const handleCloseDelete = () => {
        toggleModal(MDRoleDelete, false)
        setSelectedId(0)
    }

    return (
        <>
            <section
                className={`${
                    "tab-pane fade show active"
                }`}
            >
                <header className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                    <h3 className="flex-shrink-0 mb-0">
                        Manage Roles
                    </h3>
                    { canCreate ? (
                        <div className="text-end">
                            <Button onClick={() => setOpen(true)}>
                                Add New
                            </Button>
                        </div>
                    ) : (<></>) }
                </header>
                <SearchForm
                    className="mb-3"
                />
                { isLoading ? (
                    <div className="text-center">
                        <Loader/> Loading...
                    </div>
                ) : !data?.result?.length ? (
                    <ErrorMsg message="No role found"/>
                ) : (
                    <>
                        <div className="d-grid gap-3 grid-cols-1 grid-cols-md-2 grid-cols-lg-3 grid-cols-xxl-4 mb-3">
                            { data.result.map((role) => (
                                <DataCard
                                    key={`role-${role.id}`}
                                    onEdit={ role.deletable && canUpdate ? () => handleEdit(role) : undefined}
                                    onDelete={ role.deletable && canDelete ? () => handleDelete(role) : undefined}
                                >
                                    <p className="fw-semibold mb-0">
                                        { role.name }
                                    </p>
                                </DataCard>
                            )) }
                        </div>
                        <Pagination
                            currentPage={data.pagination.currentPage}
                            maxPages={data.pagination.totalPage}
                            onClick={handlePaginate}
                        />
                    </>
                ) }
            </section>
            { canCreate || canUpdate ? (
                <RoleForm
                    id={selectedId}
                    onSuccess={() => { mutate() }}
                />
            ) : (<></>) }

            { canDelete ? (
                <ConfirmModal
                    id={MDRoleDelete}
                    title="Delete role"
                    message="Are you sure you want to delete this role?"
                    negativeFlow
                    loading={sendLoading}
                    onCancel={handleCloseDelete}
                    onConfirm={handleConfirmDelete}
                />
            ) : (<></>) }
        </>
    )
}