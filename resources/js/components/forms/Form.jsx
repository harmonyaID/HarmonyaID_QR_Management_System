export const Form = ({
    onSubmit,
    ...props
}) => {
    const handleSubmit = (event) => {
        if (typeof onSubmit != 'function') {
            return
        }

        event.preventDefault()
        onSubmit(event)
    }

    return (
        <form 
            onSubmit={handleSubmit}
            {...props}
        />
    )
}
