import { useEffect, useMemo, useRef, useState } from "react"
import { Input } from "./Input"
import { changeHandlerGenerator } from "@/helpers/changeHandlerGenerator"
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
    value,
    searchKey   = 'name',
    valueKey    = 'id',
    onChange,
}) => {
    const [display, setDisplay] = useState('')
    const [search, setSearch]   = useState('')
    const [focused, setFocused] = useState(false)

    const searchRef = useRef(null)
    const resettingRef = useRef(false)
    const blurTimeoutRef = useRef(null)

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

    const handleSearch = ({value}) => {
        resettingRef.current = false
        setDisplay((prevState) => value)
    }

    const resetSearch = () => {
        resettingRef.current = true
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
    }

    const handleFocus = () => {
        if (!focused) {
            searchRef.current.focus()
        }
    }

    const handleFocusSearch = (event) => {
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current)
        }

        setFocused(true)
    }

    const handleBlurSearch = (event) => {
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current)
        }

        blurTimeoutRef.current = setTimeout(() => {
            setFocused(false)
            resetSearch()
        }, 300)
    }

    const handleSelect = (selected) => {
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
            resettingRef.current = true
            setDisplay(searchVal)
            setSearch('')
        }
    }

    useEffect(() => {
        resetSearch()
    }, [value])

    useEffect(() => {
        if (resettingRef.current) {
            return
        }

        const timeout = setTimeout(() => {
            setSearch(display)
        }, 300)

        return () => { clearTimeout(timeout) }
    }, [display])

    return (
        <div className="searchable-select">
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