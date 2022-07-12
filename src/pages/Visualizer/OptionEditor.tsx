import { ActionIcon, Group, InputWrapper, NumberInput, SegmentedControl, Space } from "@mantine/core"
import { Option } from "calc/option"
import { Trash } from "tabler-icons-react";

interface Props {
    option: Option,
    onChange: (arg: Option) => void,
    onDelete: () => void
}

export default ({ option, onChange, onDelete }: Props) => {
    return (
        <Group direction="column" grow spacing="xs" m="xs">
            <Group noWrap position="apart">
                <Group noWrap>
                    <SegmentedControl
                        data={["↗", "↘"]}
                        value={option.qty > 0 ? "↗" : "↘"}
                        onChange={(type: "↗" | "↘") => onChange({ ...option, qty: (type === "↗" ? 1 : -1) * Math.abs(option.qty) })}
                    />

                    <SegmentedControl
                        data={["Call", "Put", "Stock"]}
                        value={option.type}
                        onChange={(type) => onChange({ ...option, type } as Option)}
                    />
                </Group>

                <ActionIcon
                    color="red"
                    variant="hover"
                    size="lg"
                    onClick={onDelete}>
                    <Trash size={24} />
                </ActionIcon>
            </Group>

            <NumberInput
                label="Quantity"
                min={1}
                step={0.01}
                stepHoldDelay={500}
                stepHoldInterval={10}
                precision={2}
                value={Math.abs(option.qty)}
                noClampOnBlur
                onChange={(qty: number) => onChange({ ...option, qty: Math.sign(option.qty) * qty })}
            />

            {
                option.type !== "Stock" &&
                <>
                    <NumberInput
                        label="Days until Expiration"
                        min={0}
                        step={0.01}
                        stepHoldDelay={500}
                        stepHoldInterval={10}
                        precision={2}
                        value={option.maturity}
                        noClampOnBlur
                        onChange={(maturity: number) => onChange({ ...option, maturity })}
                    />

                    <NumberInput
                        label="Strike Price"
                        min={0}
                        step={0.01}
                        stepHoldDelay={500}
                        stepHoldInterval={10}
                        precision={2}
                        value={option.strike}
                        noClampOnBlur
                        onChange={(strike: number) => onChange({ ...option, strike })}
                    />

                    <NumberInput
                        label="Price per Share"
                        min={0}
                        step={0.01}
                        stepHoldDelay={500}
                        stepHoldInterval={10}
                        precision={2}
                        value={option.price}
                        noClampOnBlur
                        onChange={(price: number) => onChange({ ...option, price })}
                    />
                </>
            }
        </Group>
    )
}

