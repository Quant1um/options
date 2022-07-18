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
            }
        ]
    });

    return (
        <Grid.Provider padding="1em">
            <Grid.Bounds direction="horizontal" flex="1" style={{ margin: "1em" }}>
                <Grid.Box style={{ display: "flex", justifyItems: "stretch" }}>
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