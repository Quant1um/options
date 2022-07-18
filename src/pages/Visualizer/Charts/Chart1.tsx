import { Option } from "calc/option"
import { Paper } from "@mantine/core"
import { Chart, Cursor, Grid } from "src/components/Chart"

interface Props {
    options: Option[],
}

export default ({ options }: Props) => {
    return (
        <Paper radius="md" style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <Chart style={{ flex: 1 }}>
                <Cursor />
                <Grid />
            </Chart>
        </Paper>
    )
}