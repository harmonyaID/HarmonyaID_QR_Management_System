import { useCallback, useMemo } from "react"
import { SearchableSelect } from "./SearchableSelect"
import { phoneCodes } from "@/configs/phoneCodes"

const PhoneSelectTemplate = ({item}) => (
    <div 
        className="px-3 py-2 d-flex gap-3"
    >
        <div className="d-flex justify-content-center align-items-start flex-shrink-0">
            <div className="phone-search-flag-circle">
                <img 
                    src={item.flag}
                    alt={`${item.name} country flag`}
                />
            </div>
        </div>
        <div>
            <p className="fw-bold">
                { item.name } ({ item.code })
            </p>
            <p className="mb-0">
                Phone code: { `+${item.phoneCode}` }
            </p>
        </div>
    </div>
)

export const PhoneNumberSelect = ({
    label = 'Phone Code',
    name,
    value,
    onChange,
    required,
}) => {
    const items = useMemo(() => {
        return phoneCodes.map((item) => ({
            ...item,
            label: `+${item.phoneCode} - ${item.name} (${item.code})`
        }))
    }, [])

    const handleChange = useCallback(({selected}) => {
        if (typeof onChange != 'function') {
            return
        }

        onChange({
            name    : name,
            value   : selected
        })
    }, [])

    return (
        <SearchableSelect
            label={label}
            items={items}
            value={typeof value == 'string' ? value : value?.code || ''}
            valueKey="code"
            searchKey="label"
            className="phone-search"
            onChange={handleChange}
            required={required}
            component={PhoneSelectTemplate}
            prefix={
                value?.flag ? (
                    <div className="phone-search-flag">
                        <img 
                            src={value.flag}
                        />
                    </div>
                ) : ( <></> )
            }
        />
    )
}