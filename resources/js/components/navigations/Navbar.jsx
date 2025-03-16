import { SidebarContext } from "@/contexts/navigations/SidebarContext"
import { notifySuccess } from "@/helpers/notification"
import { LoginRoute } from "@/routes/auth"
import { authLogout } from "@/services/api/auth"
import { useContext, useMemo, useState } from "react"
import { route } from "ziggy-js"
import { ConfirmModal } from "../modals/ConfirmModal"
import { MDAuthLogout } from "@/configs/modalId"
import { User } from "@/icons/User"
import { Upload } from "@/icons/Upload"
import { Fold } from "@/icons/Fold"
import { Expand } from "@/icons/Expand"
import { toggleModal } from "@/helpers/toggleModal"
import { usePage } from "@inertiajs/react"
import { AccountRoute } from "@/routes/app"

export const Navbar = ({
    title
}) => {
    const [sidebarOpen, setSidebarOpen] = useContext(SidebarContext)
    const [loading, setLoading] = useState(false)

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
            <nav className="page-navbar">
                <section className="navbar-group">
                    <button 
                        title="Toggle sidebar"
                        aria-label="Toggle Sidebar"
                        className="sidebar-btn"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        { sidebarOpen ? (
                            <Fold size={24}/>
                        ) : (
                            <Expand size={24}/>
                        ) }
                    </button>
                    <h3 className="navbar-title mb-0">
                        { title }
                    </h3>
                </section>

                <section className="navbar-group">
                    <ProfileDropdown/>
                </section>
            </nav>
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

const ProfileDropdown = () => {
    
    const { user } = usePage().props

    const photoUrl = useMemo(() => {
        return document.querySelector('meta[name="user-photo"]')?.getAttribute('content') || ''
    }, [])

    const handleLogout = () => {
        toggleModal(MDAuthLogout, true)
    }

    const handleRedirect = (event) => {
        const element = event.currentTarget
        const url = element.href
        const target = element.target

        if (target == '_blank' && url && !url.startsWith('#')) {
            window.open(url, target)
        } else {
            window.location.href = url
        }
    }

    return (
        <div className="dropdown">
            <div
                className="d-flex align-items-center text-grey-700 dropdown-toggle"
                data-bs-toggle="dropdown"
                role="button"
                id="dropdown-profile"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <div className="navbar-photo rounded-circle overflow-hidden">
                    <img 
                        src={ photoUrl || `https://ui-avatars.com/api/?name=${user.fullname}&rounded=true&color=FFFFFF&background=0056B3&font-size=0.35` }
                        alt="Profile"
                        className="object-fit-cover w-100 h-100"
                    />
                </div>
                
                <div className="dropdown-menu border-0 shadow-sm fs-7">
                    <a className="dropdown-item">
                        Version 1.0.0
                    </a>
                    <a
                        className="dropdown-item cursor-pointer"
                        href={route(AccountRoute)}
                        onClick={handleRedirect}
                    >
                        <span className="me-2">
                            <User size={16}/>
                        </span>
                        Profile
                    </a>
                    <a
                        className="dropdown-item cursor-pointer"
                        href="#"
                        onClick={handleLogout}
                    >
                        <span className="me-2">
                            <Upload className="transform rotate-90" size={16}/>
                        </span>
                        Log Out
                    </a>
                </div>
            </div>
        </div>
    )
}