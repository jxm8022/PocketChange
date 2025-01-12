import { labels } from "../../resources/labels";
import AnalyticsOverview from "./AnalyticsOverview/AnalyticsOverview";

const Analytics = () => {
    return (
        <>
            <h1>{labels.statistics}</h1>
            <AnalyticsOverview />
        </>
    );
}

export default Analytics;