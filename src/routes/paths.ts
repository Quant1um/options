import { lazy } from "react"

export const Example = lazy(() =>
    import("src/pages/Example/Example").then(module => ({
        default: module.Example,
    })),
)

export const NotFound = lazy(() =>
    import("src/pages/NotFound").then(module => ({
        default: module.NotFound,
    })),
)
