import { Button } from "@/components/buttons/Button";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/inputs/Input";
import { createContext, useContext, useState } from "react";

export const FaqSearchContext = createContext(null)
export const FaqSearchProvider = ({ children }) => {
    const [filter, setFilter] = useState({
        search: '',
        page: 1,
    })

    const [committedFilter, setCommittedFilter] = useState(filter)

    return (
        <FaqSearchContext 
            value={{ 
                filter, setFilter,
                committedFilter, setCommittedFilter
            }}
        >
            { children }
        </FaqSearchContext>
    )
}

export const FaqSearchForm = ({
    className = ''
}) => {
    const { 
        filter, setFilter, 
        setCommittedFilter 
    } = useContext(FaqSearchContext)

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
                "d-flex justify-content-center align-items-stretch gap-3"
            } ${
                className
            }`}
        >
            <Input
                className="flex-grow-1"
                name="search"
                hideLabel
                type="search"
                placeholder="How to generate a QR Code?"
                onChange={handleChange}
                value={filter?.search}
            />
            <Button>
                Search
            </Button>
        </Form>
    )
}
