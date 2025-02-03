import { Button } from "@/components/buttons/Button"
import { Form } from "@/components/forms/Form"
import { Input } from "@/components/inputs/Input"
import { Loader } from "@/components/misc/Loader"
import { notifySuccess } from "@/helpers/notification"
import { validatePassword, validatePasswordConfirm } from "@/helpers/validation"
import { authResetPassword } from "@/services/api/auth"
import { usePage } from "@inertiajs/react"
import { useState } from "react"

export const ResetPasswordForm = ({
    onSuccess = () => {}
}) => {
    const { email, token } = usePage().props
    const [formRequest, setFormRequest] = useState({ 
        email : {
            value: email,
            error: '',
        }, 
        token : {
            value: token,
            error: '',
        }, 
        password : {
            value: '',
            error: '',
        }, 
        passwordConfirmation : {
            value: '',
            error: '',
        },
     })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = ({name, value}) => {
        let error = ''
        if (name == 'password') {
            error = validatePassword(value)
        }

        if (name == 'passwordConfirmation') {
            error = validatePasswordConfirm(formRequest.password.value, value)
        }

        setFormRequest((prevState) => ({
            ...prevState,
            [name]: {
                error: error,
                value: value,
            }
        }))
    }

    const handleSubmit = (event) => {
        if (isLoading) {
            return
        }

        const passwordError = validatePassword(formRequest.password.value)
        if (passwordError) {
            setFormRequest((prevState) => ({
                ...prevState,
                password: {
                    ...prevState.password,
                    error: passwordError,
                }
            }))
            return
        }

        const confirmError = validatePasswordConfirm(formRequest.password.value, formRequest.passwordConfirmation.value) 
        if (confirmError) {
            setFormRequest((prevState) => ({
                ...prevState,
                passwordConfirmation: {
                    ...prevState.passwordConfirmation,
                    error: confirmError,
                }
            }))
            return
        }

        setIsLoading(true)

        const formData = {}

        for (const key in formRequest) {
            if (!Object.prototype.hasOwnProperty.call(formRequest, key)) {
                continue;
            }

            const element = formRequest[key];
            formData[key] = element.value
        }

        authResetPassword(formData)
            .then(response => {
                if (response?.status?.code != 200) {
                    return
                }

                notifySuccess(response.status?.message)
                if (typeof onSuccess == 'function') {
                    onSuccess()
                }
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
                    <span className="fw-normal">Reset Password</span>
                </h4>
                <p className="mb-1">
                    Input new password
                </p>
            </div>
            <input 
                type="hidden"
                name="token"
                value={formRequest.token.value}
            />
            <Input
                name="email"
                type="email"
                label="Email"
                value={formRequest.email.value}
                onChange={handleChange}
                placeholder="e.g hello@example.com"
                className="pb-2 mb-4"
                disabled
            />
            <Input
                name="password"
                type="password"
                label="Password"
                value={formRequest.password.value}
                errorMsg={formRequest.password.error}
                onChange={handleChange}
                placeholder="••••••"
                className="pb-2 mb-4"
            />
            <Input
                name="passwordConfirmation"
                type="password"
                label="Confirm Password"
                value={formRequest.passwordConfirmation.value}
                errorMsg={formRequest.passwordConfirmation.error}
                onChange={handleChange}
                placeholder="••••••"
                className="pb-2 mb-4"
            />
            <div className="d-grid">
                <Button disabled={isLoading}>
                    { isLoading ? (
                        <Loader small className="me-2"/>
                    ) : (<></>) }
                    <span>Reset</span>
                </Button>
            </div>
        </Form>
    )
}