import { Collapse } from "bootstrap"
import { useEffect, useRef, useState } from "react"

export const Accordion = ({
    title,
    className = '',
    children
}) => {
    const collapseElementRef = useRef()
    const collapseRef = useRef()
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        collapseRef.current?.toggle()
        setOpen(prevState => !prevState)
    }

    useEffect(() => {

        collapseRef.current = Collapse.getOrCreateInstance(collapseElementRef.current, { toggle: false })
        collapseRef.current.hide()

        return () => {
            collapseRef.current.dispose()
        }

    }, [])

    return (
        <section 
            className={`${
                "accordion accordion-flush"
            } ${
                className
            }`}
        >
            <section className="accordion-item">
                <h3 className="accordion-header">
                    <button 
                        onClick={() => handleClick()}
                        className={`${
                            "accordion-button"
                        } ${
                            !open ? 'collapsed' : ''
                        }`}
                        type="button"
                        aria-expanded={open ? 'false' : 'true'}
                    >
                        {title}
                    </button>
                </h3>
                <section 
                    ref={collapseElementRef}
                    className="accordion-collapse collapse"
                >
                    <div className="accordion-body">
                        { children }
                    </div>
                </section>
            </section>
        </section>
    )
}