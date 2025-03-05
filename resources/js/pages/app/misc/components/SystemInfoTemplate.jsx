export const SystemInfoTemplate = ({
    className       = '',
    label           = '',
    notes           = '',
    alignLabelRight = false,
    hasBorder       = false,
    children
}) => (
    <section 
        className={`${
            "d-grid grid-cols-2 gap-3 py-3"
        } ${
            hasBorder ? "border-bottom border-neutral-50" : ''
        } ${
            className
        }`}
    >
        <div className={alignLabelRight ? "text-end" : ''}>
            <p 
                className={`${
                    "fw-medium"
                } ${
                    notes ? 'mb-1' : 'mb-0'
                }`}
            >
                { label }
            </p>
            { notes ? (
                <p className="mb-0 fs-7 text-neutral-400">
                    { notes }
                </p>
            ) : <></> }
        </div>
        <div>
            { children }
        </div>
    </section>
)