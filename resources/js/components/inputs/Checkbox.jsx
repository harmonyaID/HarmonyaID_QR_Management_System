import { useChangeHandler } from "@/hooks/useChangeHandler"

export const Checkbox = ({
    name,
    label           = '',
    id              = '',
    className       = '',
    inputClassName  = '',
    onChange,
    ...props
}) => {
    const inputId = id || `checkbox-${name}`

    const handleChange = useChangeHandler(onChange)

    return (
        <div 
            className={`form-check ${className}`}
        >
            <input 
                className={`form-check-input ${inputClassName}`} 
                type="checkbox"
                id={inputId}
                name={name}
                onChange={handleChange}
                {...props}
            />
            <label 
                className="form-check-label"
                htmlFor={inputId}
            >
                { label || name }
            </label>
        </div>
    )
}