import { useChangeHandler } from "@/hooks/useChangeHandler"
import { Minus } from "@/icons/Minus"
import { Plus } from "@/icons/Plus"
import { useCallback, useEffect, useRef } from "react"

export const QuantityInput = ({
    id      = '',
    name    = '',
    value,
    className       = '',
    inputClassName  = '',
    onChange        = ({name, value}) => {},
    ...props
}) => {
    const inputId               = `${id}-${name}`
    const inputRef              = useRef(null)
    const holdTimeoutRef        = useRef()
    const holdAccumulatorRef    = useRef(0)
    const isHoldingRef          = useRef(false)

    const handleChange = useChangeHandler(onChange)

    const handleClick = (addition, shouldFocus = true) => {
        const currentValue = inputRef.current.value ? parseInt(inputRef.current.value) : 0
        const newValue = currentValue + addition

        inputRef.current.value = newValue
        if (shouldFocus) {
            inputRef.current.focus()
        }
        
        if (typeof onChange == 'function') {
            onChange({name: name, value: newValue})
        }
    }

    const handleMouseDown = (addition, timeout = 600) => {
        clearTimeout(holdTimeoutRef.current)
        holdTimeoutRef.current = setTimeout(() => {
            isHoldingRef.current = true
            if (holdAccumulatorRef.current < 40) {
                holdAccumulatorRef.current++
            }
            
            const accumulator   = holdAccumulatorRef.current
            let multiplier      = 1
            if (accumulator >= 10 && accumulator < 20) {
                multiplier = 10
            } else if (accumulator >= 20 && accumulator < 40) {
                multiplier = 100
            } else if (accumulator >= 40) {
                multiplier = 1000
            }

            handleClick(addition * multiplier, false)
            handleMouseDown(addition, 100)
        }, timeout)
    }

    const handleMouseUp = useCallback(() => {
        if (!isHoldingRef.current) {
            return
        }

        isHoldingRef.current = false
        clearTimeout(holdTimeoutRef.current)
        holdAccumulatorRef.current = 0
        inputRef.current.focus()
    }, [])

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [handleMouseUp])

    return (
        <div
            className={`${
                'input-quantity bg-white rounded-pill shadow-none'
            } ${
                'd-inline-flex align-items-stretch justify-content-between'
            } ${
                className
            }`}
        >
            <button
                className="d-inline-flex align-items-center justify-content-center rounded-pill"
                onClick={() => handleClick(-1)}
                onMouseDown={() => handleMouseDown(-1)}
                onMouseUp={() => handleMouseUp()}
            >
                <Minus size={18}/>
            </button>
            <input
                ref={inputRef}
                id={inputId}
                type="number"
                name={name}
                value={value}
                onChange={handleChange}
                className={inputClassName}
                {...props}
            />
            <button
                className="d-inline-flex align-items-center justify-content-center rounded-pill"
                onClick={() => handleClick(1)}
                onMouseDown={() => handleMouseDown(1)}
                onMouseUp={() => handleMouseUp()}
            >
                <Plus size={18}/>
            </button>
        </div>
    )
}