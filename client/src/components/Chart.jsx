import { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { findGrandTotal } from '../utils';

export default function Chart(props) {
    const { totals } = props
    const [activeIndex, setActiveIndex] = useState(-1)

    const data = Object.entries(totals).map(([key, value]) => ({
        name: key,
        amount: value
    }))

    const grandTotal = findGrandTotal(totals)

    const colors = [
        '#f5c9ff', 
        '#ed9eff', 
        '#de4bff',
        '#963491',
        '#421367',
        '#aec4ff', 
        '#7094ff', 
        '#315aff',
        '#2e346c',
        '#d57b7b',
        '#c23636',
        '#f41111',
        '#8e0e0e',
    ];

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <PieChart width={300} height={300}>
            <Pie
                activeIndex={activeIndex}
                data={data}
                dataKey="amount"
                outerRadius={140}
                fill="green"
                onMouseEnter={onPieEnter}
                style={{ cursor: 'pointer', outline: 'none' }} // Ensure no outline on focus
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Tooltip 
                formatter={(value, name, props) => {
                    const percent = ((value / grandTotal) * 100).toFixed(1);
                    return [`${percent}%`, props.payload.name];
                  }}
            />
        </PieChart>
    )
}