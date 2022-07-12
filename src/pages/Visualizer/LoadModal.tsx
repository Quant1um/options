import { Option } from "calc/option"
import { Group, Modal } from "@mantine/core";
import { Container } from "./Presets/Preset";

interface Props {
    opened: boolean,
    onClose: () => void,
    onLoad: (arg: Option[]) => void
}

export default ({ opened, onClose, onLoad }: Props) => {
    return (
        <Modal opened={opened} onClose={onClose} title="Load Menu" size="40%" overflow="outside">
            <Container onLoad={onLoad} />
        </Modal>
    )
}