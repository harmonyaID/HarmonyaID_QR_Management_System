export const Card = ({
    navClassName    = '',
    className       = '',
    noBorder        = false,
    navigation,
    onNavNext,
    navNextDisabled = false,
    onNavPrev,
    navPrevDisabled = false,
    children,
    ...props
}) => (
    <section
        className={`card ${ noBorder ? 'border-0' : '' } ${className}`}
        {...props}
    >
        <div className="card-body">
            { children }
        </div>
    </section>
)