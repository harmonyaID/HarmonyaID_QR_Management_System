import { PlanForm, PlanFormContext } from "./PlanForm"
import { Button } from "@/components/buttons/Button"
import { useContext, useState } from "react"
import { SearchForm, SearchFormContext } from "@/components/forms/SearchForm"
import { useGetPlans } from "@/services/swr/account"
import { Loader } from "@/components/misc/Loader"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { DataCard } from "@/components/cards/DataCard"
import { MDPlanDelete } from "@/configs/modalId"
import { toggleModal } from "@/helpers/toggleModal"
import { notifyError, notifySuccess } from "@/helpers/notification"
import { planDelete } from "@/services/api/account"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { formatPrice } from "@/helpers/formatter"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"
import { PLANS_GROUP_CREATE, PLANS_GROUP_DELETE, PLANS_GROUP_READ, PLANS_GROUP_UPDATE } from "@/configs/permissions"
import { Pagination } from "@/components/navigations/Pagination"

export const PlanSection = () => {
    const [sendLoading, setSendLoading] = useState(false)
    const [selectedId, setSelectedId]   = useState('')

    const canCreate = useHasAnyPermissions(PLANS_GROUP_CREATE)
    const canRead   = useHasAnyPermissions(PLANS_GROUP_READ)
    const canUpdate = useHasAnyPermissions(PLANS_GROUP_UPDATE)
    const canDelete = useHasAnyPermissions(PLANS_GROUP_DELETE)
    
    const { committedFilter, setCommittedFilter }   = useContext(SearchFormContext)
    const { setForm, setOpen }  = useContext(PlanFormContext)

    const {data, isLoading, mutate} = useGetPlans( canRead ? committedFilter : false )

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
        toggleModal(MDPlanDelete, true)
    }

    const handleConfirmDelete = () => {
        if (!canDelete) {
            return
        }

        if (!selectedId) {
            notifyError('No plan is selected')
            return
        }

        if (sendLoading) {
            return
        }

        setSendLoading(true)

        planDelete(selectedId)
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
        toggleModal(MDPlanDelete, false)
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
                        Manage Plans
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
                    <ErrorMsg message="No plan found"/>
                ) : (
                    <>
                        <div className="d-grid gap-3 grid-cols-1 grid-cols-md-2 grid-cols-lg-3 grid-cols-xxl-4 mb-3">
                            { data.result.map((plan) => (
                                <DataCard
                                    key={`plan-${plan.id}`}
                                    onEdit={ canUpdate ? () => handleEdit(plan) : undefined }
                                    onDelete={ canDelete ? () => handleDelete(plan) : undefined }
                                >
                                    <p className="fw-semibold mb-3">
                                        { plan.name }
                                    </p>
                                    <p className="mb-0">
                                        { formatPrice(plan.price) }
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
                <PlanForm
                    id={selectedId}
                    onSuccess={() => { mutate() }}
                />
            ) : (<></>) }

            { canDelete ? (
                <ConfirmModal
                    id={MDPlanDelete}
                    title="Delete plan"
                    message="Are you sure you want to delete this plan?"
                    negativeFlow
                    loading={sendLoading}
                    onCancel={handleCloseDelete}
                    onConfirm={handleConfirmDelete}
                />
            ) : (<></>) }
        </>
    )
}