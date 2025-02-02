import { Component } from "react"
import { ErrorMsg } from "../misc/ErrorMsg"

export class ErrorBoundary extends Component {
    state = {
        isError: false
    }

    componentDidCatch(error, errorInfo) {
        console.error(error)
        console.info(errorInfo)

        this.setState({ isError: true })
    }

    render() {
        if (this.state.isError) {
            return ( <ErrorMsg/> )
        }

        return this.props.children
    }
}