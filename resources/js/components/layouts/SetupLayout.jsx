import { Head, usePage } from "@inertiajs/react"
import { Logo } from "../brandings/Logo"
import { Button } from "../buttons/Button"
import { Upload } from "@/icons/Upload"
import { ConfirmModal } from "../modals/ConfirmModal"
import { MDAuthLogout } from "@/configs/modalId"
import { useState } from "react"
import { authLogout } from "@/services/api/auth"
import { notifySuccess } from "@/helpers/notification"
import { toggleModal } from "@/helpers/toggleModal"
import { route } from "ziggy-js"
import { LoginRoute } from "@/routes/auth"

export const SetupLayout = ({
    title = '',
    children
}) => {
    const [loading, setLoading] = useState(false)
    const { props } = usePage()

    const handleLogout = () => {
        toggleModal(MDAuthLogout, true)
    }
    
    const handleConfirmLogout = () => {
        if (loading) {
            return
        }

        setLoading(true)

        authLogout().then(response => {
            if (!response) {
                return
            }

            notifySuccess('Successfully logged out!')

            window.location.href = route(LoginRoute)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    const handleCancelLogout = () => {
        toggleModal(MDAuthLogout, false)
    }

    return (
        <>
            <Head
                title={`Setup ${title}`}
            />
            <section className="setup">
                <header
                    className={`${
                        "bg-white shadow-sm px-3 py-2"
                    }`}
                >
                    <div className="container d-flex justify-content-between align-items-center w-100">
                        <Logo size={32}/>
                        <Button
                            text
                            onClick={handleLogout}
                        >
                            <span className="me-2">Logout</span>
                            <Upload 
                                size={24}
                                className="transform rotate-90"
                            />
                        </Button>
                    </div>
                </header>
                <section className="container py-5">
                    <h2>Welcome to { props.app_name }!</h2>
                    <p className="mb-5">Please help us tailor our service to your needs.</p>
                    { children }
                </section>
            </section>
            <ConfirmModal
                id={MDAuthLogout}
                message="Are you sure you want to log out?"
                hint={`Press "Continue" if you are ready to end your current session`}
                onCancel={handleCancelLogout}
                onConfirm={handleConfirmLogout}
                loading={loading}
                negativeFlow
            />
        </>
    )
}