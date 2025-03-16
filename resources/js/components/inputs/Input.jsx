import { useChangeHandler } from "@/hooks/useChangeHandler"
import { Hide } from "@/icons/Hide"
import { View } from "@/icons/View"
import { useEffect, useState } from "react"

export const Input = ({
    id          = '',
    name        = '',
    label       = '',
    hideLabel   = '',
    value,
    horizontal      = false,
    className       = '',
    inputClassName  = '',
    type            = 'text',
    errorMsg        = '',
    required        = false,
    onChange        = ({name, value}) => {},
    prefix,
    suffix,
    ...props
}) => {
    const [inputType, setInputType] = useState(type)
    const inputId   = `${id}-${name}`

    const handleChange = useChangeHandler(onChange)

    const handleTogglePassword = () => {
        if (type != 'password') {
            return
        }

        if (inputType == 'password') {
            setInputType('text')
        } else {
            setInputType('password')
        }
    }

    useEffect(() => {
        if (type != inputType) {
            setInputType(type)
        }
    }, [type])

    return (
        <div 
            className={`${
                "d-grid"
            } ${
                !horizontal ? "gap-2.25 grid-cols-1" : 'gap-0 grid-cols-5 align-items-start'
            } ${
                className
            }`}
        >
            { !hideLabel ? (
                <div
                    className={`${
                        !horizontal ? 'd-grid grid-cols-5' : ''
                    }`}
                >
                        <label 
                            className={`${
                                horizontal ? '' :
                                !errorMsg ? 'grid-span-5' :
                                'grid-span-3'
                            }`}
                            htmlFor={inputId}
                            title={ errorMsg ? `Error: ${errorMsg}` : '' }
                        >
                            { label || name }
                            { required ? (
                                <span className="text-crimson-500">*</span>
                            ) : (<></>) }
                        </label>
                    { !horizontal && errorMsg ? (
                        <div 
                            id={`${inputId}-feedback`}
                            className="invalid-feedback grid-span-2 align-self-end text-end overflow-hidden text-truncate"
                            title={errorMsg}
                        >
                            { errorMsg }
                        </div>
                    ) : (<></>) }
                </div>
            ) : (<></>) }
            <div
                className={`${
                    "form-control-container"
                } ${
                    horizontal ? 'grid-span-4' : ''
                }`}
            >
                <div className="input-group">
                    { prefix }
                    <input
                        id={inputId}
                        name={name}
                        type={inputType}
                        value={value}
                        onChange={handleChange}
                        required={required}
                        title={errorMsg ? `Error: ${errorMsg}` : undefined}
                        aria-describedby={`${inputId}-feedback`}
                        className={`${
                            'form-control'
                        } ${
                            type == 'password' ? 'border-end-0' : ''
                        } ${
                            errorMsg ? 'is-invalid' : ''
                        } ${
                            hideLabel ? 'h-100' : ''
                        } ${
                            inputClassName
                        }`}
                        {...props}
                    />
                    { type == 'password' ? (
                        <span 
                            className="input-group-text border-start-0 bg-white cursor-pointer"
                            onClick={handleTogglePassword}
                            title={inputType == 'password' ? (
                                'Show password'
                            ) : (
                                'Hide password'
                            )}
                        >
                            { inputType == 'password' ? (
                                <View size="1.25rem"/>
                            ) : (
                                <Hide size="1.25rem"/>
                            ) }
                        </span>
                    ) : suffix ? (
                        suffix
                    ) : (
                        <></>
                    ) }
                </div>
            </div>
        </div>
    )
}