import { Input } from "@/components/inputs/Input";
import { notifyError } from "@/helpers/notification";
import { createContext, useContext, useState } from "react";

export const QrLinkFormContext = createContext()
export const QrLinkFormProvider = ({children}) => {
    const [form, setForm] = useState({
        url: ''
    })

    const validate = () => {
        if (!form?.url) {
            notifyError('URL is missing')
            return false
        }

        return true
    }

    return (
        <QrLinkFormContext value={{form, setForm, validate}}>
            { children }
        </QrLinkFormContext>
    )
}

export const QRLinkForm = () => {
    const {form, setForm} = useContext(QrLinkFormContext)

    const handleChange = ({name, value}) => {
        setForm((prevState) => ({
            ...prevState,
            [name]  : value
        }))
    }

    return (
        <section>
            <Input
                type="url"
                name="url"
                label="Link"
                required
                value={ form.url }
                onChange={ handleChange }
            />
        </section>
    )
}