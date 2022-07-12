import { Option } from "calc/option"
import { Paper } from "@mantine/core"

interface Props {
    options: Option[],
}

export default ({ options }: Props) => {
    return (
        <Paper radius="md" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        </Paper>
    )
}