import { labels } from "../../resources/labels";
import DebtOverview from "./DebtOverview/DebtOverview";
import DebtSummary from "./DebtSummary/DebtSummary";

const DebtBase = () => {
    return (
        <>
            <h1>{labels.debt}</h1>
            <DebtSummary />
            <DebtOverview />
        </>
    );
}

export default DebtBase;