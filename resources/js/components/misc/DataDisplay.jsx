export const DataDisplay = ({
    label,
    children,
    className,
    dataClassName,
}) => (
    <div className={className}>
        <p className="fw-medium fs-5 mb-1">
            { label }
        </p>
        <div className={dataClassName}>
            { children }
        </div>
    </div>
)