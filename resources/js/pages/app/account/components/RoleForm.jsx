import { Button } from "@/components/buttons/Button";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/inputs/Input";
import { Loader } from "@/components/misc/Loader";
import { Offcanvas } from "@/components/offcanvas/Offcanvas";
import { notifySuccess } from "@/helpers/notification";
import { roleCreate, roleUpdate } from "@/services/api/account";
import { createContext, useCallback, useContext, useState } from "react";

export const RoleFormContext = createContext(null)
export const RoleFormProvider = ({children}) => {
    const [form, setForm] = useState({
        name    : '',
    });
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <RoleFormContext 
            value={{
                form, setForm,
                open, setOpen,
                loading, setLoading,
            }}
        >
            {children}
        </RoleFormContext>
    )
}

export const RoleForm = ({
    id = '',
    onSuccess = () => {}
}) => {
    const { 
        form, setForm, 
        open, setOpen,
        loading, setLoading,
    } = useContext(RoleFormContext)

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
            service = roleUpdate(id, form)
        } else {
            service = roleCreate(form)
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
            title={id ? 'Edit Role' : 'Create Role'}
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
