import { UserForm, UserFormContext } from "./UserForm"
import { Button } from "@/components/buttons/Button"
import { useContext, useState } from "react"
import { SearchForm, SearchFormContext } from "@/components/forms/SearchForm"
import { useGetUsers } from "@/services/swr/account"
import { Loader } from "@/components/misc/Loader"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { DataCard, DataCardPicture } from "@/components/cards/DataCard"
import { MDUserDelete } from "@/configs/modalId"
import { toggleModal } from "@/helpers/toggleModal"
import { notifyError, notifySuccess } from "@/helpers/notification"
import { userDelete } from "@/services/api/account"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"
import { USERS_GROUP_CREATE, USERS_GROUP_DELETE, USERS_GROUP_READ, USERS_GROUP_UPDATE } from "@/configs/permissions"
import { Pagination } from "@/components/navigations/Pagination"
import { Tag } from "@/components/tags/Tag"

export const UserSection = () => {
    const [sendLoading, setSendLoading] = useState(false)
    const [selectedId, setSelectedId]   = useState('')

    const canCreate = useHasAnyPermissions(USERS_GROUP_CREATE)
    const canRead   = useHasAnyPermissions(USERS_GROUP_READ)
    const canUpdate = useHasAnyPermissions(USERS_GROUP_UPDATE)
    const canDelete = useHasAnyPermissions(USERS_GROUP_DELETE)
    
    const { committedFilter, setCommittedFilter }   = useContext(SearchFormContext)
    const { setForm, setOpen }  = useContext(UserFormContext)

    const {data, isLoading, mutate} = useGetUsers(canRead ? committedFilter : false)

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
            firstname   : selected.firstname,
            lastname    : selected.lastname,
            email       : selected.email,
            roleId      : selected.roleId,
        }))

        setOpen(true)
        setSelectedId(selected.id)
    }

    const handleDelete = (selected) => {
        if (!canDelete) {
            return
        }

        setSelectedId(selected.id)
        toggleModal(MDUserDelete, true)
    }

    const handleConfirmDelete = () => {
        if (!canDelete) {
            return
        }

        if (!selectedId) {
            notifyError('No user is selected')
            return
        }

        if (sendLoading) {
            return
        }

        setSendLoading(true)

        userDelete(selectedId)
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
        toggleModal(MDUserDelete, false)
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
                        Manage Users
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
                    <ErrorMsg message="No user found"/>
                ) : (
                    <>
                        <div className="d-grid gap-3 grid-cols-1 grid-cols-md-2 grid-cols-lg-3 grid-cols-xxl-4 mb-3">
                            { data.result.map((user) => (
                                <DataCard
                                    key={`user-${user.id}`}
                                    onEdit={ user.deletable && canUpdate ? () => handleEdit(user) : undefined}
                                    onDelete={ user.deletable && canDelete ? () => handleDelete(user) : undefined}
                                >
                                    <div className="d-flex gap-3 justify-content-center align-items-center">
                                        <div className="flex-shrink-0">
                                            <DataCardPicture
                                                src={ `https://ui-avatars.com/api/?name=${user.fullname}&rounded=true&color=FFFFFF&background=0056B3&font-size=0.35` }
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className=" mb-2">
                                                <span className="fw-medium">
                                                    { user.fullname }
                                                </span>
                                            </p>
                                            <p className="mb-0">
                                                { user.role ? (
                                                    <Tag pill>
                                                        { user.role.name }
                                                    </Tag>
                                                ) : (<></>) }
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
                <UserForm
                    id={selectedId}
                    onSuccess={() => { mutate() }}
                />
            ) : (<></>) }

            { canDelete ? (
                <ConfirmModal
                    id={MDUserDelete}
                    title="Delete user"
                    message="Are you sure you want to delete this user?"
                    negativeFlow
                    loading={sendLoading}
                    onCancel={handleCloseDelete}
                    onConfirm={handleConfirmDelete}
                />
            ) : (<></>) }
        </>
    )
}