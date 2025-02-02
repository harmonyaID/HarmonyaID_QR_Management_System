import { createInertiaApp } from "@inertiajs/react"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"
import { createRoot } from "react-dom/client"
import { AppWrapper } from "./components/wrappers/AppWrapper"

const appName = import.meta.env.VITE_APP_NAME || 'QR Code'
createInertiaApp({
    title   : title => `${title} - ${appName}`,
    resolve : (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup   : ({el, App, props}) => {
        const root = createRoot(el)
        root.render(
            <AppWrapper>
                <App {...props} />
            </AppWrapper>
        )
    },
    progress: {
        color: '#FFA500',
    }
})