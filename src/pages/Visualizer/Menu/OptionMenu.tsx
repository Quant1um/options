import { Option } from "calc/option"
import { Paper, Group, Title, Divider } from "@mantine/core"
import OptionList from "./OptionList"
import GeneralMenu from "./GeneralMenu"

interface Props {
    options: Option[],
    onChangeOptions: (arg: Option[]) => void
}

export default ({ options, onChangeOptions }: Props) => {
    return (
        <Paper radius="md" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Group m="md" position="apart">
                <Title order={4}>Option Visualizer</Title>
                <GeneralMenu onOptionsLoad={(list) => onChangeOptions(list)} options={options} />
            </Group>
            <Divider variant="dotted" />
            <OptionList options={options} onChange={onChangeOptions} />
        </Paper>
    )
}