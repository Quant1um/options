import { Option } from "calc/option"
import { Divider, Modal } from "@mantine/core";
import { Container } from "./Presets/Preset";

interface Props {
    opened: boolean,
    options: Option[],
    onClose: () => void,
    onLoad: (arg: Option[]) => void
}

export default ({ opened, options, onClose, onLoad }: Props) => {
    return (
        <Modal opened={opened} onClose={onClose} title="Load/Save" size="40%" overflow="outside">
            <Divider variant="dotted" />
            <Container onLoad={onLoad} options={options} />
        </Modal>
    )
}