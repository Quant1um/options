import { Component, ReactNode } from "react"
import CVContainer from "./CVContainer"
import DeadFace from "./DeadFace"

interface Props {
    children: ReactNode
}

interface State {
    error?: any
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: { children: ReactNode }) {
        super(props)
        this.state = {}
    }

    static getDerivedStateFromError(error: any) {
        console.log(error)
        return { error }
    }

    render() {
        const { error } = this.state
        const { children } = this.props

        if (typeof error !== "undefined") {
            return (
                <CVContainer>
                    <DeadFace />
                    <h2>An Error has occurred</h2>
                    <h6>{error}</h6>
                </CVContainer>
            )
        }

        return children
    }
}
