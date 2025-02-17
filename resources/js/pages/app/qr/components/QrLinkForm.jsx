import { Input } from "@/components/inputs/Input";
import { useContext } from "react";
import { QrDataFormContext } from "../contexts/QrDataForm";

export const QRLinkForm = () => {
    const {form, setForm} = useContext(QrDataFormContext)

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
                placeholder="e.g. https://wikipedia.org"
                value={ form.url }
                onChange={ handleChange }
            />
        </section>
    )
}