import { Input } from "@/components/inputs/Input";
import { MessageBox } from "@/components/inputs/MessageBox";
import { PhoneNumberSelect } from "@/components/inputs/PhoneNumberSelect";
import { useCallback, useContext } from "react";
import { QrDataFormContext } from "../contexts/QrDataForm";

export const QRWAForm = () => {
    const {form, setForm} = useContext(QrDataFormContext)

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
