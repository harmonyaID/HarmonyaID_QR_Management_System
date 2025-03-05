import { AuthLayout } from "@/components/layouts/AuthLayout"
import { Head } from "@inertiajs/react"
import { useState } from "react"
import { ResetPasswordForm } from "./components/ResetPasswordForm"
import { ResetPasswordSuccess } from "./components/ResetPasswordSuccess"

const ResetPassword = () => {
    const [isSuccess, setIsSuccess] = useState(false)

    return (
        <>
            <Head
                title="Reset Password"
            />
            <AuthLayout inverted>
                { !isSuccess ? (
                    <ResetPasswordForm onSuccess={() => setIsSuccess(true)}/>
                ) : (
                    <ResetPasswordSuccess/>
                ) }
            </AuthLayout>
        </>
    )
}

export default ResetPassword