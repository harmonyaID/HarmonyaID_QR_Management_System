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
import { formatPrice } from "@/helpers/formatter"

export const RoleSection = () => {
    const [sendLoading, setSendLoading] = useState(false)
    const [selectedId, setSelectedId]   = useState('')
    
    const { committedFilter }   = useContext(SearchFormContext)
    const { setForm, setOpen }  = useContext(RoleFormContext)

    const {data, isLoading, mutate} = useGetRoles(committedFilter)

    const handleEdit = (selected) => {
        setForm((prevState) => ({
            ...prevState,
            name: selected.name,
            icon: selected.icon,
        }))

        setOpen(true)
        setSelectedId(selected.id)
    }

    const handleDelete = (selected) => {
        setSelectedId(selected.id)
        toggleModal(MDRoleDelete, true)
    }

    const handleConfirmDelete = () => {
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
                <header className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                    <h3 className="flex-shrink-0 fs-5 mb-0">
                        Manage Roles
                    </h3>
                    <div className="text-end">
                        <Button onClick={() => setOpen(true)}>
                            Add New
                        </Button>
                    </div>
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
                        <div className="d-grid gap-3 grid-cols-1 grid-cols-md-2 grid-cols-lg-3 grid-cols-xxl-4">
                            { data.result.map((role) => (
                                <DataCard
                                    key={`role-${role.id}`}
                                    onEdit={ role.deletable ? () => handleEdit(role) : undefined}
                                    onDelete={ role.deletable ? () => handleDelete(role) : undefined}
                                >
                                    <p className="fw-semibold mb-0">
                                        { role.name }
                                    </p>
                                </DataCard>
                            )) }
                        </div>
                    </>
                ) }
            </section>
            <RoleForm
                id={selectedId}
                onSuccess={() => { mutate() }}
            />
            <ConfirmModal
                id={MDRoleDelete}
                title="Delete role"
                message="Are you sure you want to delete this role?"
                negativeFlow
                loading={sendLoading}
                onCancel={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />
        </>
    )
}