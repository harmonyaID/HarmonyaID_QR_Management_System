import { Button } from "@/components/buttons/Button"
import { QrTypeSelectForm } from "./QrTypeSelectForm"

export const QrCreateForm = () => {
    return (
        <section className="d-grid grid-cols-lg-2 gap-3">
            <QrTypeSelectForm/>
            <section className="d-flex flex-column justify-content-end h-100">
                <Button className="position-sticky bottom-0">
                    Continue
                </Button>
            </section>
        </section>
    )
}