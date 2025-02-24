import { SidebarContext } from "@/contexts/navigations/SidebarContext"
import { useContext, useState } from "react"
import { Logo } from "../brandings/Logo"
import { AccountRoute, AccountSettingRoute, DashboardRoute, FaqManageRoute, FaqRoute, PlanRoute, QrRoute, QrSettingRoute, UsageCategoryRoute } from "@/routes/app"
import { House } from "@/icons/House"
import { User } from "@/icons/User"
import { Link } from "@inertiajs/react"
import { Setting } from "@/icons/Setting"
import { route } from "ziggy-js"
import { QrCode } from "@/icons/QrCode"
import { useHasAnyPermissions } from "@/hooks/useHasPermissions"
import { ACCOUNT_SETTING_GROUP, FAQ_GROUP_ALL, QR_GROUP_ALL, QR_SETTING_GROUP } from "@/configs/permissions"
import { Chat } from "@/icons/Chat"

export const Sidebar = () => {
    const [open, setOpen] = useContext(SidebarContext)
    const [hover, setHover] = useState(false)

    const handleMouseEnter = (event) => {
        const target = event.currentTarget
        if (target.classList.contains('active')) {
            return
        }

        setHover(true)
    }

    const handleMouseLeave = (event) => {
        const target = event.currentTarget
        if (target.classList.contains('active')) {
            return
        }

        setHover(false)
    }

    return (
        <>
            { !open ? (<div className="sidebar-replacement"/>) : <></> }
            <nav 
                className={`page-sidebar flex-shrink-0 ${ open ? 'active' : '' }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="logo-container">
                    <Link href={route(DashboardRoute)}>
                        <Logo 
                            variant="icon-only" 
                            size={ open || hover ? 64 : 32}
                        />
                    </Link>
                </div>

                <section className="menu-section">
                    <SidebarList
                        items={[
                            { href: route(DashboardRoute), label: 'Dashboard', icon: House },
                        ]}
                    />
                    <SidebarHeader>
                        Qr Management
                    </SidebarHeader>
                    <SidebarList
                        items={[
                            { href: route(QrRoute), label: 'Qr Codes', icon: QrCode, permissions: QR_GROUP_ALL },
                            { href: route(QrSettingRoute), label: 'Qr Setting', icon: Setting, permissions: QR_SETTING_GROUP },
                        ]}
                    />
                    <SidebarHeader>
                        Account Management
                    </SidebarHeader>
                    <SidebarList
                        items={[
                            { href: route(AccountRoute), label: 'Account', icon: User },
                            { href: route(AccountSettingRoute), label: 'Account Setting', icon: Setting, permissions: ACCOUNT_SETTING_GROUP },
                        ]}
                    />
                    <SidebarHeader>
                        Help
                    </SidebarHeader>
                    <SidebarList
                        items={[
                            { href: route(FaqRoute), label: 'Frequently Asked Question', icon: Chat },
                            { href: route(FaqManageRoute), label: 'Manage FAQ', icon: Setting, permissions: FAQ_GROUP_ALL },
                        ]}
                    />
                </section>
            </nav>
        </>
    )
}

const SidebarHeader = ({
    children
}) => (
    <header className="menu-name">
        { children }
    </header>
)

const SidebarList = ({
    items
}) => (
    <ul className="menu-list">
        { items.map((item, index) => (
            <SidebarItem key={index} {...item}/>
        )) }
    </ul>
)

const SidebarItem = ({
    label,
    href,
    permissions,
    icon
}) => {
    const Icon = icon
    const location = window.location.href
    const isActive = href == location
    const hasPermissions = useHasAnyPermissions(permissions)

    if (!hasPermissions) {
        return <></>
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <Link 
                href={href}
                className="stretched-link"
                title={label}
            >
                <Icon size={24} className="menu-icon"/>
                <span className="menu-label">
                    { label }
                </span>
            </Link>
        </li>
    )    
}
