import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LOCALSTRINGSETTINGS } from "../../resources/constants";
import SubscriptionDetails from "./Subscriptions/SubscriptionDetails";
import BillDetails from "./Bills/BillDetails";
import styled from "styled-components";

const RecurringPaymentDetails = () => {
    const { bills, subscriptions } = useSelector((state) => state.recurringPayments);
    const [monthlyCost, setMonthlyCost] = useState(0);
    const [yearlyCost, setYearlyCost] = useState(0);

    useEffect(() => {
        let billMonthly = Object.values(bills).reduce((prev, curr) => prev + (curr.occurenceId === 0 ? curr.amount : (curr.amount / 12)), 0);
        let billYearly = Object.values(bills).reduce((prev, curr) => prev + (curr.occurenceId === 0 ? (curr.amount * 12) : curr.amount), 0);
        let subscriptionMonthly = Object.values(subscriptions).reduce((prev, curr) => prev + (curr.occurenceId === 0 ? curr.amount : (curr.amount / 12)), 0);
        let subscriptionYearly = Object.values(subscriptions).reduce((prev, curr) => prev + (curr.occurenceId === 0 ? (curr.amount * 12) : curr.amount), 0);
        setMonthlyCost(billMonthly + subscriptionMonthly);
        setYearlyCost(billYearly + subscriptionYearly);
    }, [bills, subscriptions]);

    return (
        <SubscriptionsWrapper>
            <h3>Overall</h3>
            <p className="summary">${monthlyCost.toLocaleString("en-US", LOCALSTRINGSETTINGS)}/month - ${yearlyCost.toLocaleString("en-US", LOCALSTRINGSETTINGS)}/year</p>
            <BillDetails />
            <SubscriptionDetails />
        </SubscriptionsWrapper>
    );
}

export default RecurringPaymentDetails;

const SubscriptionsWrapper = styled.div`
    /* mobile */
    h3 {
        text-align: center;
    }

    .summary {
        text-align: center;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {}

    /* desktop */
    @media only screen and (min-width: 900px) {}

    @media (prefers-color-scheme: dark) {}

    @media (prefers-color-scheme: light) {}
`;