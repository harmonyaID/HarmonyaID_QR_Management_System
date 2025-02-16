import { SidebarContext } from "@/contexts/navigations/SidebarContext"
import { useContext, useState } from "react"
import { Logo } from "../brandings/Logo"
import { AccountRoute, AccountSettingRoute, DashboardRoute, PlanRoute, QrRoute, QrSettingRoute, UsageCategoryRoute } from "@/routes/app"
import { House } from "@/icons/House"
import { User } from "@/icons/User"
import { Link } from "@inertiajs/react"
import { Setting } from "@/icons/Setting"
import { route } from "ziggy-js"
import { QrCode } from "@/icons/QrCode"

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
                            { href: route(QrRoute), label: 'Qr Codes', icon: QrCode },
                            { href: route(QrSettingRoute), label: 'Qr Setting', icon: Setting },
                        ]}
                    />
                    <SidebarHeader>
                        Account Management
                    </SidebarHeader>
                    <SidebarList
                        items={[
                            { href: route(AccountRoute), label: 'Account', icon: User },
                            { href: route(AccountSettingRoute), label: 'Account Setting', icon: Setting },
                            // { href: route(PlanRoute), label: 'Plan', icon: Star },
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
    subItems,
    alias,
    permissions,
    icon
}) => {
    const Icon = icon
    const location = window.location.href
    // const subItemId = `nav-${alias}`
    const isActive = href == location
    // const hasPermissions = useHasAnyPermissions(permissions)
    
    // const [open, setOpen] = useState(isActive)

    // const handleToggleCollapse = () => {
    //     toggleCollapse(subItemId, !open)
    //     setOpen(!open)
    // }

    // if (!hasPermissions) {
    //     return <></>
    // }

    // if (!Array.isArray(subItems) || !subItems.length) {
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
    // }

    // return (
    //     <li 
    //         className={`flex-wrap ${isActive ? 'active' : ''}`}
    //     >
    //         <div 
    //             className="menu-extendable-label flex-shrink-0"
    //             onClick={handleToggleCollapse}
    //             title={label}
    //         >
    //             <Icon className="menu-icon"/>
    //             <span className="menu-label">
    //                 { label }
    //             </span>
    //             { open ? (
    //                 <ArrowUp2 className="menu-icon"/>
    //             ) : (
    //                 <ArrowDown2 className="menu-icon"/>
    //             ) }
    //         </div>
    //         <ul 
    //             id={`nav-${alias}`} 
    //             className={`collapse ${isActive ? 'show' : ''}`}
    //         >
    //             { subItems.map(((item, index) => (
    //                 <SidebarSubItem
    //                     key={`nav-${alias}-sub-item-${index}`}
    //                     label={item.label}
    //                     href={item.href}
    //                     permissions={item.permissions}
    //                     icon={item.icon}
    //                 />
    //             ))) }
    //         </ul>
    //     </li>
    // )
}

const SidebarSubItem  = ({
    label,
    href,
    permissions,
    icon,
}) => {
    // const { pathname } = useLocation()
    // const hasPermissions = useHasAnyPermissions(permissions)
    const Icon = icon

    // if (!hasPermissions) {
    //     return <></>
    // }

    return (
        <li 
            // className={pathname.startsWith(href) ? 'active' : ''}
        >
            <Link
                href={href}
                className="stretched-link"
                title={label}
            >
                <Icon className="menu-icon" size="1.2rem"/>
                <span className="menu-label">
                    { label }
                </span>
            </Link>
        </li>
    )
}