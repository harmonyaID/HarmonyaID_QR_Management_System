import { Button } from "@/components/buttons/Button"
import { GoogleButton } from "@/components/buttons/GoogleButton"
import { Form } from "@/components/forms/Form"
import { Checkbox } from "@/components/inputs/Checkbox"
import { Input } from "@/components/inputs/Input"
import { DividerText } from "@/components/misc/DividerText"
import { Loader } from "@/components/misc/Loader"
import { toDashboard } from "@/helpers/navigation"
import { notifySuccess } from "@/helpers/notification"
import { ForgotPasswordRoute, RegisterRoute } from "@/routes/auth"
import { authLogin } from "@/services/api/auth"
import { Link, usePage } from "@inertiajs/react"
import { useState } from "react"
import { route } from "ziggy-js"

export const LoginForm = () => {
    const [formRequest, setFormRequest] = useState({ email: '', password: '', remember: false })
    const [isLoading, setIsLoading] = useState(false)

    const { props } = usePage()

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

        authLogin(formRequest)
            .then(response => {
                if (response?.status?.code != 200) {
                    return
                }

                notifySuccess(response.status?.message)

                toDashboard()
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
            <div className="pb-3 mb-3">
                <h3 className="mb-2">
                    <span className="fw-normal">Welcome to </span>
                    { props.app_name }
                </h3>
                <p className="mb-1">
                    Sign in to your account to access the application
                </p>
            </div>
            <div className="d-grid gap-1">
                <GoogleButton>
                    Sign In with Google
                </GoogleButton>
            </div>
            <DividerText className="my-5 text-neutral-600">
                or Sign In With Email
            </DividerText>
            <Input
                name="email"
                type="email"
                label="Email"
                value={formRequest.email}
                onChange={handleChange}
                placeholder="e.g hello@example.com"
                className="pb-2 mb-4"
                required
            />
            <Input
                name="password"
                type="password"
                label="Password"
                value={formRequest.password}
                onChange={handleChange}
                placeholder="••••••"
                className="pb-2 mb-1"
                required
            />
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3">
                <Checkbox
                    name="remember"
                    label="Keep Me Signed In"
                    className="pb-1"
                    checked={formRequest.remember}
                    onChange={handleChange}
                />
                <Link
                    href={route(ForgotPasswordRoute)}
                    className="text-grey-300 text-decoration-none text-end pb-1"
                >
                    Forgot password?
                </Link>
            </div>
            <div className="d-grid gap-1">
                <Button disabled={isLoading}>
                    { isLoading ? (
                        <Loader small className="me-2"/>
                    ) : (<></>) }
                    <span>Sign In</span>
                </Button>
                <Button
                    link
                    href={route(RegisterRoute)}
                    type="button"
                >
                    Sign Up
                </Button>
            </div>
        </Form>
    )
}