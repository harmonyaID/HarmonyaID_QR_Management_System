import { Link } from "@inertiajs/react"
import { useMemo } from "react"

const Btn = (props) => (
    <button {...props}/>
)

const DefaultLink = (props) => (
    <Link {...props}/>
)

const Anchor = (props) => (
    <a {...props}/>
)

export const Button = ({
    small       = false,
    outline     = false,
    disabled    = false,
    className   = '',
    text        = false,
    link        = false,
    linkAsButton= false,
    danger      = false,
    circle      = false,
    children,
    download,
    ...props
}) => {
    const Component = useMemo(() => {
        if (!link && !linkAsButton) {
            return Btn
        }

        if (download) {
            return Anchor
        }

        return DefaultLink
    }, [link, linkAsButton])

    const color = danger ? 'crimson' : 'primary';

    return (
        <Component 
            disabled={disabled}
            className={`${
                'btn'
            } ${
                (text || link) && disabled ? 'text-neutral-200 btn-text' :
                (text || link) ? `text-${color} btn-text` :
                outline && disabled ? 'btn-outline-neutral-200' :
                outline ? `btn-outline-${color}` :
                disabled ? 'btn-neutral-200 text-white' :
                `btn-${color} text-white` 
            } ${
                circle ? 'circle' : ''
            } ${
                small ? 'btn-sm' : ''
            } ${
                className
            }`}
            download={download}
            {...props}
        >
            <span className="d-inline-block">
                { children }
            </span>
        </Component>
    )
}