import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Head } from "@inertiajs/react";
import { LoginForm } from "./components/LoginForm";

const LoginPage = () => {
    return (
        <>
            <Head
                title="Login"
            />
            <AuthLayout>
                <LoginForm/>
            </AuthLayout>
        </>
    )
}

export default LoginPage
