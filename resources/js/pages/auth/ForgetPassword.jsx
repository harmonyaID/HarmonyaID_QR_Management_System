import { AuthLayout } from "@/components/layouts/AuthLayout"
import { Head } from "@inertiajs/react"
import { ForgotPasswordForm } from "./components/ForgotPasswordForm"

const ForgotPassword = () => (
    <>
        <Head
            title="Forgot Password"
        />
        <AuthLayout inverted>
            <ForgotPasswordForm/>
        </AuthLayout>
    </>
)

export default ForgotPassword