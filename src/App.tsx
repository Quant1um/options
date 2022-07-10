import { BrowserRouter } from "react-router-dom"
import { Routes } from "./routes/Routes"
import ErrorBoundary from "./routes/components/ErrorBoundary"

export const App = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Routes />
            </ErrorBoundary>
        </BrowserRouter>
    )
}
