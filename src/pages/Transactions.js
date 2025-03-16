import { useCallback, useState } from "react";
import { labels } from "../resources/labels";
import Loader from "../components/Common/Loader";
import Template from "../components/Common/Template";
import MonthSelector from "../components/Transaction/MonthSelector";
import useLoadAccounts from "../utilities/customHooks/useLoadAccounts";
import TransactionFilter from "../components/Transaction/TransactionFilter";
import TransactionDetails from "../components/Transaction/TransactionDetails";
import useLoadTransactions from "../utilities/customHooks/useLoadTransactions";
import useDefaultSearchParams from "../utilities/customHooks/useDefaultSearchParams";

const Transactions = () => {
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
            <TransactionDetails accountDictionary={accountDictionary} accounts={accounts} />
            <a href='#top' className="scroll-top">{labels.top}</a>
        </Template>
    );
}

export default Transactions;