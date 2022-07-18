import { useChart } from "./Chart";

export default () => {
    const chart = useChart();

    let padX = 20;
    let padY = 20;
    let nOffset = 5;

    let labelXWidth = 50;
    let labelYWidth = 50;
    let labelHeight = 20;

    let labelXOffset = Math.max((chart?.cursor?.[0] || 0) - labelXWidth / 2, padX);
    let labelYOffset = Math.min((chart?.cursor?.[1] || 0) - labelHeight / 2, chart.height - padY - labelHeight);

    return (
        <>
            <g fill="#202022">
                <rect x="0%" y="0%" width={padX} height="100%" />
                <rect x="0%" y={chart.height - padY} width="100%" height={padY} />
            </g>

            {
                chart.cursor &&
                <g fill="#171719">
                    <rect x={labelXOffset} y={(chart.height - labelHeight - nOffset) + "px"} width={labelXWidth} height={labelHeight} />
                    <rect x={nOffset} y={labelYOffset} width={labelYWidth} height={labelHeight} />

                    <g fill="#fdfdff">
                        <text x={nOffset} y={labelYOffset + labelHeight / 1.5}>Cum</text>
                    </g>
                </g>
            }
        </>
    )
};