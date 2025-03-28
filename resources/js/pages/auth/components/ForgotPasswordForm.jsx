import { Button } from "@/components/buttons/Button"
import { Form } from "@/components/forms/Form"
import { Input } from "@/components/inputs/Input"
import { Loader } from "@/components/misc/Loader"
import { notifySuccess } from "@/helpers/notification"
import { ArrowLeft } from "@/icons/ArrowLeft"
import { DashboardRoute } from "@/routes/app"
import { LoginRoute } from "@/routes/auth"
import { authForgotPassword } from "@/services/api/auth"
import { Link } from "@inertiajs/react"
import { useState } from "react"
import { route } from "ziggy-js"

export const ForgotPasswordForm = () => {
    const [formRequest, setFormRequest] = useState({ email: '' })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = ({name, value}) => {
        setFormRequest((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        if (isLoading) {
            return
        }

        setIsLoading(true)

        authForgotPassword(formRequest)
            .then(response => {
                if (response?.status?.code != 200) {
                    return
                }

                notifySuccess(response.status?.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <Form
            onSubmit={handleSubmit}
            className="wrapper"
        >
            <div className="pb-4 mb-5">
                <Link
                    className="d-inline-flex align-items-center text-primary text-decoration-none"
                    href={route(LoginRoute)}
                >
                    <ArrowLeft className="me-3" size={20}/>
                    Back to Sign In
                </Link>
            </div>
            <div className="pb-3 mb-3">
                <h2 className="mb-2">
                    Forgot Password
                </h2>
                <p className="mb-1">
                    Input your registered email to reset your password
                </p>
            </div>
            <div className="mb-1">
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    value={formRequest.email}
                    onChange={handleChange}
                    placeholder="e.g hello@example.com"
                    className="pb-2 mb-5"
                />
            </div>
            <div className="d-grid">
                <Button disabled={isLoading}>
                    { isLoading ? (
                        <Loader small className="me-2"/>
                    ) : (<></>) }
                    <span>Reset Password</span>
                </Button>
            </div>
        </Form>
    )
}