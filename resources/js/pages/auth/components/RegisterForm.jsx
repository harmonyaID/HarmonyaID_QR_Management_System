import { Button } from "@/components/buttons/Button"
import { Form } from "@/components/forms/Form"
import { Checkbox } from "@/components/inputs/Checkbox"
import { Input } from "@/components/inputs/Input"
import { Loader } from "@/components/misc/Loader"
import { notifySuccess } from "@/helpers/notification"
import { LoginRoute } from "@/routes/auth"
import { authRegister } from "@/services/api/auth"
import { useState } from "react"
import { route } from "ziggy-js"

export const RegisterForm = () => {
    const [formRequest, setFormRequest] = useState({ 
        firstname : {
            value: '',
            error: '',
        },
        lastname : {
            value: '',
            error: '',
        },
        email : {
            value: '',
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
        agreement: {
            value: false,
            error: '',
        }
    })
    const [isLoading, setIsLoading] = useState(false)

    const validatePassword = (value) => {
        if (value.length < 8) {
            return 'Minimum 8 characters'
        }

        if (!/[a-z]/.test(value)) {
            return 'Needs at least one lowercase character'
        }

        if (!/[A-Z]/.test(value)) {
            return 'Needs at least one uppercase character'
        }

        if (!/[0-9]/.test(value)) {
            return 'Needs at least one number'
        }

        if (!/[-_!@#$%^&*(),.?":;{}|<>/+=\[\]\\]/.test(value)) {
            return 'Needs at least one special character'
        }

        return ''
    }

    const handleChange = ({name, value}) => {
        let error = ''
        if (name == 'password') {
            error = validatePassword(value)
        }

        if (name == 'passwordConfirmation') {
            if (value != formRequest.password.value) {
                error = 'Does not match the password'
            }
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

        let passwordError = validatePassword(formRequest.password.value)
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

        if (formRequest.password.value != formRequest.passwordConfirmation.value) {
            setFormRequest((prevState) => ({
                ...prevState,
                passwordConfirmation: {
                    ...prevState.passwordConfirmation,
                    error: 'Does not match the password',
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

        authRegister(formData)
            .then(response => {
                if (response?.status?.code != 200) {
                    return
                }

                notifySuccess(response.status?.message)

                setTimeout(() => {
                    window.open(route(LoginRoute), '_self')
                }, 1000);
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
                    Sign up to start using our application
                </p>
            </div>

            <section className="d-grid grid-cols-2 gap-2">
                <Input
                    name="firstname"
                    type="firstname"
                    label="First Name"
                    required
                    value={formRequest.firstname.value}
                    onChange={handleChange}
                    errorMsg={formRequest.firstname.error}
                    placeholder="e.g Mamad"
                    className="pb-2"
                />
                <Input
                    name="lastname"
                    type="lastname"
                    label="Last Name"
                    required
                    value={formRequest.lastname.value}
                    onChange={handleChange}
                    errorMsg={formRequest.lastname.error}
                    placeholder="e.g Meeree"
                    className="pb-2"
                />
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    required
                    value={formRequest.email.value}
                    onChange={handleChange}
                    errorMsg={formRequest.email.error}
                    placeholder="e.g hello@example.com"
                    className="grid-span-2 pb-2"
                />
                <Input
                    name="password"
                    type="password"
                    label="Password"
                    required
                    value={formRequest.password.value}
                    onChange={handleChange}
                    errorMsg={formRequest.password.error}
                    placeholder="••••••"
                    className="grid-span-2 pb-2"
                />
                <Input
                    name="passwordConfirmation"
                    type="password"
                    label="Confirm Password"
                    required
                    value={formRequest.passwordConfirmation.value}
                    onChange={handleChange}
                    errorMsg={formRequest.passwordConfirmation.error}
                    placeholder="••••••"
                    className="grid-span-2 pb-1"
                />
                <div className="pb-3">
                    <Checkbox
                        name="agreement"
                        label="I agree to the term & conditions"
                        className="pb-1"
                        required
                        checked={formRequest.agreement.value}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-grid grid-span-2">
                    <Button disabled={isLoading}>
                        { isLoading ? (
                            <Loader small className="me-2"/>
                        ) : (<></>) }
                        <span>Sign Up</span>
                    </Button>
                    <Button
                        link
                        href={route(LoginRoute)}
                        type="button"
                    >
                        Sign In
                    </Button>
                </div>
            </section>
        </Form>
    )
}