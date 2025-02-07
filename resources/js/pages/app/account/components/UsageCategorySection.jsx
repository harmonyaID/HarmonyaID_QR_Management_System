import { Card } from "@/components/cards/Card"
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

export const UsageCategorySection = () => {
    const {
        committedFilter
    } = useContext(SearchFormContext)

    const { 
        setForm, 
        open, setOpen,
        loading, setLoading,
    } = useContext(UsageCategoryFormContext)

    const [sendLoading, setSendLoading] = useState(false)
    const [selectedId, setSelectedId] = useState('')
    const {data, isLoading, mutate} = useGetCategoryUsage(committedFilter)

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
        toggleModal(MDUsageCategoryDelete, true)
    }

    const handleConfirmDelete = () => {
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
            <Card noBorder>
                <header className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                    <h3 className="flex-shrink-0 fs-5 mb-0">
                        Manage Usage Category
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
                ) : !data?.result?.data?.length ? (
                    <ErrorMsg message="No usage category found"/>
                ) : (
                    <>
                        <div className="d-grid gap-3 grid-cols-1 grid-cols-md-2 grid-cols-lg-3 grid-cols-xxl-4">
                            { data.result.data.map((category) => (
                                <DataCard
                                    key={`category-${category.id}`}
                                    onEdit={() => handleEdit(category)}
                                    onDelete={() => handleDelete(category)}
                                >
                                    <div className="d-flex gap-3 justify-content-center align-items-center">
                                        <div className="flex-shrink-0">
                                            <DataCardPicture
                                                src={ category.icon ? storage_url(category.icon) : `https://ui-avatars.com/api/?name=${category.name}&rounded=true&color=FFFFFF&background=0099AB&font-size=0.35` }
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
                    </>
                ) }
            </Card>
            <UsageCategoryForm
                id={selectedId}
                onSuccess={() => { mutate() }}
            />
            <ConfirmModal
                id={MDUsageCategoryDelete}
                title="Delete usage category"
                message="Are you sure you want to delete this usage category?"
                negativeFlow
                loading={sendLoading}
                onCancel={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />
        </>
    )
}