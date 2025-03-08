import BillDetails from "./Bills/BillDetails";
import SubscriptionDetails from "./Subscriptions/SubscriptionDetails";
import styled from "styled-components";

const RecurringPaymentDetails = () => {
    return (
        <SubscriptionsWrapper>
            <BillDetails />
            <SubscriptionDetails />
        </SubscriptionsWrapper>
    );
}

export default RecurringPaymentDetails;

const SubscriptionsWrapper = styled.div`
    /* mobile */

    /* tablets */
    @media only screen and (min-width: 600px) {}

    /* desktop */
    @media only screen and (min-width: 900px) {}

    @media (prefers-color-scheme: dark) {}

    @media (prefers-color-scheme: light) {}
`;