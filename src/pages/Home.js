import { useCallback, useState } from "react";
import { labels } from "../resources/labels";
import Loader from "../components/UI/Loader/Loader";
import NetSummary from "../components/Summary/NetSummary";
import Selector from "../components/UI/Selector/Selector";
import Template from "../components/UI/Template/Template";
import AccountSummary from "../components/Summary/AccountSummary";
import useLoadAccounts from "../utilities/customHooks/useLoadAccounts";
import useDefaultSearchParams from "../utilities/customHooks/useDefaultSearchParams";
import useLoadYearStatistics from "../utilities/customHooks/useLoadYearStatistics";

const Home = () => {
    const [loadCount, setLoadingCount] = useState(0);

    const yearOptions = Array.from({ length: 11 }, (_, i) => {
        const year = new Date().getFullYear() - 10 + i + 1;
        return { id: year, value: year };
    });

    const updateLoadingState = useCallback((isLoading) => {
        setLoadingCount((prev) => prev + (isLoading ? 1 : -1));
    }, [])

    const { searchParams, updateParams } = useDefaultSearchParams(true);
    const [accounts] = useLoadAccounts(updateLoadingState);
    const statistics = useLoadYearStatistics(updateLoadingState);

    const onYearChange = (event) => {
        updateParams({ year: event.target.value });
    }

    return (
        <Template paddingBottom={25}>
            <Loader isLoading={loadCount > 0} />
            <h1>{labels.home}</h1>
            <h2>Summary</h2>
            <Selector
                label={labels.year}
                value={searchParams.get('year')}
                onChange={onYearChange}
                options={yearOptions} />
            <AccountSummary accounts={accounts} />
            <NetSummary statistics={statistics} />
        </Template>
    );
}

export default Home;