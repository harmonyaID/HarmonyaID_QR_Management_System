import { SidebarProvider } from "@/contexts/navigations/SidebarContext";
import { Sidebar } from "../navigations/Sidebar";
import { Navbar } from "../navigations/Navbar";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

export const AppLayout = ({
    title = '',
    children
}) => {
    useEffect(() => {
        document.body.classList.add('bg-neutral-50')
    }, [])

    return (
        <>
            <Head
                title={title}
            />
            <SidebarProvider>
                <div className="d-flex">
                    <Sidebar/>
                    <main className="flex-grow-1">
                        <Navbar title={title}/>
                        <div className="m-2 px-3 py-4">
                            { children }
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </>
    )
}