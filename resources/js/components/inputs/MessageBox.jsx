import { changeHandlerGenerator } from "@/helpers/changeHandlerGenerator"
import { useLayoutEffect, useRef } from "react"

export const MessageBox = ({
    id      = '',
    name    = '',
    value,
    className       = '',
    errorMsg        = '',
    onChange        = ({name, value}) => {},
    ...props
}) => {
    const inputId = `${id}-${name}`
    const inputRef = useRef(null)

    const handleChange = changeHandlerGenerator(onChange)

    useLayoutEffect(() => {
        const input = inputRef.current
        if (!input) {
            return
        }

        input.style.height = 'inherit'

        let newHeight = input.scrollHeight + 2

        if (newHeight < 80) {
            newHeight = 80
        }

        input.style.height = `${newHeight}px`
    })

    return (
        <textarea
            id={inputId}
            ref={inputRef}
            name={name}
            value={value}
            onChange={handleChange}
            title={errorMsg ? `Error: ${errorMsg}` : undefined}
            className={`${
                'form-control'
            } ${
                errorMsg ? 'is-invalid' : ''
            } ${
                className
            }`}
            {...props}
        />
    )
}