import { changeHandlerGenerator } from "@/helpers/changeHandlerGenerator"

export const Input = ({
    id      = '',
    name    = '',
    label   = '',
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
    const inputId   = `${id}-${name}`

    const handleChange = changeHandlerGenerator(onChange)

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
            <div
                className={`${
                    !horizontal ? 'd-grid grid-cols-5' : ''
                }`}
            >
                <label 
                    className={`${
                        !horizontal ? 'grid-span-3' : ''
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
            <div
                className={`${
                    "form-control-container"
                } ${
                    horizontal ? 'grid-span-4' : ''
                }`}
            >
                { prefix }
                <input
                    id={inputId}
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    required={required}
                    title={errorMsg ? `Error: ${errorMsg}` : undefined}
                    aria-describedby={`${inputId}-feedback`}
                    className={`${
                        'form-control'
                    } ${
                        errorMsg ? 'is-invalid' : ''
                    } ${
                        inputClassName
                    }`}
                    {...props}
                />
                { suffix }
            </div>
        </div>
    )
}