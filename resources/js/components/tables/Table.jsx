export const Table = ({
    className = '',
    tableClassName = '',
    ...props
}) => (
    <div 
        className={`${
            "table-responsive"
        } ${
            className
        }`}
    >
        <table 
            className={`${
                "table table-borderless"
            } ${
                tableClassName
            }`}
            {...props}
        />
    </div>
)