import { Button, Group } from "@mantine/core";
import { Props } from "./Preset"

export default ({ onLoad }: Props) => {
    return (
        <Group noWrap position="right">
            <Button onClick={() => onLoad([])}>Create</Button>
        </Group>

    )
};