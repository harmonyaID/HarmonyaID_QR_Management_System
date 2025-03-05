import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "./ErrorBoundary";

export const AppWrapper = ({
    children
}) => (
    <ErrorBoundary>
        { children }
        <ToastContainer/>
    </ErrorBoundary>
)