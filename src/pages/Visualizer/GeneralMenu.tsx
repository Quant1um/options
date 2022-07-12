import { Option } from "calc/option"
import { Menu, Divider, Text } from '@mantine/core';
import { useState } from 'react';
import { useHotkeys } from "@mantine/hooks";
import { Settings, Search, Photo, MessageCircle, ArrowsLeftRight } from 'tabler-icons-react';
import LoadModal from './LoadModal';

interface Props {
    onOptionsLoad: (arg: Option[]) => void
}

export default ({ onOptionsLoad }: Props) => {
    const [presetOpened, setPresetOpened] = useState(false);

    useHotkeys([
        ["mod+S", () => setPresetOpened(true)],
        ["mod+L", () => setPresetOpened(true)]
    ])

    return (
        <>
            <LoadModal opened={presetOpened} onClose={() => setPresetOpened(false)} onLoad={(list) => { onOptionsLoad(list); setPresetOpened(false) }} />
            <Menu size="md">
                <Menu.Item icon={<ArrowsLeftRight size={14} />} rightSection={<Text size="xs" color="dimmed">⌘L</Text>} onClick={() => setPresetOpened(true)}>Save/Load</Menu.Item>

                <Divider />
                <Menu.Label>Other</Menu.Label>

                <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
                <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
                <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
                <Menu.Item
                    icon={<Search size={14} />}
                    rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
                >
                    Search
                </Menu.Item>
            </Menu>
        </>
    );
}