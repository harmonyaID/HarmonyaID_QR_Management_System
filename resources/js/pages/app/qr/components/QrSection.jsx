import { Button } from "@/components/buttons/Button"
import { Card } from "@/components/cards/Card"
import { DataCard, DataCardButton } from "@/components/cards/DataCard"
import { SearchForm, SearchFormContext } from "@/components/forms/SearchForm"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { Loader } from "@/components/misc/Loader"
import { formatDate, formatNumber } from "@/helpers/formatter"
import { Check } from "@/icons/Check"
import { Download } from "@/icons/Download"
import { Plus } from "@/icons/Plus"
import { QrCreateRoute, QrEditRoute, QrImageRoute } from "@/routes/app"
import { useGetQrCodes } from "@/services/swr/qr"
import { useContext, useState } from "react"
import { route } from "ziggy-js"
import { QrDetail, QrDetailContext } from "./QrDetail"
import { Pagination } from "@/components/navigations/Pagination"
import { toggleModal } from "@/helpers/toggleModal"
import { MDQrDelete } from "@/configs/modalId"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { qrDelete } from "@/services/api/qr"
import { notifySuccess } from "@/helpers/notification"
import { SummaryCard } from "@/components/cards/SummaryCard"
import { QR_GROUP_CREATE, QR_GROUP_DELETE, QR_GROUP_READ, QR_GROUP_UPDATE } from "@/configs/permissions"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"
import { Table } from "@/components/tables/Table"
import { DataDisplay } from "@/components/misc/DataDisplay"
import { Delete } from "@/icons/Delete"
import { Edit } from "@/icons/Edit"

export const QrSection = () => {
    const canCreate = useHasAnyPermissions(QR_GROUP_CREATE)
    const canRead   = useHasAnyPermissions(QR_GROUP_READ)
    const canUpdate = useHasAnyPermissions(QR_GROUP_UPDATE)
    const canDelete = useHasAnyPermissions(QR_GROUP_DELETE)

    const [selectedId, setSelectedId] = useState('')
    const [sendLoading, setSendLoading] = useState(false)
    const { committedFilter, setCommittedFilter }   = useContext(SearchFormContext)
    const { setSelected, setOpen } = useContext(QrDetailContext)
    const {data, isLoading, mutate} = useGetQrCodes( canRead ? committedFilter : false )

    const handleShowDetail = (selected) => {
        if (!canRead) {
            return
        }

        setSelected(selected)
        setOpen(true)
    }

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
        return (event) => {
            event.preventDefault()
            event.stopPropagation()

            if (!canUpdate) {
                return
            }
    
            window.open(route(QrEditRoute, selected.id), '_self')
        }
    }

    const handleDelete = (selected) => {
        return (event) => {
            event.preventDefault()
            event.stopPropagation()

            if (!canDelete) {
                return
            }
    
            setSelectedId(selected.id)
            toggleModal(MDQrDelete, true)
        }
    }

    const handleConfirmDelete = () => {
        if (!canDelete) {
            return
        }

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
            <section className="d-grid grid-cols-md-2 grid-cols-lg-3 grid-cols-xl-4 gap-3 mb-3">
                <SummaryCard
                    label="Created Qr Codes"
                    data={ formatNumber(data?.pagination?.total || 0) }
                    loading={isLoading}
                />
            </section>
            <Card 
                noBorder
            >
                <header className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                    <h3 className="flex-shrink-0 mb-0">
                        My Qr Codes
                    </h3>
                    { canCreate ? (
                        <div className="text-end">
                            <Button 
                                href={route(QrCreateRoute)}
                                linkAsButton
                            >
                                Add New
                            </Button>
                        </div>
                    ) : (<></>) }
                </header>
                <SearchForm
                    className="mb-3"
                    withCreatedAt
                />
                { isLoading ? (
                    <div className="text-center">
                        <Loader/> Loading...
                    </div>
                ) : !data?.result?.length ? (
                    <ErrorMsg message="No qr codes found"/>
                ) : (
                    <>
                        <Table 
                            className="mb-3"
                            tableClassName="table-hover"
                        >
                            <thead>
                                <tr>
                                    <th className="text-start">QR Code</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Created At</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { data.result.map((qrCode) => (
                                    <tr
                                        onClick={() => handleShowDetail(qrCode)}
                                        key={`qr-code-${qrCode.id}`}
                                        className="cursor-pointer"
                                    >
                                        <td>
                                            <img 
                                                src={`${route(QrImageRoute, qrCode.id)}?v=${qrCode.version}`}
                                                height={120}
                                                width={120}
                                                alt={`${qrCode.name} QR code`}
                                            />
                                        </td>
                                        <td>
                                            <p className="fw-medium">
                                                { qrCode.name }
                                            </p>
                                        </td>
                                        <td>
                                            <p className="fw-medium">
                                                { qrCode.type.name }
                                            </p>
                                            <DataDisplay label="Dynamic">
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
                                            </DataDisplay>
                                        </td>
                                        <td className="text-center">
                                            { formatDate(qrCode.createdAt) }
                                        </td>
                                        <td>
                                            <div className="d-flex justify-content-end align-items-center gap-2">
                                                { canDelete ? (
                                                    <div>
                                                        <Button
                                                            circle 
                                                            small
                                                            danger
                                                            outline
                                                            onClick={handleDelete(qrCode)}
                                                        >
                                                            <Delete size={24}/>
                                                        </Button>
                                                    </div>
                                                ) : (<></>) }
                                                <div>
                                                    <Button
                                                        circle 
                                                        linkAsButton
                                                        small
                                                        outline
                                                        href={route(QrImageRoute, qrCode.id)}
                                                        download={`${qrCode.name} QR Code`}
                                                        onClick={(event) => event.stopPropagation()}
                                                    >
                                                        <Download size={24}/>
                                                    </Button>
                                                </div>
                                                { canUpdate ? (
                                                    <div>
                                                        <Button
                                                            circle
                                                            small
                                                            onClick={handleEdit(qrCode)}
                                                        >
                                                            <Edit size={24}/>
                                                        </Button>
                                                    </div>
                                                ) : (<></>) }
                                            </div>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </Table>
                        <Pagination
                            onClick={handlePaginate}
                            currentPage={data.pagination.currentPage}
                            maxPages={data.pagination.totalPage}
                        />
                    </>
                ) }
            </Card>
            { canRead ? (
                <QrDetail/>
            ) : (<></>) }

            { canDelete ? (
                <ConfirmModal
                    id={MDQrDelete}
                    title="Delete QR Code"
                    message="Are you sure you want to delete this QR code?"
                    negativeFlow
                    loading={sendLoading}
                    onCancel={handleCloseDelete}
                    onConfirm={handleConfirmDelete}
                />
            ) : (<></>) }
        </>
    )
}