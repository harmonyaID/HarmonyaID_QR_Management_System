import { Button } from "@/components/buttons/Button"
import { Card } from "@/components/cards/Card"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { Loader } from "@/components/misc/Loader"
import { notifyError, notifySuccess } from "@/helpers/notification"
import { storage_url } from "@/helpers/url"
import { usageCategorySelect } from "@/services/api/account"
import { useGetCategoryUsage, useGetMyCategoryUsage } from "@/services/swr/account"
import { useEffect, useState } from "react"

export const SelectUsageCategorySection = ({
    className   = '',
    onSuccess   = () => {}
}) => {
    const [selectedId, setSelectedId] = useState('')
    const [sendLoading, setSendLoading] = useState()
    const {
        data: currentCategory, 
        isLoading: currentCategoryLoading
    } = useGetMyCategoryUsage()

    const {
        data: categoryUsage, 
        isLoading: categoryUsageLoading
    } = useGetCategoryUsage()

    const handleSelect = (selected) => {
        setSelectedId((prevState) => {
            if (prevState == selected.id) {
                return ''
            }

            return selected.id
        })
    }

    const handleSubmit = () => {
        if (!selectedId) {
            notifyError('No category is selected')
            return
        }

        if (sendLoading) {
            return
        }

        setSendLoading(true)

        usageCategorySelect(selectedId)
            .then((response) => {
                if (response?.status?.code != 200)  {
                    return
                }

                notifySuccess(response.status.message)

                if (typeof onSuccess == 'function') {
                    onSuccess()
                }
            })
            .finally(() => {
                setSendLoading(false)
            })
    }

    useEffect(() => {
        if (selectedId) {
            return
        }

        if (!currentCategory?.result) {
            return
        }

        setSelectedId((prevState) => currentCategory.result.id)
    }, [currentCategory])

    return (
        <>
            { categoryUsageLoading || currentCategoryLoading ? (
                <div className="text-center">
                    <Loader/> Loading...
                </div>
            ) : !categoryUsage?.result?.length ? (
                <ErrorMsg message="No usage category found"/>
            ) : (
                <section
                    className={className}
                >
                    <p className="mb-4 fw-bold">What would you like to use QR Codes for?</p>
                    <div className="d-grid mb-4 gap-4">
                        { categoryUsage.result.map(item => (
                            <Card
                                key={`select-category-${item.id}`}
                                className={`${
                                    !selectedId && item.id == currentCategory?.result?.id || 
                                    selectedId == item.id ? 'border-primary' : 'border-neutral-100'
                                } ${
                                    "cursor-pointer shadow-sm"
                                }`}
                                onClick={() => handleSelect(item)}
                            >
                                <div className="d-flex flex-wrap gap-4 justify-content-center align-items-center">
                                    <div className="flex-shrink-0 rounded-5 overflow-hidden">
                                        <img 
                                            src={storage_url(item.icon)}
                                            alt={`${item.name} icon`}
                                            height={120}
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex-grow-1 d-flex flex-column justify-content-between">
                                        <p className="fs-2 mb-0">{ item.name }</p>
                                    </div>
                                </div>
                            </Card>
                        ))  }
                    </div>
                    <div className="text-center">
                        <Button 
                            onClick={handleSubmit}
                            disabled={!selectedId || sendLoading}
                        >
                            { sendLoading ? (
                                <Loader small className="me-2"/>
                            ) : (<></>) }
                            <span>Confirm</span>
                        </Button>
                    </div>
                </section>
            )}
        </>
    )
}