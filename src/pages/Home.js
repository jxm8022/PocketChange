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
import { useCallback, useState } from "react";
import Loader from "../components/UI/Loader/Loader";

const Home = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loadCount, setLoadingCount] = useState(0);

    const updateLoadingState = useCallback((isLoading) => {
        setLoadingCount((prev) => prev + (isLoading ? 1 : -1));
    }, [])

    useYearParam();
    const [accounts] = useLoadAccounts(updateLoadingState);
    const statistics = useLoadYearStatistics(updateLoadingState);

    const onYearChange = (event) => {
        dispatch(setDate({ year: parseInt(event.target.value) }));
        setSearchParams(`year=${event.target.value}`);
    }

    return (
        <Template paddingBottom={25}>
            <Loader isLoading={loadCount > 0} />
            <h1>{labels.home}</h1>
            <h2>Summary</h2>
            <Selector label={labels.year} value={searchParams.get('year')} onChange={onYearChange} />
            <AccountSummary accounts={accounts} />
            <NetSummary statistics={statistics} />
        </Template>
    );
}

export default Home;