import { useEffect, useState } from "react";
import { labels } from "../../resources/labels";
import styled from "styled-components";

const YearSummary = (props) => {
    const [bestNet, setBestNet] = useState(0);
    const [worstNet, setWorstNet] = useState(0);
    const [net, setNet] = useState(0);

    useEffect(() => {
        if (props.netGraphData) {
            setBestNet(props.netGraphData.reduce((res, val) => { return val > res ? val : res }, props.netGraphData[0]));
            setWorstNet(props.netGraphData.reduce((res, val) => { return val < res ? val : res }, props.netGraphData[0]));
            setNet(props.netGraphData.reduce((res, val) => { return res + val }, 0));
        }
    }, [props.netGraphData]);

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <YearSummaryWrapper>
            <ul className='overview'>
                <li>
                    <h4>{labels.bestNet}</h4>
                    <p className={textClass(bestNet)}>{`$${bestNet.toFixed(2)}`}</p>
                </li>
                <li className='middle'>
                    <h4>{labels.net}</h4>
                    <p className={textClass(net)}>{`$${net.toFixed(2)}`}</p>
                </li>
                <li>
                    <h4>{labels.worstNet}</h4>
                    <p className={textClass(worstNet)}>{`$${worstNet.toFixed(2)}`}</p>
                </li>
            </ul >
        </YearSummaryWrapper>
    );
}

export default YearSummary;

const YearSummaryWrapper = styled.div`
    /* mobile */
    .overview {
        margin: 10px 0px;
        width: 100%;
        padding: 0;
        text-align: center;
    }

    .overview ul {
        list-style-type: none;
    }

    .overview li {
        vertical-align: top;
        display: inline-block;
        text-align: center;
        width: 30%;
        padding: 0px 5px;
    }

    .overview h4 {
        margin: 0;
        font-size: .9em;
    }

    .overview p {
        margin: 10px 0px;
        font-size: 1em;
    }

    .middle {
        border-style: none solid;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
        .overview h4 {
            font-size: 1em;
        }

        .overview p {
            font-size: 1.5em;
        }
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
        .overview li {
            display: inline-block;
            text-align: center;
            padding: 0px 40px;
            width: 20%;
        }
    }
`;