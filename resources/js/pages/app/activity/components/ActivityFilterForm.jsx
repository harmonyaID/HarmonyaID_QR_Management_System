import { createContext, useContext, useState } from "react";
import { ActivityTypeSelect } from "./ActivityTypeSelect";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/inputs/Input";
import { Button } from "@/components/buttons/Button";
import { DateRangePicker } from "@/components/inputs/Daterangepicker";

export const ActivityFilterContext = createContext(null)

export const ActivityFilterProvider = ({children}) => {
    const [filter, setFilter] = useState({
        search      : '',
        type        : '',
        userId      : '',
        createdFrom : '',
        createdTo   : '',
        page        : 1,
    })
    const [committedFilter, setCommittedFilter] = useState(filter)

    return (
        <ActivityFilterContext 
            value={{ 
                filter, setFilter, 
                committedFilter, setCommittedFilter
            }}
        >
            { children }
        </ActivityFilterContext>
    )
}

export const ActivityFilterForm = ({
    className = '',
}) => {
    const {
        filter, setFilter,
        setCommittedFilter
    } = useContext(ActivityFilterContext)

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
                "d-grid gap-3 grid-cols-1 grid-cols-md-2 grid-cols-xl-3 grid-cols-xxl-4"
            } ${
                className
            }`}
        >
            <Input
                name="search"
                label="Search"
                placeholder="Search activity..."
                onChange={handleChange}
                value={filter?.search}
            />
            <ActivityTypeSelect
                name="type"
                value={filter.type}
                onChange={handleChange}
            />
            <DateRangePicker
                fromDateName="createdFrom"
                toDateName="createdTo"
                onChange={handleChange}
                fromDateValue={filter?.createdFrom}
                toDateValue={filter?.createdTo}
                label="Date"
            />
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

