import { Link } from "@inertiajs/react"

const Btn = (props) => (
    <button {...props}/>
)

const DefaultLink = (props) => (
    <Link {...props}/>
)

export const Button = ({
    small       = false,
    outline     = false,
    disabled    = false,
    className   = '',
    text        = false,
    link        = false,
    linkAsButton= false,
    children,
    ...props
}) => {
    const Component = link || linkAsButton ? DefaultLink : Btn

    return (
        <Component 
            disabled={disabled}
            className={`${
                'btn'
            } ${
                (text || link) && disabled ? 'text-neutral-200 btn-text' :
                (text || link) ? 'text-primary btn-text' :
                outline && disabled ? 'btn-outline-neutral-200' :
                outline ? 'btn-outline-primary' :
                disabled ? 'btn-neutral-200 text-white' :
                'btn-primary text-white' 
            } ${
                small ? 'btn-sm' : ''
            } ${
                className
            }`}
            {...props}
        >
            <span className="d-inline-block">
                { children }
            </span>
        </Component>
    )
}