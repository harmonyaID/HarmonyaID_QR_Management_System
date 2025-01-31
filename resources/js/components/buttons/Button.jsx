'use client';

export const Button = ({
    small       = false,
    outline     = false,
    disabled    = false,
    className   = '',
    text        = false,
    children,
    ...props
}) => (
    <button 
        disabled={disabled}
        className={`${
            'btn'
        } ${
            text && disabled ? 'text-neutral-200 btn-text' :
            text ? 'text-primary btn-text' :
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
    </button>
)