import { Button } from "@/components/buttons/Button"
import { Card } from "@/components/cards/Card"
import { storage_url } from "@/helpers/url"
import { UsageCategoryRoute } from "@/routes/app"
import { route } from "ziggy-js"

export const UsageCategoryCard = ({
    category,
    loading = false
}) => {
    return (
        <Card
            noBorder
        >
            <div className="d-flex flex-wrap gap-4 justify-content-center align-items-stretch">
                <div 
                    className="flex-shrink-0 rounded-5 overflow-hidden"
                >
                    { !loading && category?.icon ? (
                        <img 
                            src={!loading && category ? storage_url(category.icon) : ''}
                            alt={!loading && category ? `${category.name} icon` : ''}
                            className={"image-cover mw-100"}
                            height={120}
                            width="auto"
                        />
                    ) : <></> }
                </div>
                <div className="flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                        <h3>My Usage Category</h3>
                        <p className="fs-3 fw-light">{ !loading && category ? category.name : 'Loading...' }</p>
                    </div>
                    <div className="text-end">
                        <Button 
                            link 
                            small
                            href={route(UsageCategoryRoute)}
                        >
                            Change
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}