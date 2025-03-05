import { SearchableSelect } from "@/components/inputs/SearchableSelect"
import { useGetRoles } from "@/services/swr/account"
import { useCallback, useRef, useState } from "react"

export const RoleSelect = ({
    name = 'roleId',
    label= 'Role',
    onChange,
    ...props
}) => {
    const [filter, setFilter] = useState({
        search: ''
    })
    const { data, isLoading } = useGetRoles(filter)

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
            required
            { ...props }
        />
    )
}