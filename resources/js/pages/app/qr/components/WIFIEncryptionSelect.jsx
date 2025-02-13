import { SearchableSelect } from "@/components/inputs/SearchableSelect"
import { useMemo } from "react"

export const WIFIEncryptionSelect = ({
    name,
    label = 'Encryption Type',
    value,
    onChange,
    ...props
}) => {
    const types = useMemo(() => {
        return [
            { name: 'None', value: '' },
            { name: 'WEP', value: 'WEP' },
            { name: 'WPA/WPA2-Personal', value: 'WPA' },
        ]
    }, [])


    return (
        <SearchableSelect
            items={types}
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