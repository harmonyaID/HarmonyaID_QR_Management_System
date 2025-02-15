import { Input } from "@/components/inputs/Input";
import { MessageBox } from "@/components/inputs/MessageBox";
import { PhoneNumberSelect } from "@/components/inputs/PhoneNumberSelect";
import { notifyError } from "@/helpers/notification";
import { createContext, useCallback, useContext, useState } from "react";

export const QRWAFormContext = createContext()
export const QRWAFormProvider = ({children}) => {
    const [form, setForm] = useState({
        phoneCode   : undefined,
        phoneNumber : '',
        message     : '',
    })

    const validate = () => {
        if (!form?.phoneCode) {
            notifyError('Phone code is missing')
            return false
        }

        if (!form?.phoneNumber) {
            notifyError('Whatsapp number is missing')
            return false
        }

        return true
    }

    return (
        <QRWAFormContext value={{form, setForm, validate}}>
            { children }
        </QRWAFormContext>
    )
}

export const QRWAForm = () => {
    const {form, setForm} = useContext(QRWAFormContext)

    const handleChange = useCallback(({name, value}) => {
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }, [setForm])

    return (
        <section className="d-grid grid-cols-md-3 gap-3">
            <PhoneNumberSelect
                name="phoneCode"
                label="Number Code"
                required
                value={form?.phoneCode}
                onChange={handleChange}
            />
            <Input
                name="phoneNumber"
                label="Whatsapp Number"
                required
                value={form.phoneNumber}
                onChange={handleChange}
                className="grid-span-md-2"
            />
            <div className="grid-span-md-3">
                <label className="d-block mb-2.25">
                    Message
                </label>
                <MessageBox
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                />
            </div>
        </section>
    )
}
