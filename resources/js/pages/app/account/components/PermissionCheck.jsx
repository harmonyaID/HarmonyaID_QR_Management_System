import { Checkbox } from "@/components/inputs/Checkbox"
import { Loader } from "@/components/misc/Loader"
import { notifySuccess } from "@/helpers/notification"
import { permissionAssign, permissionUnassign } from "@/services/api/account"
import { useCallback, useEffect, useState } from "react"

export const PermissionCheck = ({
    permission,
    roleId,
    checked = false,
    disabled = false,
    onSuccess,
}) => {
    const [internalCheck, setIsChecked] = useState(checked)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = useCallback(({value}) => {
        if (isLoading) {
            return
        }

        setIsLoading(true)

        let service;
        if (value) {
            service = permissionAssign(permission.id, roleId)
        } else {
            service = permissionUnassign(permission.id, roleId)
        }

        service.then(response => {
            if (response.status.code != 200) {
                return
            }

            notifySuccess('Permission successfully updated');
            setIsChecked(value)

            if (typeof onSuccess == 'function') {
                onSuccess()
            }
        })
        .finally(() => {
            setIsLoading(false)
        })

    }, [permission, roleId, onSuccess])

    useEffect(() => {
        if (checked == internalCheck) {
            return
        }

        setIsChecked(checked)
    }, [checked])

    return (
        <>
            <Checkbox
                onChange={handleChange}
                id={`permission-${permission.id}`}
                disabled={ disabled || isLoading }
                title={`${internalCheck ? 'Unassign' : 'Assign' } "${ permission.name }" permission`}
                checked={internalCheck}
                noLabel
            />
            { isLoading ? (
                <Loader small/>
            ) : (<></>) }
        </>
    )
}