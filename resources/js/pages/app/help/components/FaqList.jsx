import { useContext } from "react"
import { Loader } from "@/components/misc/Loader"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { Pagination } from "@/components/navigations/Pagination"
import { FaqSearchContext, FaqSearchForm } from "./FaqSearchForm"
import { useGetFaq } from "@/services/swr/misc"
import { Card } from "@/components/cards/Card"
import { Accordion } from "@/components/misc/Accordion"

export const FaqList = () => {

    const { committedFilter, setCommittedFilter }   = useContext(FaqSearchContext)

    const {data, isLoading, mutate} = useGetFaq( committedFilter )

    const handlePaginate = (page) => {
        if (!canRead) {
            return
        }

        setCommittedFilter((prevState) => ({
            ...prevState,
            page: page,
        }))
    }

    return (
        <>
            <FaqSearchForm
                className="mb-3"
            />
            { isLoading ? (
                <div className="text-center">
                    <Loader/> Loading...
                </div>
            ) : !data?.result?.length ? (
                <ErrorMsg message={`Unable to find "${ committedFilter.search }"`}/>
            ) : (
                <div className="d-grid gap-3">
                    { data.result.map((faq) => (
                        <Accordion
                            key={`faq-question-${faq.id}`}
                            title={faq.question}
                        >
                            <p dangerouslySetInnerHTML={{__html: faq.answer}}/>
                        </Accordion>
                    )) }
                    <Pagination
                        currentPage={data.pagination.currentPage}
                        maxPages={data.pagination.totalPage}
                        onClick={handlePaginate}
                    />
                </div>
            ) }
        </>
    )
}