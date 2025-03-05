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

export const formatNumber = (number = 0, isFloat = false) => {
    if (typeof number == 'string') {
        number = parseFloat(number)
    }

    const formatter = Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: isFloat ? 2 : 0,
        maximumFractionDigits: isFloat ? 2 : 0,
    })

    return formatter.format(number)
}

export const upperCaseFirst = (value = '') => {
    return value[0].toUpperCase() + value.slice(1)
}

export const formatDate = (date, withTime = false) => {
    const dateObject = new Date(date)

    const format = { day: 'numeric', month: 'long', year: 'numeric' }
    if (withTime) {
        format.hour = '2-digit'
        format.minute = '2-digit'
    }

    return dateObject.toLocaleDateString('en-GB', format)
}