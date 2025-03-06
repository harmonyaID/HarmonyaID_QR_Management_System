import { Loader } from "../misc/Loader";
import { Card } from "./Card";

export const SummaryCard = ({
    loading = false,
    label,
    data,
    wrapperClassName = '',
    className = '',
}) => (
    <Card
        className={wrapperClassName}
        noBorder
    >
        { loading ? (
            <div>
                <Loader small/>
                {' '}
                Loading ...
            </div>
        ) : (
            <p className={`fs-4 fw-semibold mb-2 ${className}`}>
                { data }
            </p>
        ) }
        <p className="fs-7 mb-0">
            { label }
        </p>
    </Card>
)