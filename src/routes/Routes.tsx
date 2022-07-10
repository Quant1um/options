import { Suspense } from "react"
import {
    Route,
    Routes as RoutesReactRouterDom,
} from "react-router-dom"

import { Example, NotFound } from "./paths"

export const Routes = () => {
    return (
        <Suspense fallback={<div />}>
            <RoutesReactRouterDom>
                <Route path="/" element={<Example />} />
                <Route path="*" element={<NotFound />} />
            </RoutesReactRouterDom>
        </Suspense>
    )
}
