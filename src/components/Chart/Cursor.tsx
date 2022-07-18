import { useChart } from "./Chart";

export default () => {
    const { cursor } = useChart();

    if (cursor === null) {
        return null;
    }

    return (
        <>
            <g stroke="#333333" strokeDasharray="8, 3">
                <line x1={cursor[0]} y1="0%" x2={cursor[0]} y2="100%" />
                <line x1="0%" y1={cursor[1]} x2="100%" y2={cursor[1]} />
            </g>
        </>
    )
}
