export const Monitor = ({
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
            d="M544 768v128h192a32 32 0 1 1 0 64H288a32 32 0 1 1 0-64h192V768H192A128 128 0 0 1 64 640V256a128 128 0 0 1 128-128h640a128 128 0 0 1 128 128v384a128 128 0 0 1-128 128zM192 192a64 64 0 0 0-64 64v384a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64z"
        />
    </svg>
)