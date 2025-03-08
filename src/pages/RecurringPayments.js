import { useCallback, useState } from "react";
import { labels } from "../resources/labels";
import Loader from "../components/UI/Loader/Loader";
import Template from "../components/UI/Template/Template";
import useLoadSubscriptions from "../utilities/customHooks/useLoadSubscriptions";
import RecurringPaymentDetails from "../components/RecurringPayments/RecurringPaymentDetails";
import useLoadBills from "../utilities/customHooks/useLoadBills";

const Subscriptions = () => {
    const [loadCount, setLoadingCount] = useState(0);

    const updateLoadingState = useCallback((isLoading) => {
        setLoadingCount((prev) => prev + (isLoading ? 1 : -1));
    }, []);

    useLoadBills(updateLoadingState);
    useLoadSubscriptions(updateLoadingState);

    return (
        <Template>
            <Loader isLoading={loadCount > 0} />
            <h1>{labels.recurringPayments}</h1>
            <RecurringPaymentDetails />
        </Template>
    );
}

export default Subscriptions;