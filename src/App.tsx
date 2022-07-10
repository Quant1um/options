import { BrowserRouter } from "react-router-dom"
import { Routes } from "routes/Routes"
import ErrorBoundary from "components/ErrorBoundary"

export const App = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Routes />
            </ErrorBoundary>
        </BrowserRouter>
    )
}
