import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { labels } from '../../../resources/labels';
import styled from "styled-components";

const MonthOverview = () => {
    const [searchParams] = useSearchParams();
    const { potNet, projNet, net } = useSelector((state) => state.transaction.monthOverview[searchParams.get('month')]);

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <MonthOverviewWrapper>
            <ul className='overview'>
                <li>
                    <h4>{labels.potentialNet}</h4>
                    <p className={textClass(potNet)}>{'$' + potNet.toFixed(2)}</p>
                </li>
                <li className='middle'>
                    <h4>{labels.net}</h4>
                    <p className={textClass(net)}>{'$' + net.toFixed(2)}</p>
                </li>
                <li>
                    <h4>{labels.projectedNet}</h4>
                    <p className={textClass(projNet)}>{'$' + projNet.toFixed(2)}</p>
                </li>
            </ul >
        </MonthOverviewWrapper>
    );
}

export default MonthOverview;

const MonthOverviewWrapper = styled.div`
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