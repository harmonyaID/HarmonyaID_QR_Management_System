import { Card } from "../cards/Card";

export const ErrorMsg = ({
    className = '',
    wrapperClassName,
    message = 'Oops, something went wrong'
}) => (
    <Card
        className={wrapperClassName}
        noBorder
    >
        <h4 className={`fw-normal text-center text-dark ${className}`}>
            { message }
        </h4>
    </Card>
)