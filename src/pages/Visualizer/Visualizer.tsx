import { Option } from "calc/option"
import { useLocalStorage } from "@mantine/hooks";

import OptionMenu from "./Menu/OptionMenu";
import Chart1 from "./Charts/Chart1";
import Grid from "hedron"


export default () => {
    const [options, setOptions] = useLocalStorage<Option[]>({
        key: "options",
        defaultValue: [
            {
                type: "Call",
                strike: 10,
                price: 1,
                maturity: 1,
                short: false,
                qty: 10,
            },

            {
                type: "Put",
                strike: 10,
                price: 1,
                maturity: 1,
                short: false,
                qty: 10,
            },

            {
                type: "Call",
                strike: 10,
                price: 1,
                maturity: 1,
                short: false,
                qty: 10,
            }
        ]
    })

    return (
        <Grid.Provider
            padding="1em"
            breakpoints={{ sm: "-500", md: "501-750", lg: "+750" }}>

            <Grid.Bounds direction="horizontal" flex="1" sm={{ direction: "vertical" }} style={{ margin: "1em" }}>
                <Grid.Box flex="1" style={{ display: "flex", justifyItems: "stretch" }}>
                    <OptionMenu options={options} onChangeOptions={setOptions} />
                </Grid.Box>

                <Grid.Bounds flex="2" direction="vertical">
                    <Grid.Box flex="1" style={{ display: "flex", justifyItems: "stretch" }}>
                        <Chart1 options={options} />
                    </Grid.Box>

                    <Grid.Box flex="1" style={{ display: "flex", justifyItems: "stretch" }}>
                        <Chart1 options={options} />
                    </Grid.Box>
                </Grid.Bounds>
            </Grid.Bounds>
        </Grid.Provider>
    )
}