import Template from "../components/UI/Template/Template";
import AccountSummary from "../components/Summary/AccountSummary";
import { labels } from "../resources/labels";
import { useDispatch } from "react-redux";
import { setDate } from "../actions/transactionActions";
import { useSearchParams } from "react-router-dom";
import useLoadAccounts from "../utilities/customHooks/useLoadAccounts";
import useYearParam from "../utilities/customHooks/useYearParam";
import useLoadYearStatistics from "../utilities/customHooks/useLoadYearStatistics";
import NetSummary from "../components/Summary/NetSummary";
import Selector from "../components/UI/Selector/Selector";

const Home = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useYearParam();
    const [accounts] = useLoadAccounts();
    const statistics = useLoadYearStatistics();

    const onYearChange = (event) => {
        dispatch(setDate({ year: parseInt(event.target.value) }));
        setSearchParams(`year=${event.target.value}`);
    }

    return (
        <Template paddingBottom={25}>
            <h1>{labels.home}</h1>
            <h2>Summary</h2>
            <Selector label={labels.year} value={searchParams.get('year')} onChange={onYearChange} />
            <AccountSummary accounts={accounts} />
            <NetSummary statistics={statistics} />
        </Template>
    );
}

export default Home;