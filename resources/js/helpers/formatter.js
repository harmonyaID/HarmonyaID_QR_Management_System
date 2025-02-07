export const formatPrice = (number = 0) => {
    if (typeof number == 'string') {
        number = parseFloat(number)
    }

    const formatter = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return formatter.format(number)
}

export const upperCaseFirst = (value = '') => {
    return value[0].toUpperCase() + value.slice(1)
}