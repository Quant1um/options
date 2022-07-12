import { Accordion, Avatar, Group, Text, useAccordionState } from "@mantine/core"
import { Option } from "calc/option"

import Empty from "./Empty"

export interface Props {
    onLoad: (arg: Option[]) => void
}

export const Container = ({ onLoad }: Props) => {
    return (
        <Accordion>
            <Accordion.Item key="empty" label={<Card name={"Empty"} icon={""} description={"Create an option combo from scratch"} />}>
                <Empty onLoad={onLoad} />
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