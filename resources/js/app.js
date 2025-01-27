import { createInertiaApp } from "@inertiajs/react"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"
import { createRoot } from "react-dom/client"

const appName = import.meta.env.VITE_APP_NAME || 'QR Code'
createInertiaApp({
    title   : title => `${title} - ${appName}`,
    resolve : (name) => resolvePageComponent(`./Pages/${name}.js`, import.meta.glob('./Pages/**/*.js')),
    setup   : ({element, App, props}) => {
        const root = createRoot(element)
        root.render(<App {...props} />)
    },
    progress: {
        color: '#07ACFF',
    }
})