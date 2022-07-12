import { Option } from "calc/option"
import { Menu, Divider, Text } from '@mantine/core';
import { useState } from 'react';
import { useHotkeys } from "@mantine/hooks";
import { ChartArcs, InfoCircle, Message, ArrowsLeftRight } from 'tabler-icons-react';
import LoadModal from './LoadModal';
import AboutModal from "./AboutModal";

interface Props {
    onOptionsLoad: (arg: Option[]) => void,
    options: Option[]
}

export default ({ onOptionsLoad, options }: Props) => {
    const [presetOpened, setPresetOpened] = useState(false);
    const [aboutOpened, setAboutOpened] = useState(false);

    useHotkeys([
        ["mod+S", () => setPresetOpened(true)],
        ["mod+L", () => setPresetOpened(true)],
        ["F1", () => setAboutOpened(true)]
    ])

    return (
        <>
            <LoadModal
                opened={presetOpened}
                onClose={() => setPresetOpened(false)}
                options={options}
                onLoad={(list) => { onOptionsLoad(list); setPresetOpened(false) }} />

            <AboutModal
                opened={aboutOpened}
                onClose={() => setAboutOpened(false)} />

            <Menu size="md">
                <Menu.Item
                    icon={<ArrowsLeftRight size={14} />}
                    rightSection={<Text size="xs" color="dimmed">⌘L</Text>}
                    onClick={() => setPresetOpened(true)}>Save/Load</Menu.Item>
                <Divider />

                <Menu.Item icon={<ChartArcs size={14} />}>Chain Analysis</Menu.Item>
                <Menu.Item icon={<Message size={14} />}>Blogpost</Menu.Item>
                <Menu.Item
                    icon={<InfoCircle size={14} />}
                    rightSection={<Text size="xs" color="dimmed">F1</Text>}
                    onClick={() => setAboutOpened(true)}>About</Menu.Item>
            </Menu>
        </>
    );
}