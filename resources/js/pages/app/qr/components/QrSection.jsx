import { Button } from "@/components/buttons/Button"
import { Card } from "@/components/cards/Card"
import { DataCard, DataCardButton } from "@/components/cards/DataCard"
import { SearchForm, SearchFormContext } from "@/components/forms/SearchForm"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { Loader } from "@/components/misc/Loader"
import { formatDate } from "@/helpers/formatter"
import { Check } from "@/icons/Check"
import { Download } from "@/icons/Download"
import { Plus } from "@/icons/Plus"
import { QrCreateRoute, QrImageRoute } from "@/routes/app"
import { useGetQrCodes } from "@/services/swr/qr"
import { useContext, useState } from "react"
import { route } from "ziggy-js"
import { QrDetail, QrDetailContext } from "./QrDetail"
import { Info } from "@/icons/Info"
import { Pagination } from "@/components/navigations/Pagination"
import { toggleModal } from "@/helpers/toggleModal"
import { MDQrDelete } from "@/configs/modalId"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { qrDelete } from "@/services/api/qr"
import { notifySuccess } from "@/helpers/notification"

export const QrSection = () => {
    const [selectedId, setSelectedId] = useState('')
    const [sendLoading, setSendLoading] = useState(false)
    const { setFilter, committedFilter, setCommittedFilter }   = useContext(SearchFormContext)
    const { setSelected, setOpen } = useContext(QrDetailContext)
    const {data, isLoading, mutate} = useGetQrCodes(committedFilter)

    const handleShowDetail = (selected) => {
        setSelected(selected)
        setOpen(true)
    }

    const handlePaginate = (page) => {
        setFilter((prevState) => ({
            ...prevState,
            page: page,
        }))
        setCommittedFilter((prevState) => ({
            ...prevState,
            page: page,
        }))
    }

    const handleDelete = (selected) => {
        setSelectedId(selected.id)
        toggleModal(MDQrDelete, true)
    }

    const handleConfirmDelete = () => {
        if (!selectedId) {
            notifyError('No QR code is selected')
            return
        }

        if (sendLoading) {
            return
        }

        setSendLoading(true)

        qrDelete(selectedId)
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
        toggleModal(MDQrDelete, false)
        setSelectedId('')
    }

    return (
        <>
            <Card 
                noBorder
            >
                <header className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                    <h3 className="flex-shrink-0 fs-5 mb-0">
                        My Qr Codes
                    </h3>
                    <div className="text-end">
                        <Button 
                            href={route(QrCreateRoute)}
                            linkAsButton
                        >
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
                    <ErrorMsg message="No qr codes found"/>
                ) : (
                    <>
                        <div className="d-grid gap-3 grid-cols-1 grid-cols-lg-2 mb-3">
                            { data.result.map((qrCode) => (
                                <DataCard
                                    key={`qr-code-${qrCode.id}`}
                                    onDelete={() => handleDelete(qrCode)}
                                    customButton={(
                                        <>
                                            <DataCardButton
                                                as="download"
                                                className="btn-small btn-primary-950"
                                                icon={Download}
                                                title={`Download ${qrCode.name} QR Code`}
                                                href={route(QrImageRoute, qrCode.id)}
                                                download={`${qrCode.name} QR Code`}
                                            />
                                            <DataCardButton
                                                className="btn-small btn-neutral-800"
                                                icon={Info}
                                                title="Show detail"
                                                onClick={() => handleShowDetail(qrCode)}
                                            />
                                        </>
                                    )}
                                >
                                    <div className="d-flex gap-3 justify-content-center align-items-center">
                                        <div className="flex-shrink-0">
                                            <img 
                                                src={route(QrImageRoute, qrCode.id)}
                                                height={160}
                                                width={160}
                                                alt={`${qrCode.name} QR code`}
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="fw-semibold mb-2">
                                                { qrCode.name }
                                            </p>
                                            <div className="d-grid grid-cols-md-3 grid-cols-lg-2 grid-cols-xl-3 gap-3">
                                                <p className="mb-0">
                                                    Type:<br/>
                                                    <span className="fw-semibold">{ qrCode.type.name }</span>
                                                </p>
                                                <p className="mb-0">
                                                    Dynamic:<br/>
                                                    { qrCode.isDynamic ? (
                                                        <span className="text-forest">
                                                            <Check
                                                                size={24}
                                                                title="Yes"
                                                            />
                                                            {' '}
                                                            Yes
                                                        </span>
                                                    ) : (
                                                        <span className="text-crimson">
                                                            <Plus
                                                                size={24}
                                                                title="No"
                                                                className="transform rotate-45"
                                                            />
                                                            {' '}
                                                            No
                                                        </span>
                                                    ) }
                                                </p>
                                                <p className="mb-0">
                                                    Created At:<br/>
                                                    <span className="fw-semibold">{ formatDate(qrCode.createdAt) }</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </DataCard>
                            )) }
                        </div>
                        <Pagination
                            onClick={handlePaginate}
                            currentPage={data.pagination.currentPage}
                            maxPages={data.pagination.totalPage}
                        />
                    </>
                ) }
            </Card>
            <QrDetail/>
            <ConfirmModal
                id={MDQrDelete}
                title="Delete QR Code"
                message="Are you sure you want to delete this QR code?"
                negativeFlow
                loading={sendLoading}
                onCancel={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />
        </>
    )
}