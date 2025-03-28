import { Button } from "@/components/buttons/Button"
import { GoogleButton } from "@/components/buttons/GoogleButton"
import { Form } from "@/components/forms/Form"
import { Checkbox } from "@/components/inputs/Checkbox"
import { Input } from "@/components/inputs/Input"
import { DividerText } from "@/components/misc/DividerText"
import { Loader } from "@/components/misc/Loader"
import { notifySuccess } from "@/helpers/notification"
import { validatePassword, validatePasswordConfirm } from "@/helpers/validation"
import { LoginRoute } from "@/routes/auth"
import { SetupUsageCategory } from "@/routes/setup"
import { authRegister } from "@/services/api/auth"
import { Link, usePage } from "@inertiajs/react"
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

    const { props } = usePage()

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

        authRegister(formData)
            .then(response => {
                if (response?.status?.code != 200) {
                    return
                }

                notifySuccess(response.status?.message)

                setTimeout(() => {
                    window.open(route(SetupUsageCategory), '_self')
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
            <div className="pb-3 mb-2">
                <h3 className="mb-2">
                    <span className="fw-normal">Welcome to </span>
                    { props.app_name }
                </h3>
                <p className="mb-0">
                    Sign up to start using our application
                </p>
            </div>
            <div className="d-grid gap-1">
                <GoogleButton>
                    Sign Up with Google
                </GoogleButton>
            </div>
            <DividerText className="my-5 text-neutral-600">
                or Sign Up With Email
            </DividerText>
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
                    className="grid-span-2 pb-3"
                />
                <div className="grid-span-2 pb-3">
                    <Checkbox
                        name="agreement"
                        label="I agree to the term & conditions"
                        className="pb-1"
                        required
                        checked={formRequest.agreement.value}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-grid gap-3 grid-span-2">
                    <Button disabled={isLoading}>
                        { isLoading ? (
                            <Loader small className="me-2"/>
                        ) : (<></>) }
                        <span>Sign Up</span>
                    </Button>
                    <div className="text-center py-3">
                        Already have an account?{' '}
                        <Link
                            href={route(LoginRoute)}
                            className="text-primary text-decoration-none fw-medium"
                        >
                            Login Here
                        </Link>
                    </div>
                </div>
            </section>
        </Form>
    )
}