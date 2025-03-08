import { useSelector } from "react-redux";
import { labels } from "../../../resources/labels";
import "./AnalyticsOverview.css";

const AnalyticsOverview = () => {
    const { lifetimeNet } = useSelector(state => state.statistics);

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <>
            <ul className="analyticsOverview">
                <li>
                    <h3>{labels.lifetimeNet}</h3>
                    <p className={textClass(lifetimeNet)}>${lifetimeNet.toFixed(2)}</p>
                </li>
            </ul >
        </>
    );
}

export default AnalyticsOverview;