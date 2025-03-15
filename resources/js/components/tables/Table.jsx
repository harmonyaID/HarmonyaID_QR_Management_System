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
                "table "
            } ${
                tableClassName
            }`}
            {...props}
        />
    </div>
)