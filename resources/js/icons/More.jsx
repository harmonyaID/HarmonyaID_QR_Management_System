export const More = ({
    size = 64,
    ...props
}) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1024 1024"
        width={size}
        height={size}
        {...props}
    >
        <path 
            fill="currentColor" 
            d="M176 416a112 112 0 1 0 0 224 112 112 0 0 0 0-224m0 64a48 48 0 1 1 0 96 48 48 0 0 1 0-96m336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224m0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96m336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224m0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96"
        />
    </svg>
)
