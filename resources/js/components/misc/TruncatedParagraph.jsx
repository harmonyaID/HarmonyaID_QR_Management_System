import { memo, useState } from "react"

const Component = ({
    className,
    children,
    onClick,
    preventPropagation = false,
    ...props
}) => {
    const [expanded, setExpanded] = useState(false)

    const handleClick = (event) => {
        if (preventPropagation) {
            event.stopPropagation()
        }
        if (typeof onClick == 'function') {
            onClick(event)
        }

        setExpanded(!expanded)
    }

    return (
        <p 
            className={`${
                !expanded ? 'line-clamp-2' : 'line-clamp-0'
            } ${
                'cursor-pointer'
            } ${
                className
            }`}
            title={ expanded ? 'See less' : 'See more' }
            onClick={handleClick}
            {...props}
        >
            { children }
        </p>
    )
}

export const TruncatedParagraph = memo(Component)
TruncatedParagraph.displayName = 'TruncatedParagraph'