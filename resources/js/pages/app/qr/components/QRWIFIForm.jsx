import { Input } from "@/components/inputs/Input"
import { useContext } from "react"
import { WIFIEncryptionSelect } from "./WIFIEncryptionSelect"
import { QrDataFormContext } from "../contexts/QrDataForm"

export const QRWIFIForm = () => {
    const {form, setForm } = useContext(QrDataFormContext)

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