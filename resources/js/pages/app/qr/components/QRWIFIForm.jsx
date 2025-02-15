import { Input } from "@/components/inputs/Input"
import { createContext, useContext, useState } from "react"
import { WIFIEncryptionSelect } from "./WIFIEncryptionSelect"
import { notifyError } from "@/helpers/notification"

export const QRWIFIFormContext  = createContext()
export const QRWIFIFormProvider = ({children}) => {
    const [form, setForm] = useState({
        ssid        : '',
        encryption  : '',
        password    : '',
    })

    const validate = () => {
        if (!form?.ssid) {
            notifyError('Network Name is missing')
            return false;
        }

        if (form?.encryption && !form?.password) {
            notifyError('Password is missing')
            return false
        }

        return true
    }

    return (
        <QRWIFIFormContext value={{ form, setForm, validate }}>
            { children }
        </QRWIFIFormContext>
    )
}

export const QRWIFIForm = () => {
    const {form, setForm, validate} = useContext(QRWIFIFormContext)

    const handleChange = ({name, value}) => {
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <section className="d-flex flex-column gap-3">
            <Input
                name="ssid"
                label="Network Name"
                required
                value={form.ssid}
                onChange={handleChange}
            />
            <WIFIEncryptionSelect
                name="encryption"
                label="Security"
                value={form.encryption}
                onChange={handleChange}
            />
            { form.encryption ? (
                <Input
                    name="password"
                    label="Password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                />
            ) : (<></>) }
        </section>
    )
}