import { Modal, Title } from "@mantine/core";

interface Props {
    opened: boolean,
    onClose: () => void,
}

export default ({ opened, onClose }: Props) => {
    return (
        <Modal opened={opened} onClose={onClose} title="About" size="lg">
            <Title order={2} style={{ fontWeight: 100 }}>Option Visualizer Tool</Title>
            <Title order={3} style={{ fontWeight: 100 }} color="dimmed">by <a href="https://amee.ee">Quant1um</a></Title>
        </Modal>
    )
}