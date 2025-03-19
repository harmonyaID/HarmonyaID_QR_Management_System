export const DividerText = ({
    className = '',
    children
}) => (
    <div 
        className={`${
            "divider-text"
        } ${
            className
        }`}
    >
        <hr/>
        <div className="text text-center">
            { children }
        </div>
    </div>
)