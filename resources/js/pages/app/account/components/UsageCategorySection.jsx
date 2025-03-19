import { UsageCategoryForm, UsageCategoryFormContext } from "./UsageCategoryForm"
import { Button } from "@/components/buttons/Button"
import { useContext, useState } from "react"
import { SearchForm, SearchFormContext } from "@/components/forms/SearchForm"
import { useGetCategoryUsage } from "@/services/swr/account"
import { Loader } from "@/components/misc/Loader"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { DataCard, DataCardPicture } from "@/components/cards/DataCard"
import { storage_url } from "@/helpers/url"
import { MDUsageCategoryDelete } from "@/configs/modalId"
import { toggleModal } from "@/helpers/toggleModal"
import { notifyError, notifySuccess } from "@/helpers/notification"
import { usageCategoryDelete } from "@/services/api/account"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { USAGE_CATEGORIES_GROUP_CREATE, USAGE_CATEGORIES_GROUP_DELETE, USAGE_CATEGORIES_GROUP_READ, USAGE_CATEGORIES_GROUP_UPDATE } from "@/configs/permissions"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"
import { Pagination } from "@/components/navigations/Pagination"

export const UsageCategorySection = () => {
    const canCreate = useHasAnyPermissions(USAGE_CATEGORIES_GROUP_CREATE)
    const canRead   = useHasAnyPermissions(USAGE_CATEGORIES_GROUP_READ)
    const canUpdate = useHasAnyPermissions(USAGE_CATEGORIES_GROUP_UPDATE)
    const canDelete = useHasAnyPermissions(USAGE_CATEGORIES_GROUP_DELETE)

    const [sendLoading, setSendLoading] = useState(false)
    const [selectedId, setSelectedId]   = useState('')

    const { committedFilter, setCommittedFilter }   = useContext(SearchFormContext)
    const { setForm, setOpen }  = useContext(UsageCategoryFormContext)

    const {data, isLoading, mutate} = useGetCategoryUsage( canRead ? committedFilter : false )

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
        toggleModal(MDUsageCategoryDelete, true)
    }

    const handleConfirmDelete = () => {
        if (!canDelete) {
            return
        }

        if (!selectedId) {
            notifyError('No usage category is selected')
            return
        }

        if (sendLoading) {
            return
        }

        setSendLoading(true)

        usageCategoryDelete(selectedId)
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
        toggleModal(MDUsageCategoryDelete, false)
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
                        Manage Usage Category
                    </h3>
                    { canCreate ? (
                        <div className="text-end">
                            <Button onClick={() => setOpen(true)}>
                                Add New
                            </Button>
                        </div>
                    ) : (<></>)}
                </header>
                <SearchForm
                    className="mb-3"
                />
                { isLoading ? (
                    <div className="text-center">
                        <Loader/> Loading...
                    </div>
                ) : !data?.result?.length ? (
                    <ErrorMsg message="No usage category found"/>
                ) : (
                    <>
                        <div className="d-grid gap-3 grid-cols-1 grid-cols-md-2 grid-cols-lg-3 grid-cols-xxl-4">
                            { data.result.map((category) => (
                                <DataCard
                                    key={`category-${category.id}`}
                                    onEdit={ canUpdate ? () => handleEdit(category) : undefined }
                                    onDelete={ canDelete ? () => handleDelete(category) : undefined }
                                >
                                    <div className="d-flex gap-3 justify-content-center align-items-center">
                                        <div className="flex-shrink-0">
                                            <DataCardPicture
                                                squared
                                                src={ category.icon ? storage_url(category.icon) : `https://ui-avatars.com/api/?name=${category.name}&rounded=true&color=FFFFFF&background=0056B3&font-size=0.35` }
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="fw-semibold mb-0">
                                                { category.name }
                                            </p>
                                        </div>
                                    </div>
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
                <UsageCategoryForm
                    id={selectedId}
                    onSuccess={() => { mutate() }}
                />
            ) : (<></>) }

            { canDelete ? (
                <ConfirmModal
                    id={MDUsageCategoryDelete}
                    title="Delete usage category"
                    message="Are you sure you want to delete this usage category?"
                    negativeFlow
                    loading={sendLoading}
                    onCancel={handleCloseDelete}
                    onConfirm={handleConfirmDelete}
                />
            ) : (<></>) }
        </>
    )
}