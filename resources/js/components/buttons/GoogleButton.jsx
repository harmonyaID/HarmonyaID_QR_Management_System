import { Google } from "@/icons/Google"
import { LoginGoogleRoute } from "@/routes/auth"
import { route } from "ziggy-js"

export const GoogleButton = ({
    small       = false,
    disabled    = false,
    className   = '',
    children,
    download,
    ...props
}) => {
    return (
        <a
            href={route(LoginGoogleRoute)}
            className={`${
                'btn btn-outline-neutral-900'
            } ${
                small ? 'btn-sm' : ''
            } ${
                "d-inline-flex justify-content-between align-items-center"
            } ${
                className
            }`}
            {...props}
        >
            <Google
                size={20}
                className="me-3"
            />
            { children }
            <span>
                &nbsp;
            </span>
        </a>
    )
}