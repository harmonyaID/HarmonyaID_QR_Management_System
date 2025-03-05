import { hasAnyPermissions, hasPermissions } from "@/helpers/permissions"
import { useMemo } from "react"

export const useHasPermissions = (perms) => {
    return useMemo(() => {
        if (!perms) {
            return true
        }

        return hasPermissions(perms)
    }, [perms])
}

export const useHasAnyPermissions = (perms) => {
    return useMemo(() => {
        if (!perms) {
            return true
        }

        return hasAnyPermissions(perms)
    }, [perms])
}