import { Button } from "@/components/buttons/Button";
import { Form } from "@/components/forms/Form";
import { Checkbox } from "@/components/inputs/Checkbox";
import { Dropbox, DropboxContext } from "@/components/inputs/Dropbox";
import { Input } from "@/components/inputs/Input";
import { SearchableSelect } from "@/components/inputs/SearchableSelect";
import { Loader } from "@/components/misc/Loader";
import { Offcanvas } from "@/components/offcanvas/Offcanvas";
import { AVAILABLE_DATA_TYPES } from "@/configs/qrDataTypes";
import { notifyError, notifySuccess } from "@/helpers/notification";
import { usageCategoryCreate, usageCategoryUpdate } from "@/services/api/account";
import { qrTypeCreate, qrTypeUpdate } from "@/services/api/qr";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const QrTypeFormContext = createContext(null)
export const QrTypeFormProvider = ({children}) => {
    const [form, setForm] = useState({
        name: '',
        icon: '',
    });
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <QrTypeFormContext 
            value={{
                form, setForm,
                open, setOpen,
                loading, setLoading,
            }}
        >
            {children}
        </QrTypeFormContext>
    )
}

export const QrTypeForm = ({
    id = '',
    onSuccess = () => {}
}) => {
    const { 
        form, setForm, 
        open, setOpen,
        loading, setLoading,
    } = useContext(QrTypeFormContext)
    const { files, setFiles, resetDropbox } = useContext(DropboxContext)

    const reset = () => {
        setForm({
            name        : '',
            isDynamic   : false,
            dataTypeId  : '',
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

        let service
        if (id) {
            service = qrTypeUpdate(id, form)
        } else {
            service = qrTypeCreate(form)
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
            title={id ? 'Edit Qr Type' : 'Create Qr Type'}
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
                        <Checkbox 
                            label="Dynamic"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <SearchableSelect
                            name="dataTypeId"
                            label="Data Type"
                            required
                            value={form.dataTypeId}
                            onChange={handleChange}
                            items={AVAILABLE_DATA_TYPES}
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
