import { Button } from "@/components/buttons/Button"
import { Card } from "@/components/cards/Card"
import { ErrorMsg } from "@/components/misc/ErrorMsg"
import { Loader } from "@/components/misc/Loader"
import { goBack } from "@/helpers/navigation"
import { notifyError, notifySuccess } from "@/helpers/notification"
import { storage_url } from "@/helpers/url"
import { DashboardRoute } from "@/routes/app"
import { usageCategorySelect } from "@/services/api/account"
import { useGetCategoryUsage, useGetMyCategoryUsage } from "@/services/swr/account"
import { useEffect, useState } from "react"
import { route } from "ziggy-js"

export const SelectUsageCategorySection = ({
    toDashboard = false,
    className   = ''
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

                setTimeout(() => {
                    if (toDashboard) {
                        window.location.href = route(DashboardRoute)
                        return
                    }
                    
                    goBack()
                }, 500)
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
        <section 
            className={`${
                "d-flex flex-column justify-content-center w-100"
            } ${
                className
            }`}
        >
            { categoryUsageLoading || currentCategoryLoading ? (
                <div className="text-center">
                    <Loader/> Loading...
                </div>
            ) : !categoryUsage?.result?.data?.length || !currentCategory?.result?.id ? (
                <ErrorMsg message="No usage category found"/>
            ) : (
                <>
                    <section
                        className="d-grid grid-cols-md-2 mb-3 gap-3"
                    >
                        { categoryUsage.result.data.map(item => (
                            <Card
                                key={`select-category-${item.id}`}
                                className={`${
                                    !selectedId && item.id == currentCategory.result.id || 
                                    selectedId == item.id ? 'border-primary' : 'border-neutral-100'
                                } ${
                                    "cursor-pointer"
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
                    </section>
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
                </>
            )}
        </section>
    )
}