import { lazy } from "react"

export const Example = lazy(() =>
    import("src/pages/Visualizer/Visualizer").then(module => ({
        default: module.default,
    })),
)

export const NotFound = lazy(() =>
    import("src/pages/NotFound").then(module => ({
        default: module.default,
    })),
)
