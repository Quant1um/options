import { Option } from "calc/option"
import { useState } from "react";
import OptionMenu from "./OptionMenu";
import { SimpleGrid } from "@mantine/core";
import Box from "src/components/Box";

export default () => {
    const [options, setOptions] = useState<Option[]>([
        {
            type: "Call",
            strike: 10,
            price: 1,
            maturity: 1,
            qty: 10,
        },

        {
            type: "Put",
            strike: 10,
            price: 1,
            maturity: 1,
            qty: 10,
        },

        {
            type: "Call",
            strike: 10,
            price: 1,
            maturity: 1,
            qty: 10,
        }
    ])

    return (
        <SimpleGrid cols={3} m="lg" style={{ flex: 1 }}>
            <OptionMenu options={options} onChangeOptions={setOptions} />
        </SimpleGrid>
    )
}