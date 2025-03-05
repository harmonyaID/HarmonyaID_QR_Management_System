export const Logo = ({
    variant = 'whole',
    size    = 96
}) => (
    <img
        src={variant == 'whole' ? (
            '/images/logo/logo-whole.svg'
        ) : variant == 'with-text' ? (
            '/images/logo/logo-text.svg'
        ) : (
            '/images/logo/logo.svg'
        )}
        height={size}
        width="auto"
        alt="Synchat Logo"
    />
)