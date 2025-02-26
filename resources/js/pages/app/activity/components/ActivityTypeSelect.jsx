import { SearchableSelect } from "@/components/inputs/SearchableSelect"
import { upperCaseFirst } from "@/helpers/formatter"
import { useGetActivityTypes } from "@/services/swr/activity"
import { useCallback, useRef, useState } from "react"

export const ActivityTypeSelect = ({
    name = 'activityType',
    label= 'Type',
    onChange,
    ...props
}) => {
    const [filter, setFilter] = useState({
        search: ''
    })
    const { data, isLoading } = useGetActivityTypes(filter)

    const timeoutRef = useRef()
    
    const handleSearch = useCallback((value) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            setFilter((prevState) => ({
                search: value
            }))
        }, 600)
    }, [])

    return (
        <SearchableSelect
            loading={isLoading}
            items={!isLoading && data?.result?.length ? data.result : []}
            name={name}
            label={label}
            onChange={onChange}
            onSearch={handleSearch}
            valueKey="value"
            searchKey="label"
            { ...props }
        />
    )
}