import { Button } from "@/components/buttons/Button";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/inputs/Input";
import { Loader } from "@/components/misc/Loader";
import { Offcanvas } from "@/components/offcanvas/Offcanvas";
import { notifySuccess } from "@/helpers/notification";
import { planCreate, planUpdate } from "@/services/api/account";
import { createContext, useCallback, useContext, useState } from "react";

export const PlanFormContext = createContext(null)
export const PlanFormProvider = ({children}) => {
    const [form, setForm] = useState({
        name    : '',
        price   : 0,
    });
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <PlanFormContext 
            value={{
                form, setForm,
                open, setOpen,
                loading, setLoading,
            }}
        >
            {children}
        </PlanFormContext>
    )
}

export const PlanForm = ({
    id = '',
    onSuccess = () => {}
}) => {
    const { 
        form, setForm, 
        open, setOpen,
        loading, setLoading,
    } = useContext(PlanFormContext)

    const reset = () => {
        setForm({
            name    : '',
            price   : 0,
        })
    }

    const handleHide = useCallback(() => {
        setOpen(false)
        reset()
    }, [])

    const handleChange = ({name, value}) => {
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        if (loading) {
            return
        }

        setLoading(true)

        let service
        if (id) {
            service = planUpdate(id, form)
        } else {
            service = planCreate(form)
        }

        service.then(response => {
            if (response.status.code != 200) {
                return
            }

            notifySuccess('Data successfully saved');
            reset()
            if (typeof onSuccess == 'function') {
                onSuccess()
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return (
        <Offcanvas
            title={id ? 'Edit Plan' : 'Create Plan'}
            open={open}
            onHide={handleHide}
        >
            <Form
                onSubmit={handleSubmit}
                className="d-flex flex-column justify-content-between align-items-stretch"
            >
                <section>
                    <div className="mb-4">
                        <Input
                            name="name"
                            label="Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="price"
                            label="Price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </section>
                <Button
                    type="submit"
                    disabled={loading}
                >
                    { loading ? (
                        <Loader small className="me-2"/>
                    ) : (<></>) }
                    <span>Save</span>
                </Button>
            </Form>
        </Offcanvas>
    )
}
