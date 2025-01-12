/***************************************
 * 
 * REMOVED FILTER FUNCTIONALITY IN VERSION 1.8
 * 
***************************************/

import { useSelector } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
import BarGroup from "./BarGroup";
import './BarChart.css';
import { labels } from '../../../resources/labels';

let barHeight = 50;

const BarChart = (props) => {
    const { year } = props;
    const { monthOverview } = useSelector((state) => state.transaction);
    const navigate = useNavigate();

    const max = monthOverview.reduce((max, month) => Math.abs(month.net) > max ? Math.abs(month.net) : max, Math.abs(monthOverview[0].net));

    const navigateToMonthOverview = (index) => {
        navigate({
            pathname: '/monthOverview',
            search: createSearchParams({
                month: index,
                year: year
            }).toString()
        });
    }

    let barGroups = monthOverview.map((month, index) => <g key={index} transform={`translate(100, ${index * barHeight})`}>
        <BarGroup
            index={index}
            month={month}
            onBarClick={() => { navigateToMonthOverview(index) }}
            barHeight={barHeight}
            barWidth={max}
            barColour={month.net < 0 ? 'var(--lightred)': 'var(--green)'}
            textColour={month.net < 0 ? 'var(--lightred)': 'var(--green)'}
        />
    </g>);

    return (
        <svg className="chart">
            {max ? <g className='container'>{barGroups}</g> : <text id="noData" x={400 - (387.5 / 2)} y='300' fontSize={50} fill='var(--lightred)'>{labels.noData}</text>}
        </svg >
    );
}

export default BarChart;