import { useEffect, useState } from 'react';
import './PieChart.css';

const LegendPart = (props) => {
    const { type, size, color } = props.pie;
    return (
        <div className='legend-part'>
            <div className='legend-color' style={{ 'backgroundColor': color }} />
            <p>{isNaN(size) ? 0 : size}% - {type}</p>
        </div>
    );
}

const PieChart = (props) => {
    const [styleData, setStyleData] = useState([]);
    const [legendData, setLegendData] = useState([]);
    const [pieStyle, setPieStyle] = useState({ 'backgroundImage': 'conic-gradient(white 0% 100%)' });

    useEffect(() => {
        if (props && props.styleData && props.legendData) {
            setStyleData(props.styleData);
            setLegendData(props.legendData);
        } else {
            setStyleData(false);
            setLegendData(false);
            setPieStyle({ 'backgroundImage': 'conic-gradient(white 0% 100%)' });
        }
    }, [props])

    useEffect(() => {
        let gradientString = 'conic-gradient(';
        if (styleData) {
            for (let i = 0; i < styleData.length; i++) {
                if (i === styleData.length - 1) {
                    gradientString += `${styleData[i].color} ${styleData[i].start}% ${styleData[i].end}%)`;
                } else {
                    gradientString += `${styleData[i].color} ${styleData[i].start}% ${styleData[i].end}%,`;
                }
            }
            setPieStyle({ 'backgroundImage': `${gradientString}` });
        }
    }, [styleData])

    return (
        <>
            {styleData && legendData ? (<div className='basePiechart'>
                <div className="pie-chart" style={pieStyle}></div>
                <div className='legend'>
                    {legendData.map((pie) =>
                        <LegendPart key={pie.id} pie={pie} />
                    )}
                </div>
            </div>) : <></>}
        </>
    );
}

export default PieChart;