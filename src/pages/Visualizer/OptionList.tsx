import { Accordion, Group, ScrollArea, useAccordionState } from "@mantine/core"
import { Option, index as optionIndex } from "calc/option"
import { CirclePlus } from "tabler-icons-react"
import DashFrame from "src/components/DashFrame"
import OptionCard from "./OptionCard"
import OptionEditor from "./OptionEditor"

interface Props {
    options: Option[],
    onChange: (arg: Option[]) => void
}

export default ({ options, onChange }: Props) => {
    const [state, handlers] = useAccordionState({ total: options.length, initialItem: -1 });

    const addNew = () => {
        const list = options.slice()
        list.push({
            type: "Call",
            strike: 100,
            price: 50,
            maturity: 90,
            qty: 100,
        })
        onChange(list)
    }

    const deleteAt = (index: number) => {
        return () => {
            handlers.toggle(-1)
            const list = options.slice()
            list.splice(index, 1)
            onChange(list)
        }
    }

    const updateAt = (index: number) => {
        return (option: Option) => {
            const list = options.slice()
            list[index] = option
            onChange(list)
        }
    }

    return (
        <ScrollArea style={{ flex: 1 }} >
            <Accordion state={state} onChange={handlers.setState}>
                {
                    options.map((option: Option, index: number) =>
                        <Accordion.Item label={<OptionCard option={option} />} key={optionIndex(option)}>
                            <OptionEditor
                                option={option}
                                onChange={updateAt(index)}
                                onDelete={deleteAt(index)}
                            />
                        </Accordion.Item>
                    )
                }
            </Accordion>

            <DashFrame onClick={addNew}>
                <Group noWrap position="center" m="lg">
                    <Group direction="column">
                        <CirclePlus size={32} color="#999999" />
                    </Group>
                </Group>
            </DashFrame>
        </ScrollArea>
    )
}