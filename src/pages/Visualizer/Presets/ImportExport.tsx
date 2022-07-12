import { Button, Group, TextInput } from "@mantine/core";
import { useState } from "react";
import { decode, encode } from "calc/encode";
import { Props } from "./Preset"
import { showNotification } from "@mantine/notifications";

export default ({ onLoad, options }: Props) => {
    const [code, setCode] = useState(encode(options) ?? "");

    const importCode = () => {
        const options = decode(code)

        if (options === null) {
            showNotification({
                id: "import error",
                autoClose: 2000,
                title: "Failed to import a combo",
                message: "The code that you've entered is not valid.",
                color: "red"
            })
        } else {
            onLoad(options)
        }
    }

    return (
        <Group noWrap>
            <Group noWrap grow>
                <TextInput value={code} onChange={(e) => setCode(e.currentTarget.value)} />
            </Group>
            <Button onClick={importCode}>Create</Button>
        </Group>
    )
};