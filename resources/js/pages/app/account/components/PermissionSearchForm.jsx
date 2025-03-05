import { Form } from "@/components/forms/Form";
import { createContext, useCallback, useContext, useState } from "react";
import { RoleSelect } from "./RoleSelect";
import { Button } from "@/components/buttons/Button";

export const PermissionSearchContext = createContext()

export const PermissionSearchProvider = ({ children }) => {
    const [filter, setFilter] = useState({
        search  : '',
        roleId  : '',
        role    : null,
    })
    const [committedFilter, setCommittedFilter] = useState(filter)

    return (
        <PermissionSearchContext value={{filter, setFilter, committedFilter, setCommittedFilter}}>
            { children }
        </PermissionSearchContext>
    )
}

export const PermissionSearchForm = ({
    className = '',
}) => {
    const {
        filter, setFilter,
        setCommittedFilter
    } = useContext(PermissionSearchContext)

    const handleChange = useCallback(({name, value}) => {
        setFilter((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }, [])

    const handleSubmit = () => {
        setCommittedFilter((prevState) => ({ ...filter }))
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
            <RoleSelect
                onChange={handleChange}
                value={filter?.roleId}
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