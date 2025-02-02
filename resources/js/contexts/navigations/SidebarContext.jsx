import { createContext, useState } from "react";

export const SidebarContext = createContext(null)

export const SidebarProvider = ({
    children
}) => {
    const state = useState(false)

    return (
        <SidebarContext value={state}>
            { children }
        </SidebarContext>
    )
}