import { useResizeObserver } from "@mantine/hooks";
import { createContext, ReactNode, useContext, useState } from "react";

const ChartContext = createContext<Context>({
    cursor: null,
    width: 0,
    height: 0
});

interface Context {
    cursor: null | number[],
    width: number,
    height: number
}

export const useChart = () => {
    return useContext(ChartContext);
};

interface Props {
    children: ReactNode,
    style: object,
    [k: string]: any
}

export default ({ children, style, ...props }: Props) => {
    const [ref, rect] = useResizeObserver();
    const [cursor, setCursor] = useState<number[] | null>(null);

    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    const setCursorFromEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        setCursor([x, y]);
    };

    return (
        <ChartContext.Provider value={{ width, height, cursor }}>
            <div ref={ref} {...props} style={{ ...style, position: "relative" }} onMouseMove={setCursorFromEvent} onMouseLeave={() => setCursor(null)}>
                <svg style={{ position: "absolute" }} width={width + "px"} height={height + "px"} viewBox={"0 0 " + width + " " + height}>
                    {children}
                </svg>
            </div>
        </ChartContext.Provider>
    )
};