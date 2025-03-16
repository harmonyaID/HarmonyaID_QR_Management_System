import { FaqForm, FaqFormContext } from "./FaqForm"
import { Button } from "@/components/buttons/Button"
import { useContext, useState } from "react"
import { SearchForm, SearchFormContext } from "@/components/forms/SearchForm"
import { Loader } from "@/components/misc/Loader"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { DataCard, DataCardPicture } from "@/components/cards/DataCard"
import { toggleModal } from "@/helpers/toggleModal"
import { notifyError, notifySuccess } from "@/helpers/notification"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { faqDelete } from "@/services/api/misc"
import { MDFaqDelete } from "@/configs/modalId"
import { useGetFaq } from "@/services/swr/misc"
import { Pagination } from "@/components/navigations/Pagination"
import { FAQ_GROUP_CREATE, FAQ_GROUP_DELETE, FAQ_GROUP_READ, FAQ_GROUP_UPDATE } from "@/configs/permissions"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"
import { Table } from "@/components/tables/Table"
import { formatDate } from "@/helpers/formatter"
import { TruncatedParagraph } from "@/components/misc/TruncatedParagraph"
import { Card } from "@/components/cards/Card"
import { Delete } from "@/icons/Delete"
import { Edit } from "@/icons/Edit"

export const FaqSection = () => {
    const [sendLoading, setSendLoading] = useState(false)
    const [selectedId, setSelectedId]   = useState('')

    const canCreate = useHasAnyPermissions(FAQ_GROUP_CREATE)
    const canRead   = useHasAnyPermissions(FAQ_GROUP_READ)
    const canUpdate = useHasAnyPermissions(FAQ_GROUP_UPDATE)
    const canDelete = useHasAnyPermissions(FAQ_GROUP_DELETE)

    const { committedFilter, setCommittedFilter }   = useContext(SearchFormContext)
    const { setForm, setOpen }  = useContext(FaqFormContext)

    const {data, isLoading, mutate} = useGetFaq( canRead ? committedFilter : false )

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
            question        : selected.question,
            answer          : selected.answer,
            persistedAnswer : selected.answer,
        }))

        setOpen(true)
        setSelectedId(selected.id)
    }

    const handleDelete = (selected) => {
        if (!canDelete) {
            return
        }

        setSelectedId(selected.id)
        toggleModal(MDFaqDelete, true)
    }

    const handleConfirmDelete = () => {
        if (!canDelete) {
            return
        }

        if (!selectedId) {
            notifyError('No faq is selected')
            return
        }

        if (sendLoading) {
            return
        }

        setSendLoading(true)

        faqDelete(selectedId)
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
        toggleModal(MDFaqDelete, false)
        setSelectedId(0)
    }

    return (
        <>
            <Card
                noBorder
            >
                <header className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                    <h3 className="flex-shrink-0 mb-0">
                        Manage FAQ
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
                    withCreatedAt
                />
                { isLoading ? (
                    <div className="text-center">
                        <Loader/> Loading...
                    </div>
                ) : !data?.result?.length ? (
                    <ErrorMsg message="No faq found"/>
                ) : (
                    <>
                        <Table>
                            <thead>
                                <tr>
                                    <th className="text-start">Question</th>
                                    <th>Answer</th>
                                    <th>Created</th>
                                    <th className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { data.result.map((question) => (
                                    <tr key={`question-${question.id}`}>
                                        <td>{ question.question }</td>
                                        <td className="max-w-30vw">
                                            <TruncatedParagraph
                                                dangerouslySetInnerHTML={{ __html: question.answer }}
                                            />
                                        </td>
                                        <td>
                                            <div className="d-flex justify-content-center align-items-center gap-3">
                                                <div className="flex-shrink-0">
                                                    <DataCardPicture
                                                        small
                                                        src={ `https://ui-avatars.com/api/?name=${question.creator.fullname}&rounded=true&color=FFFFFF&background=0056B3&font-size=0.35` }
                                                    />
                                                </div>
                                                <div className="flex-grow-1">
                                                    { question.creator.fullname }
                                                    <div className="text-neutral-300">
                                                        { formatDate(question.createdAt) }
                                                    </div>
                                                </div>
                                            </div>
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
                                                            onClick={() => handleDelete(question)}
                                                        >
                                                            <Delete size={20}/>
                                                        </Button>
                                                    </div>
                                                ) : (<></>) }
                                                { canUpdate ? (
                                                    <div>
                                                        <Button
                                                            circle
                                                            small
                                                            onClick={() => handleEdit(question)}
                                                        >
                                                            <Edit size={20}/>
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
                            currentPage={data.pagination.currentPage}
                            maxPages={data.pagination.totalPage}
                            onClick={handlePaginate}
                        />
                    </>
                ) }
            </Card>
            { canCreate || canUpdate ? (
                <FaqForm
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
                    id={MDFaqDelete}
                    title="Delete faq"
                    message="Are you sure you want to delete this faq?"
                    negativeFlow
                    loading={sendLoading}
                    onCancel={handleCloseDelete}
                    onConfirm={handleConfirmDelete}
                />
            ) : (<></>) }
        </>
    )
}