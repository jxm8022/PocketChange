import { useCallback, useState } from "react";
import { labels } from "../resources/labels";
import MonthDetails from "../components/DisplayMonth/MonthDetails/MonthDetails";
import MonthSelector from "../components/DisplayMonth/MonthSelector/MonthSelector";
import Template from "../components/UI/Template/Template";
import TransactionFilter from "../components/DisplayMonth/TransactionFilter/TransactionFilter";
import useLoadAccounts from "../utilities/customHooks/useLoadAccounts";
import useLoadTransactions from "../utilities/customHooks/useLoadTransactions";
import Loader from "../components/UI/Loader/Loader";
import useDefaultSearchParams from "../utilities/customHooks/useDefaultSearchParams";

const MonthOverview = () => {
    const [loadCount, setLoadingCount] = useState(0);

    const updateLoadingState = useCallback((isLoading) => {
        setLoadingCount((prev) => prev + (isLoading ? 1 : -1));
    }, [])

    useDefaultSearchParams(true, true);
    const [accounts, accountDictionary] = useLoadAccounts(updateLoadingState);
    const transactions = useLoadTransactions(updateLoadingState);

    return (
        <Template>
            <Loader isLoading={loadCount > 0} />
            <h1>{labels.transactions}</h1>
            <MonthSelector />
            <TransactionFilter accountDictionary={accountDictionary} transactions={transactions} />
            <MonthDetails accountDictionary={accountDictionary} accounts={accounts} />
            <a href='#top' className="scroll-top">{labels.top}</a>
        </Template>
    );
}

export default MonthOverview;