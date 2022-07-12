import { ActionIcon, Button, Group, Popover, TextInput, Text, Tooltip } from "@mantine/core";
import { useRef, useState } from "react";
import { decode, encode } from "calc/encode";
import { Props } from "./Preset"
import { showNotification } from "@mantine/notifications";
import { Copy } from "tabler-icons-react";

export default ({ onLoad, options }: Props) => {
    const [code, setCode] = useState(encode(options) ?? "");
    const [copy, setCopy] = useState(false);
    const ref = useRef();

    const copyCode = () => {
        setCopy(true);
        setTimeout(() => setCopy(false), 3000);

        if (navigator) {
            navigator.clipboard.writeText(code);
        } else if (typeof ref.current !== "undefined") {
            (ref.current as HTMLInputElement).select();
            document.execCommand("copy");
        }
    }

    const importCode = () => {
        const options = decode(code)

        if (options === null) {
            showNotification({
                id: "import error",
                autoClose: 3000,
                title: "Failed to import a combo",
                message: "The code that you've entered is not valid.",
                color: "red"
            })
        } else {
            onLoad(options)
        }
    }

    return (
        <Group>
            <Group noWrap grow>
                <TextInput
                    ref={ref} //dumb typescript again
                    value={code}
                    onChange={(e) => setCode(e.currentTarget.value)}
                    rightSection={
                        <Tooltip
                            opened={copy}
                            label="Copied!"
                            withArrow>
                            <ActionIcon color="dark" variant="hover" onClick={copyCode}><Copy /></ActionIcon>
                        </Tooltip>

                    } />
            </Group>
            <Button onClick={importCode}>Create</Button>
        </Group>
    )
};