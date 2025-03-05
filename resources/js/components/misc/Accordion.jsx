import { Collapse } from "bootstrap"
import { useEffect, useRef } from "react"

export const Accordion = ({
    title,
    className = '',
    children
}) => {
    const collapseElementRef = useRef()
    const collapseRef = useRef()

    const handleClick = () => {
        collapseRef.current?.toggle()
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
                        className="accordion-button collapsed" 
                        type="button"
                        aria-expanded="false"
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