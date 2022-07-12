import { Accordion, Avatar, Group, Text, useAccordionState } from "@mantine/core"
import { Option } from "calc/option"

import Empty from "./Empty"
import ImportExport from "./ImportExport"

export interface Props {
    onLoad: (arg: Option[]) => void,
    options: Option[]
}

export const Container = ({ onLoad, options }: Props) => {
    return (
        <Accordion>
            <Accordion.Item key="empty" label={<Card name={"Empty"} icon={""} description={"Create an option combo from scratch"} />}>
                <Empty onLoad={onLoad} options={options} />
            </Accordion.Item>

            <Accordion.Item key="import" label={<Card name={"Import/Export"} icon={""} description={"Import combo from short code"} />}>
                <ImportExport onLoad={onLoad} options={options} />
            </Accordion.Item>
        </Accordion>
    )
}

interface CardProps {
    name: string,
    icon: string,
    description: string,
}

const Card = ({ name, icon, description }: CardProps) => {
    return (
        <Group noWrap>
            <Avatar src={icon} radius="xl" size="lg" />

            <div>
                <Text>
                    {name}
                </Text>

                <Text size="sm" color="dimmed" weight={400}>
                    {description}
                </Text>
            </div>
        </Group>
    )
}