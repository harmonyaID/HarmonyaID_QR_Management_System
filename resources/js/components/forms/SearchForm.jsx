import { createContext, useContext, useState } from "react"
import { Form } from "./Form"
import { Input } from "../inputs/Input"
import { Button } from "../buttons/Button"
import { DateRangePicker } from "../inputs/Daterangepicker"

export const SearchFormContext = createContext({
    search: ''
})

export const SearchFormProvider = ({children}) => {
    const [filter, setFilter] = useState({
        search      : '',
        createdFrom : null,
        createdTo   : null,
        page        : 1,
    })
    const [committedFilter, setCommittedFilter] = useState(filter)

    return (
        <SearchFormContext value={{filter, setFilter, committedFilter, setCommittedFilter}}>
            { children }
        </SearchFormContext>
    )
}


export const SearchForm = ({
    className       = '',
    placeholder     = "Search by name or code",
    withCreatedAt   = false,
}) => {
    const {
        filter, setFilter,
        setCommittedFilter
    } = useContext(SearchFormContext)

    const handleChange = ({name, value}) => {
        setFilter((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        setCommittedFilter((prevState) => ({...filter}))
    }

    return (
        <Form
            onSubmit={handleSubmit}
            className={`${
                "d-grid gap-3 grid-cols-1 grid-cols-md-2 grid-cols-lg-3"
            } ${
                className
            }`}
        >
            <Input
                name="search"
                label="Search"
                placeholder={placeholder}
                onChange={handleChange}
                value={filter?.search}
            />
            { withCreatedAt ? (
                <DateRangePicker
                    fromDateName="createdFrom"
                    toDateName="createdTo"
                    onChange={handleChange}
                    fromDateValue={filter?.createdFrom}
                    toDateValue={filter?.createdTo}
                    label="Created Between"
                />
            ) : (<></>) }
            <div className="d-flex h-100 align-items-end gap-1">
                <Button
                    type="submit"
                >
                    Search
                </Button>
            </div>
        </Form>
    )
}