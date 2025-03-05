export const StatusTag = ({
    status      = 'pending',
    className   = '',
    children,
    ...props
}) => (
    <span
        className={`${
            'badge'
        } ${
            status == 'pending' ? 'bg-orange text-body' :
            status == 'error'   ? 'bg-crimson text-white':
            status == 'success' ? 'bg-forest text-white' :
            ''
        } ${
            className
        }`}
        {...props}
    >
        { children }
    </span>
)