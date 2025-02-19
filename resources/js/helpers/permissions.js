export const hasPermissions = (perms) => {
    if (!Array.isArray(window.permissions)) {
        return false
    }

    if (!Array.isArray(perms)) {
        return window.permissions.includes(perms)
    }

    return perms.every(perm => window.permissions?.includes(perm))
}

export const hasAnyPermissions = (perms) => {
    if (!Array.isArray(window.permissions)) {
        return false
    }

    if (!Array.isArray(perms)) {
        return window.permissions.includes(perms)
    }

    return perms.filter(perm => window.permissions?.includes(perm)).length != 0
}