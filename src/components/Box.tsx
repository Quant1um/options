import { ReactNode } from "react"

interface Props {
    align?: "center" | "start" | "end" | undefined,
    justify?: "center" | "stretch" | undefined,
    row?: true | undefined,
    column?: true | undefined,
    fill?: true | undefined,
    center?: true | undefined,
    flex?: number | undefined,
    children: ReactNode,
    style?: object | undefined,
    [k: string]: any
}

export default (props: Props) => {
    if (props.center) {
        props.align = "center"
        props.justify = "center"
    }

    return (
        <div style={{
            display: "flex",
            alignItems: props.align,
            justifyContent: props.justify,
            flexDirection: props.row ? "row" : props.column ? "column" : undefined,
            flex: props.fill ? 1 : props.flex,
            ...(props.style || {})
        }}>
            {props.children}
        </div>
    )
}