import { useState } from "react";
import { labels } from "../resources/labels";
import Loader from "../components/UI/Loader/Loader";
import Template from "../components/UI/Template/Template";
import useLoadSubscriptions from "../utilities/customHooks/useLoadSubscriptions";
import SubscriptionDetails from "../components/Subscriptions/SubscriptionDetails";

const Subscriptions = () => {
    const [isLoading, setIsLoading] = useState(false);

    useLoadSubscriptions(setIsLoading);

    return (
        <Template>
            <Loader isLoading={isLoading} />
            <h1>{labels.subscriptions}</h1>
            <SubscriptionDetails />
        </Template>
    );
}

export default Subscriptions;