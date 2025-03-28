export const Expand = ({
    size = 64,
    ...props
}) => (
    <svg  
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1024 1024"
        height={size}
        width={size}
        {...props}
    >
        <path 
            fill="currentColor" 
            d="M128 192h768v128H128zm0 256h512v128H128zm0 256h768v128H128zm576-352 192 160-192 128z"
        />
    </svg>
)