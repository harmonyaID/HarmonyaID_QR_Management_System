import { Button } from "@/components/buttons/Button";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/inputs/Input";
import { Loader } from "@/components/misc/Loader";
import { Offcanvas } from "@/components/offcanvas/Offcanvas";
import { notifySuccess } from "@/helpers/notification";
import { userCreate, userUpdate } from "@/services/api/account";
import { createContext, useCallback, useContext, useState } from "react";
import { RoleSelect } from "./RoleSelect";

export const UserFormContext = createContext(null)
export const UserFormProvider = ({children}) => {
    const [form, setForm] = useState({
        firstname   : '',
        lastname    : '',
        email       : '',
        password    : '',
        roleId      : '',
    });
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <UserFormContext 
            value={{
                form, setForm,
                open, setOpen,
                loading, setLoading,
            }}
        >
            {children}
        </UserFormContext>
    )
}

export const UserForm = ({
    id = '',
    onSuccess = () => {}
}) => {
    const { 
        form, setForm, 
        open, setOpen,
        loading, setLoading,
    } = useContext(UserFormContext)

    const reset = () => {
        setForm({
            firstname   : '',
            lastname    : '',
            email       : '',
            password    : '',
            roleId      : '',
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
            service = userUpdate(id, form)
        } else {
            service = userCreate(form)
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
            title={id ? 'Edit User' : 'Create User'}
            open={open}
            onHide={handleHide}
        >
            <Form
                onSubmit={handleSubmit}
                className="d-flex flex-column justify-content-between align-items-stretch"
            >
                <section className="d-grid gap-3 mb-4">
                    <Input
                        name="firstname"
                        label="Firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="lastname"
                        label="Lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    { !id ? (
                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    ) : (<></>) }
                    <RoleSelect
                        name="roleId"
                        onChange={handleChange}
                        value={form.roleId}
                        required
                    />
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
