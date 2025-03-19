import { act, useContext } from "react"
import { ActivityFilterContext, ActivityFilterForm } from "./ActivityFilterForm"
import { useGetActivities } from "@/services/swr/activity"
import { Card } from "@/components/cards/Card"
import { Loader } from "@/components/misc/Loader"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { Table } from "@/components/tables/Table"
import { formatDate, upperCaseFirst } from "@/helpers/formatter"
import { Pagination } from "@/components/navigations/Pagination"
import { DataDisplay } from "@/components/misc/DataDisplay"
import { DataCardPicture } from "@/components/cards/DataCard"

export const ActivitySection = () => {
    const { committedFilter, setCommittedFilter } = useContext(ActivityFilterContext)

    const { data, isLoading, mutate } = useGetActivities(committedFilter)
    
    const handlePaginate = (page) => {
        setCommittedFilter((prevState) => ({
            ...prevState,
            page: page,
        }))
    }

    return (
        <Card
            noBorder
        >
            <header className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h3 className="flex-shrink-0 mb-0">
                    Manage Activities
                </h3>
            </header>
            <ActivityFilterForm
                className="mb-3"
            />
            { isLoading ? (
                <div className="text-center">
                    <Loader/> Loading...
                </div>
            ) : !data?.result?.length ? (
                <ErrorMsg message="No activities found"/>
            ) : (
                <>
                    <Table
                        className="mb-3"
                    >
                        <thead>
                            <tr>
                                <th className="text-start w-screen-20">Type</th>
                                <th className="max-w-50vw w-screen-50">Description</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            { data.result.map((activity) => (
                                <tr
                                    key={`activity-${activity.id}`}
                                >
                                    <td>
                                        <p className="fw-medium">
                                            { upperCaseFirst(activity.type) }
                                        </p>
                                        <DataDisplay label="Sub Type">
                                            { upperCaseFirst(activity.subType) }
                                        </DataDisplay>
                                    </td>
                                    <td className="w-screen-30">
                                        <p className="fw-medium">
                                            { activity.description }
                                        </p>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center gap-3">
                                            <div className="flex-shrink-0">
                                                <DataCardPicture
                                                    small
                                                    src={ `https://ui-avatars.com/api/?name=${activity.causedByName}&rounded=true&color=FFFFFF&background=0056B3&font-size=0.35` }
                                                />
                                            </div>
                                            <div className="flex-grow-1">
                                                { activity.causedByName }
                                                <div className="text-neutral-300">
                                                    { formatDate(activity.createdAt) }
                                                </div>
                                            </div>
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
            )}
        </Card>
    )
}