import { Button } from "@/components/buttons/Button"
import { Form } from "@/components/forms/Form"
import { Checkbox } from "@/components/inputs/Checkbox"
import { Input } from "@/components/inputs/Input"
import { Loader } from "@/components/misc/Loader"
import { authLogin } from "@/services/api/auth"
import { useState } from "react"
import { route } from "ziggy-js"

export const LoginForm = () => {
    const [formRequest, setFormRequest] = useState({ email: '', password: '', remember: false })
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

        authLogin(formRequest)
            .then(response => {
                if (response?.status?.code != 200) {
                    return
                }

                notifySuccess(response.status?.message)

                window.open(route('frontend.app.dashboard.index'), '_self')
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
                <h4 className="mb-2">
                    <span className="fw-normal">Welcome to </span>
                    QR Code App
                </h4>
                <p className="mb-1">
                    Sign in to your account to access the application
                </p>
            </div>
            <Input
                name="email"
                type="email"
                label="Email"
                value={formRequest.email}
                onChange={handleChange}
                placeholder="e.g hello@example.com"
                className="pb-2 mb-4"
            />
            <Input
                name="password"
                type="password"
                label="Password"
                value={formRequest.password}
                onChange={handleChange}
                placeholder="••••••"
                className="pb-2 mb-1"
            />
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3">
                <Checkbox
                    name="remember"
                    label="Keep Me Signed In"
                    className="pb-1"
                    checked={formRequest.remember}
                    onChange={handleChange}
                />
                {/* <Link
                    to={ForgotRoute}
                    className="text-grey-300 text-decoration-none text-end pb-1"
                >
                    Forgot password?
                </Link> */}
            </div>
            <div className="d-grid">
                <Button disabled={isLoading}>
                    { isLoading ? (
                        <Loader small className="me-2"/>
                    ) : (<></>) }
                    <span>Sign In</span>
                </Button>
            </div>
        </Form>
    )
}