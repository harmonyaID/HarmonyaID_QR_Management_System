import { QrTypeForm, QrTypeFormContext } from "./QrTypeForm"
import { Button } from "@/components/buttons/Button"
import { useContext, useState } from "react"
import { SearchForm, SearchFormContext } from "@/components/forms/SearchForm"
import { Loader } from "@/components/misc/Loader"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { DataCard, DataCardPicture } from "@/components/cards/DataCard"
import { toggleModal } from "@/helpers/toggleModal"
import { notifyError, notifySuccess } from "@/helpers/notification"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { qrTypeDelete } from "@/services/api/qr"
import { MDQrTypeDelete } from "@/configs/modalId"
import { useGetQrTypes } from "@/services/swr/qr"
import { storage_url } from "@/helpers/url"
import { Pagination } from "@/components/navigations/Pagination"
import { QR_TYPES_GROUP_CREATE, QR_TYPES_GROUP_DELETE, QR_TYPES_GROUP_READ, QR_TYPES_GROUP_UPDATE } from "@/configs/permissions"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"

export const QrTypeSection = () => {
    const [sendLoading, setSendLoading] = useState(false)
    const [selectedId, setSelectedId]   = useState('')

    const canCreate = useHasAnyPermissions(QR_TYPES_GROUP_CREATE)
    const canRead   = useHasAnyPermissions(QR_TYPES_GROUP_READ)
    const canUpdate = useHasAnyPermissions(QR_TYPES_GROUP_UPDATE)
    const canDelete = useHasAnyPermissions(QR_TYPES_GROUP_DELETE)

    const { committedFilter, setCommittedFilter }   = useContext(SearchFormContext)
    const { setForm, setOpen }  = useContext(QrTypeFormContext)

    const {data, isLoading, mutate} = useGetQrTypes( canRead ? committedFilter : false )

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
            name        : selected.name,
            dataTypeId  : selected.dataTypeId,
            icon        : selected.icon,
            description : selected.description,
        }))

        setOpen(true)
        setSelectedId(selected.id)
    }

    const handleDelete = (selected) => {
        if (!canDelete) {
            return
        }

        setSelectedId(selected.id)
        toggleModal(MDQrTypeDelete, true)
    }

    const handleConfirmDelete = () => {
        if (!canDelete) {
            return
        }

        if (!selectedId) {
            notifyError('No qr type is selected')
            return
        }

        if (sendLoading) {
            return
        }

        setSendLoading(true)

        qrTypeDelete(selectedId)
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
        toggleModal(MDQrTypeDelete, false)
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
                        Manage Qr Type
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
                    className="mb-5"
                />
                { isLoading ? (
                    <div className="text-center">
                        <Loader/> Loading...
                    </div>
                ) : !data?.result?.length ? (
                    <ErrorMsg message="No qr type found"/>
                ) : (
                    <>
                        <div className="d-grid gap-3 grid-cols-1 grid-cols-md-2 grid-cols-lg-3 grid-cols-xxl-4 mb-3">
                            { data.result.map((type) => (
                                <DataCard
                                    key={`type-${type.id}`}
                                    onEdit={ canUpdate ? () => handleEdit(type) : undefined }
                                    onDelete={ canDelete ? () => handleDelete(type) : undefined }
                                >
                                    <div className="d-flex gap-3 justify-content-center">
                                        <div className="flex-shrink-0">
                                            <DataCardPicture
                                                squared
                                                src={ type.icon ? storage_url(type.icon) : `https://ui-avatars.com/api/?name=${type.name}&rounded=true&color=FFFFFF&background=0056B3&font-size=0.35` }
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="fw-semibold mb-1">
                                                { type.name }
                                            </p>
                                            <p className="mb-0 text-truncate">
                                                { type.description }
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
                <QrTypeForm
                    id={selectedId}
                    onSuccess={() => { 
                        mutate() 
                        if (selectedId) {
                            setOpen(false)
                            setSelectedId('')
                        }
                    }}
                />
            ) : (<></>) }
            { canDelete ? (
                <ConfirmModal
                    id={MDQrTypeDelete}
                    title="Delete qr type"
                    message="Are you sure you want to delete this qr type?"
                    negativeFlow
                    loading={sendLoading}
                    onCancel={handleCloseDelete}
                    onConfirm={handleConfirmDelete}
                />
            ) : (<></>) }
        </>
    )
}