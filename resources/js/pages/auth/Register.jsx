import { AuthLayout } from "@/components/layouts/AuthLayout"
import { Head } from "@inertiajs/react"
import { RegisterForm } from "./components/RegisterForm"

const RegisterPage = () => (
    <>
        <Head
            title="Register"
        />
        <AuthLayout>
            <RegisterForm/>
        </AuthLayout>
    </>
)

export default RegisterPage
