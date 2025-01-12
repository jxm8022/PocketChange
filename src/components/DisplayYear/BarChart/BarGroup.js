/***************************************
 * 
 * REMOVED FILTER FUNCTIONALITY IN VERSION 1.8
 * 
***************************************/

import { months } from '../../../resources/labels';
import './BarGroup.css';

const BarGroup = (props) => {
    const { net } = props.month;
    const { index, onBarClick, barColour, textColour } = props;

    let barPadding = 10;

    let widthScale = net => net * (595 / props.barWidth);
    let width = widthScale(Math.abs(net));

    let yMid = props.barHeight * 0.5;

    return (
        <g className="bar-group">
            <text className="name-label" x="-25" y={yMid} alignmentBaseline="middle" >{months[index].abb}</text>
            <rect onClick={onBarClick} y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
            <text className="value-label" x={700} y={yMid} alignmentBaseline="middle" fill={textColour} >${net.toFixed(0)}</text>
        </g>
    );
}

export default BarGroup;