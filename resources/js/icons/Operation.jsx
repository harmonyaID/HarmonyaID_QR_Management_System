export const Operation = ({
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
            d="M389.44 768a96.064 96.064 0 0 1 181.12 0H896v64H570.56a96.064 96.064 0 0 1-181.12 0H128v-64zm192-288a96.064 96.064 0 0 1 181.12 0H896v64H762.56a96.064 96.064 0 0 1-181.12 0H128v-64zm-320-288a96.064 96.064 0 0 1 181.12 0H896v64H442.56a96.064 96.064 0 0 1-181.12 0H128v-64z"
        />
    </svg>
)