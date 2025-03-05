import { Button } from "@/components/buttons/Button";
import { Form } from "@/components/forms/Form";
import { Dropbox, DropboxContext } from "@/components/inputs/Dropbox";
import { Input } from "@/components/inputs/Input";
import { Loader } from "@/components/misc/Loader";
import { Offcanvas } from "@/components/offcanvas/Offcanvas";
import { notifyError, notifySuccess } from "@/helpers/notification";
import { usageCategoryCreate, usageCategoryUpdate } from "@/services/api/account";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const UsageCategoryFormContext = createContext(null)
export const UsageCategoryFormProvider = ({children}) => {
    const [form, setForm] = useState({
        name: '',
        icon: '',
    });
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <UsageCategoryFormContext 
            value={{
                form, setForm,
                open, setOpen,
                loading, setLoading,
            }}
        >
            {children}
        </UsageCategoryFormContext>
    )
}

export const UsageCategoryForm = ({
    id = '',
    onSuccess = () => {}
}) => {
    const { 
        form, setForm, 
        open, setOpen,
        loading, setLoading,
    } = useContext(UsageCategoryFormContext)
    const { files, setFiles, resetDropbox } = useContext(DropboxContext)

    const reset = () => {
        setForm({
            name: '',
            icon: '',
        })
        resetDropbox()
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

        if (!id && !files.length) {
            notifyError('Icon is missing')
        }

        const request = {
            name: form.name,
            icon: files.length ? files[0].url : form.icon,
        }

        let service
        if (id) {
            service = usageCategoryUpdate(id, request)
        } else {
            service = usageCategoryCreate(request)
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

    useEffect(() => {
        if (!open) {
            return
        }

        if (form.icon) {
            setFiles([{
                url         : form.icon || '',
                loading     : false,
                storageRoute: !!form?.icon
            }])
        }
    }, [open])

    return (
        <Offcanvas
            title={id ? 'Edit Usage Category' : 'Create Usage Category'}
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
                        <label className="form-label">
                            Icon
                        </label>
                        <Dropbox
                            group="accounts"
                            webp
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
