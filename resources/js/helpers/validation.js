export const validatePassword = (value) => {
    if (value.length < 8) {
        return 'Minimum 8 characters'
    }

    if (!/[a-z]/.test(value)) {
        return 'Needs at least one lowercase character'
    }

    if (!/[A-Z]/.test(value)) {
        return 'Needs at least one uppercase character'
    }

    if (!/[0-9]/.test(value)) {
        return 'Needs at least one number'
    }

    if (!/[-_!@#$%^&*(),.?":;{}|<>/+=\[\]\\]/.test(value)) {
        return 'Needs at least one special character'
    }

    return ''
}

export const validatePasswordConfirm = (password, confirm) => {
    if (password != confirm) {
        return 'Does not match the password'
    }

    return ''
}