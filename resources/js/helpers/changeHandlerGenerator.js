export const changeHandlerGenerator = (onChange) => {
    return (event) => {
        if (typeof onChange != 'function') {
            return
        }

        const target = event.currentTarget
        if (!target) {
            return
        }

        const name = target?.name
        const type = target?.type
        let value
        if (type == 'checkbox') {
            value = target.checked
        } else if (type == 'file') {
            value = target.files
        } else {
            value = target.value
        }

        onChange({ name: name, value: value })
    }
}