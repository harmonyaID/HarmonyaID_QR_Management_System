import { Back } from "@/icons/Back"
import { Check } from "@/icons/Check"
import { LoginRoute } from "@/routes/auth"
import { Link } from "@inertiajs/react"
import { route } from "ziggy-js"

export const ResetPasswordSuccess = () => {
    return (
        <section className="wrapper text-center">
            <Check
                className="text-forest mb-4"
                size="5rem"
            />
            <p className="mb-4">
                Successfully updated your password
            </p>
            <Link
                className="text-primary text-decoration-none d-inline-flex" 
                href={route(LoginRoute)}
            >
                <Back size={24}/>
                <span className="ms-2">Back to Sign In</span>
            </Link>
        </section>
    )
}