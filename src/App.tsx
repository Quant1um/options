import { BrowserRouter } from "react-router-dom"
import { Routes } from "routes/Routes"
import { MantineProvider } from "@mantine/core"
import ErrorBoundary from "components/ErrorBoundary"
import theme from "./theme"

export const App = () => {
    return (
        <BrowserRouter>
            <MantineProvider theme={theme}>
                <ErrorBoundary>
                    <Routes />
                </ErrorBoundary>
            </MantineProvider>
        </BrowserRouter>
    )
}
