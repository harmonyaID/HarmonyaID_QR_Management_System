export const Tag = ({
    pill        = false,
    important   = false,
    className   = '',
    children,
    ...props
}) => (
    <span
        className={`${
            'badge'
        } ${
            'text-white'
        } ${
            important ? 'bg-crimson badge-important rounded-pill' : 'bg-orange'
        } ${
            pill ? 'rounded-pill' : ''
        } ${
            className
        }`}
        {...props}
    >
        { children }
    </span>
)