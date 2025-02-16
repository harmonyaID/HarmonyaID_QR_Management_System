import { SearchableSelect } from "@/components/inputs/SearchableSelect"
import { wifiEncryptionTypes } from "@/configs/wifiEncryptionTypes"

export const WIFIEncryptionSelect = ({
    name,
    label = 'Encryption Type',
    value,
    onChange,
    ...props
}) => {

    return (
        <SearchableSelect
            items={wifiEncryptionTypes}
            name={name}
            label={label}
            searchKey="name"
            valueKey="value"
            value={value}
            onChange={onChange}
            {...props}
        />
    )
}