import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DateRangePicker as RangePicker } from "vanillajs-datepicker";

export const DateRangePicker = ({
    className = '',
    wrapperClassName = '',
    id,
    label,
    fromDateName = 'fromDate',
    fromDateValue = '',
    toDateName = 'toDate',
    toDateValue = '',
    required = false,
    onChange,
    fromPlaceholder = '01 August 2024',
    toPlaceholder = '31 August 2024',
    ...props
}) => {
    const [focused, setFocused] = useState(false)
    const daterangeRef      = useRef()
    const elemRef           = useRef(null)
    const inputRef          = useRef(null)
    const changeRef         = useRef(onChange)
    const changeTimeoutRef  = useRef()
    const preventChangeRef  = useRef(0)

    const inputId = id || `date-range-picker-${fromDateName}-${toDateName}`

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const handleChange = (event) => {
        if (preventChangeRef.current) {
            preventChangeRef.current -= 1
            return
        }

        if (!daterangeRef.current) {
            return
        }
        
        clearTimeout(changeTimeoutRef.current)

        changeTimeoutRef.current = setTimeout(() => {
            if (!daterangeRef.current) {
                return
            }

            if (typeof changeRef.current != 'function') {
                return
            }
    
            const formattedDates = daterangeRef.current.getDates('dd MM yyyy')
            changeRef.current({name: fromDateName, value: formattedDates[0]})
            changeRef.current({name: toDateName, value: formattedDates[1]})
        }, 100)
    }

    const handleFocus = () => {
        setFocused(true)
    }

    const handleBlur = () => {
        setFocused(false)
    }

    useLayoutEffect(() => {
        changeRef.current = onChange
    }, [onChange])

    useEffect(() => {
        if (!elemRef.current) {
            return
        }

        daterangeRef.current = new RangePicker(elemRef.current, {
            buttonClass: 'btn',
            format: 'dd MM yyyy',
        })

        elemRef.current.addEventListener('changeDate', handleChange)
        elemRef.current.addEventListener('show', handleFocus)
        elemRef.current.addEventListener('hide', handleBlur)
        
        return () => {
            elemRef.current?.removeEventListener('changeDate', handleChange)
            elemRef.current?.removeEventListener('show', handleFocus)
            elemRef.current?.removeEventListener('hide', handleBlur)
            daterangeRef.current?.destroy()
        }
    }, [])

    useEffect(() => {

        if (!fromDateValue || !toDateValue || !daterangeRef.current) {
            return
        }

        const dates = daterangeRef.current.getDates('dd MM yyyy')
        if ((dates[0]) == fromDateValue && 
            (dates[1]) == toDateValue) {
            return
        }

        preventChangeRef.current = 2
        daterangeRef.current.setDates(fromDateValue, toDateValue)

    }, [fromDateValue, toDateValue])

    return (
        <div
            className={`daterange-picker ${wrapperClassName}`}
            onClick={handleClick}
        >
            { label ? (
                <label
                    htmlFor={inputId}
                    className="form-label"
                >
                    { label }
                    { required ? <span className="text-danger">*</span> : <></> }
                </label>
            ) : (<></>) }
            <div 
                className={`${
                    "input-group"
                } ${
                    focused ? "active" : ""
                }`}
                ref={elemRef}
            >
                <input
                    className="form-control"
                    type="text"
                    name={fromDateName}
                    value={fromDateValue}
                    required={required}
                    id={inputId}
                    onChange={() => {}}
                    placeholder={fromPlaceholder}
                    {...props}
                />
                <span className="input-group-text">to</span>
                <input
                    className="form-control last"
                    type="text"
                    name={toDateName}
                    value={toDateValue}
                    required={required}
                    id={inputId}
                    onChange={() => {}}
                    placeholder={toPlaceholder}
                    {...props}
                />
            </div>
        </div>
    )
}
