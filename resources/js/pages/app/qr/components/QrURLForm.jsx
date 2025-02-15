import { Input } from "@/components/inputs/Input";
import { createContext, useContext, useState } from "react";

export const QrURLFormContext = createContext()

export const QrURLFormProvider = ({children}) => {
    const state = useState({
        url: ''
    })

    return (
        <QrURLFormContext value={state}>
            { children }
        </QrURLFormContext>
    )
}

export const QrURLForm = () => {

    const [form, setForm] = useContext(QrURLFormContext)

    const handleChange = ({name, value}) => {
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <section>
            <Input
                type="url"
                name="url"
                label="URL"
                placeholder="e.g. https://wikipedia.org"
                value={form.url}
                onChange={handleChange}
                required
            />
        </section>
    )
}