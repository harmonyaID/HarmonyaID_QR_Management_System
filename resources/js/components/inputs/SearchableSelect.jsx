import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Input } from "./Input"
import { ArrowUp } from "@/icons/ArrowUp"
import { ArrowDown } from "@/icons/ArrowDown"

const DefaultItem = ({item, searchKey}) => (
    <div>
        { typeof item == 'object' ? item[searchKey] : item }
    </div>
)

export const SearchableSelect = ({
    id = '',
    name = '',
    items = [],
    label = '',
    required = false,
    component = DefaultItem,
    className = '',
    value,
    searchKey   = 'name',
    valueKey    = 'id',
    prefix,
    onChange,
}) => {
    const [display, setDisplay] = useState('')
    const [search, setSearch]   = useState('')
    const [focused, setFocused] = useState(false)

    const searchRef         = useRef(null)
    const updateSearchRef   = useRef(false)
    const blurTimeoutRef    = useRef(null)

    const Component = component

    const filtered = useMemo(() => {
        return items.filter((item) => {
            const searchVal = search.toLowerCase()

            if (typeof item == 'string') {
                return item.toLowerCase().includes(searchVal)
            }

            if (typeof item != 'object') {
                return item == searchVal
            }

            if (typeof item[searchKey] == 'string') {
                return item[searchKey].toLowerCase().includes(searchVal)
            }

            return item[searchKey] == searchVal;
        })
    }, [items, search])

    const handleSearch = useCallback(({value}) => {
        updateSearchRef.current = false
        setDisplay((prevState) => value)
    }, [])

    const resetSearch = useCallback(() => {
        updateSearchRef.current = true
        setSearch('')
        setDisplay((prevState) => {
            if (typeof value == 'undefined') {
                return ''
            }

            const item = items.find((item) => {
                if (typeof item != 'object') {
                    return item == value
                }
    
                return item[valueKey] == value;
            })

            if (!item) {
                return ''
            }

            if (typeof item == 'string') {
                return item
            }

            return item[searchKey]
        })
    }, [items, value])

    const handleFocus = useCallback(() => {
        if (!focused) {
            searchRef.current.focus()
        }
    }, [])

    const handleFocusSearch = useCallback((event) => {
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current)
        }

        setFocused(true)
    }, [])

    const handleBlurSearch = useCallback((event) => {
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current)
        }

        blurTimeoutRef.current = setTimeout(() => {
            setFocused(false)
            resetSearch()
        }, 300)
    }, [resetSearch])

    const handleSelect = useCallback((selected) => {
        let searchVal   = selected
        let value       = selected
        if (typeof value == 'object') {
            searchVal   = value[searchKey]
            value       = value[valueKey]
        }
        
        if (typeof onChange == 'function') {
            clearTimeout(blurTimeoutRef.current)
            onChange({name, value, selected})
            setFocused(false)
        } else {
            updateSearchRef.current = true
            setDisplay(searchVal)
            setSearch('')
        }
    }, [onChange])

    useEffect(() => {
        resetSearch()
    }, [value])

    useEffect(() => {
        if (updateSearchRef.current) {
            return
        }

        const timeout = setTimeout(() => {
            setSearch(display)
        }, 300)

        return () => { clearTimeout(timeout) }
    }, [display])

    return (
        <div 
            className={`${
                "searchable-select"
            } ${
                className
            }`}
        >
            <Input
                name={name}
                id={id}
                ref={searchRef}
                label={label}
                required={required}
                value={display}
                onChange={handleSearch}
                onFocus={handleFocusSearch}
                onBlur={handleBlurSearch}
                prefix={prefix}
                suffix={
                    <div 
                        className="select-arrow-container"
                        onClick={handleFocus}
                    >
                        { focused ? (
                            <ArrowUp
                                className="select-arrow cursor-pointer"
                                size={16}
                            />
                        ) : (
                            <ArrowDown
                                className="select-arrow cursor-pointer"
                                size={16}
                            />
                        ) }
                    </div>
                }
            />
            <div 
                className={`${
                    "select-item-container"
                } ${
                    focused ? 'show' : ''
                }`}
            >
                { filtered.map((item) => (
                    <div
                        key={typeof item == 'object' ? item[valueKey] : item}
                        className="select-item cursor-pointer"
                        onClick={() => handleSelect(item)}
                    >
                        <Component 
                            item={item}
                            searchKey={searchKey}
                        />
                    </div>
                )) }
            </div>
        </div>
    )
}