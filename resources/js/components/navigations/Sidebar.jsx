import { SidebarContext } from "@/contexts/navigations/SidebarContext"
import { useContext, useState } from "react"
import { Logo } from "../brandings/Logo"
import { DashboardRoute } from "@/routes/app"
import { House } from "@/icons/House"

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
                    <a href={route(DashboardRoute)}>
                        <Logo 
                            variant="icon-only" 
                            size={ open || hover ? 64 : 32}
                        />
                    </a>
                </div>

                <section className="menu-section">
                    <SidebarHeader>
                        Booking Management
                    </SidebarHeader>
                    <SidebarList
                        items={[
                            { href: route(DashboardRoute), label: 'Dashboard', icon: House },
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
    const location = window.location.pathname
    // const subItemId = `nav-${alias}`
    const isActive = location.startsWith(href)
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
                <a 
                    href={href}
                    className="stretched-link"
                    title={label}
                >
                    <Icon size={24} className="menu-icon"/>
                    <span className="menu-label">
                        { label }
                    </span>
                </a>
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
            <a
                href={href}
                className="stretched-link"
                title={label}
            >
                <Icon className="menu-icon" size="1.2rem"/>
                <span className="menu-label">
                    { label }
                </span>
            </a>
        </li>
    )
}