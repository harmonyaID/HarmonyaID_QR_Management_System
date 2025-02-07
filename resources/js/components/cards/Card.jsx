import { ArrowLeft } from "@/icons/ArrowLeft";
import { ArrowRight } from "@/icons/ArrowRight";
import { useEffect, useRef } from "react";

export const Card = ({
    navClassName    = '',
    className       = '',
    noBorder        = false,
    navigation,
    onNavNext,
    navNextDisabled = false,
    onNavPrev,
    navPrevDisabled = false,
    children,
    ...props
}) => (
    <section
        className={`card ${ noBorder ? 'border-0' : '' } ${className}`}
        {...props}
    >
        { navigation ? (
            <header className="card-head">
                <div className="card-nav">
                    <ul className="nav nav-underline">
                        { navigation }
                    </ul>
                    { typeof onNavPrev == 'function' || typeof onNavNext == 'function' ? (
                        <div className="card-nav-btn-container flex-shrink-0">
                            { typeof onNavPrev == 'function' ? (
                                <button
                                    className="card-nav-btn"
                                    disabled={navPrevDisabled}
                                    onClick={onNavPrev}
                                >
                                    <ArrowLeft size="1.25rem"/>
                                </button>
                            ) : <></> }
                            { typeof onNavNext == 'function' ? (
                                <button
                                    className="card-nav-btn"
                                    disabled={navNextDisabled}
                                    onClick={onNavNext}
                                >
                                    <ArrowRight size="1.25rem"/>
                                </button>
                            ) : <></> }
                        </div>
                    ) : (<></>) }
                </div>
            </header>
        ) : (<></>) }
        <div className="card-body">
            { children }
        </div>
    </section>
)

export const CardNav = ({
    label,
    onClick,
    active = false,
}) => {
    const elementRef = useRef(null)

    useEffect(() => {
        if (active) {
            elementRef.current?.scrollIntoView()
        }
    }, [active])

    return (
        <li 
            ref={elementRef}
            className="nav-item"
            onClick={onClick}
        >
            <a 
                className={`nav-link ${ active ? 'active' : '' } fw-normal`}
                href="#"
            >
                { label.toUpperCase() }
            </a>
        </li>
    )
}
