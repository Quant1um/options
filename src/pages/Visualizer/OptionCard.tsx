import { Avatar, Group, Text } from "@mantine/core";
import { Option } from "calc/option"


interface Props {
    option: Option,
}

export default ({ option }: Props) => {
    const long = option.qty >= 0
    const qty = Math.abs(option.qty)
    const type = option.type

    const info = type !== "Stock" ?
        <div>
            <Text>{long ? "Long" : "Short"} {type} at <b>{option.strike}$</b> <b>(x{qty})</b></Text>

            <Text size="sm" color="dimmed" weight={400}>
                <b>{option.maturity}</b> DTE w/ price of <b>{option.price}$</b>
            </Text>
        </div>
        :
        <div>
            <Text>{long ? "Long" : "Short"} Stock <b>(x{qty})</b></Text>
        </div>

    return (
        <Group noWrap>
            <Avatar src={""} radius="xl" size="lg" />
            {info}
        </Group>
    );
}

