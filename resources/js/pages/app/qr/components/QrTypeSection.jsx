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

export const QrTypeSection = () => {
    const [sendLoading, setSendLoading] = useState(false)
    const [selectedId, setSelectedId]   = useState('')

    const { committedFilter }   = useContext(SearchFormContext)
    const { setForm, setOpen }  = useContext(QrTypeFormContext)

    const {data, isLoading, mutate} = useGetQrTypes(committedFilter)

    const handleEdit = (selected) => {
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
        setSelectedId(selected.id)
        toggleModal(MDQrTypeDelete, true)
    }

    const handleConfirmDelete = () => {
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
                <header className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                    <h3 className="flex-shrink-0 fs-5 mb-0">
                        Manage Qr Type
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
                    <ErrorMsg message="No qr type found"/>
                ) : (
                    <>
                        <div className="d-grid gap-3 grid-cols-1 grid-cols-md-2 grid-cols-lg-3 grid-cols-xxl-4">
                            { data.result.data.map((type) => (
                                <DataCard
                                    key={`type-${type.id}`}
                                    onEdit={() => handleEdit(type)}
                                    onDelete={() => handleDelete(type)}
                                >
                                    <div className="d-flex gap-3 justify-content-center align-items-center">
                                        <div className="flex-shrink-0">
                                            <DataCardPicture
                                                src={ type.icon ? storage_url(type.icon) : `https://ui-avatars.com/api/?name=${type.name}&rounded=true&color=FFFFFF&background=0099AB&font-size=0.35` }
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
                    </>
                ) }
            </section>
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
            <ConfirmModal
                id={MDQrTypeDelete}
                title="Delete qr type"
                message="Are you sure you want to delete this qr type?"
                negativeFlow
                loading={sendLoading}
                onCancel={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />
        </>
    )
}