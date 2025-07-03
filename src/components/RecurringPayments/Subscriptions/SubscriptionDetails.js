import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Auth/AuthContext";
import { DATEFORMAT, LOCALSTRINGSETTINGS } from "../../../resources/constants";
import { labels, occurences } from "../../../resources/labels";
import { addSubscriptionAsync, deleteSubscriptionAsync } from "../../../api/subscriptionsAPI";
import { addSubscription, deleteSubscription } from "../../../actions/subscriptionActions";
import { GetStringLength } from "../../../utilities/FormatData";
import moment from "moment";
import styled from "styled-components";
import Table from "../../Common/Table";
import Loader from "../../Common/Loader";
import Modal from "../../Common/Modal";
import Form from "../../Common/Form";

const SubscriptionDetails = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const { subscriptions } = useSelector((state) => state.recurringPayments);

    const [monthlyCost, setMonthlyCost] = useState(0);
    const [yearlyCost, setYearlyCost] = useState(0);
    const [mappedSubscriptions, setMappedSubscriptions] = useState([]);
    const [isDisplayModal, setIsDisplayModal] = useState(false);
    const [occurence, setOccurence] = useState(0);
    const [subscription, setSubscription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(moment().format(DATEFORMAT).toString());
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setMonthlyCost(Object.values(subscriptions).reduce((prev, curr) => prev + (curr.occurenceId === 0 ? curr.amount : (curr.amount / 12)), 0));
        setYearlyCost(Object.values(subscriptions).reduce((prev, curr) => prev + (curr.occurenceId === 0 ? (curr.amount * 12) : curr.amount), 0));
        let mapped = Object.keys(subscriptions).map((id) => {
            var subscription = { id, ...subscriptions[id] };
            subscription.occurence = occurences.find(at => at.id === subscription.occurenceId)?.value ?? 'Missing Type';
            subscription.displayDate = subscription.occurenceId === 0 ? subscription.date.split('-')[2] : subscription.date.substring(5);
            subscription.displayAmount = `$${subscription.amount.toLocaleString("en-US", LOCALSTRINGSETTINGS)}`;
            return subscription;
        });

        setMappedSubscriptions(
            mapped.sort((a, b) => {
                if (a.occurenceId !== b.occurenceId) return a.occurenceId - b.occurenceId;
            }).sort((a, b) => {
                if (a.occurenceId === 0 && b.occurenceId === 0) {
                    return parseInt(a.displayDate) - parseInt(b.displayDate);
                }
            }).sort((a, b) => {
                 if (a.occurenceId === 1 && b.occurenceId === 1) {
                    const [, aMonth, aDay] = a.date.split('-').map(Number);
                    const [, bMonth, bDay] = b.date.split('-').map(Number);
                    return aMonth - bMonth || aDay - bDay;
                }
            })
        );
    }, [subscriptions]);

    const validateForm = () => {
        if (GetStringLength(subscription) === 0) {
            return false;
        }

        if (!(occurence in occurences)) {
            return false;
        }

        if (GetStringLength(amount) === 0) {
            return false;
        }

        if (GetStringLength(date) === 0) {
            return false;
        }
        return true;
    }

    const submitHandler = async () => {
        setError(false);

        const isValid = validateForm();

        if (!isValid) {
            setError('Invalid form input.');
            return;
        }

        const payload = {
            name: subscription,
            occurenceId: parseInt(occurence),
            amount: parseFloat(amount),
            date: date,
        }

        try {
            const subscriptionId = await addSubscriptionAsync(user.uid, payload);
            dispatch(addSubscription({ ...payload, id: subscriptionId }));
            setIsDisplayModal(false);
            clearInput();
        }
        catch (ex) {
            console.log(ex.message);
        }
    }

    const clearInput = () => {
        setOccurence(0);
        setSubscription('');
        setAmount('');
        setDate(moment().format(DATEFORMAT).toString());
    }

    const handleDelete = async (subscriptionId) => {
        const response = window.confirm(`Confirm deletion`);
        if (response) {
            setIsLoading(true);
            try {
                await deleteSubscriptionAsync(user.uid, subscriptionId);
                dispatch(deleteSubscription(subscriptionId));
            }
            catch (ex) {
                console.log(ex.message)
            }
            finally {
                setIsLoading(false);
            }
        }
    }

    const formDefs = [
        {
            label: labels.subscriptionOccurence,
            input: <select id='type' onChange={(e) => setOccurence(e.target.value)}>
                {occurences.map((occurence) => {
                    return <option key={occurence.id} value={occurence.id}>{occurence.value}</option>
                })}
            </select>
        },
        {
            label: labels.subscription,
            input: <input
                id='name'
                onChange={(e) => setSubscription(e.target.value)}
                type='text'
                placeholder='Subscription Name'
            ></input>
        },
        {
            label: labels.subscriptionAmount,
            input: <input
                id='amount'
                onChange={(e) => setAmount(e.target.value)}
                type='number'
                step='0.01'
                placeholder='$0.00'
            ></input>
        },
        {
            label: labels.subscriptionDate,
            input: <input
                id='date'
                onChange={(e) => setDate(e.target.value)}
                type='date'
                defaultValue={moment().format(DATEFORMAT).toString()}
            ></input>
        },
    ];

    return (
        <SubscriptionsWrapper>
            <Loader isLoading={isLoading} />
            <h2>{labels.subscriptions}</h2>
            <Table
                headerLabels={labels.subscriptionHeaders}
                data={mappedSubscriptions}
                addItemLabel={labels.addSubscriptionButtonLabel}
                setDisplayModal={setIsDisplayModal}
                handleDelete={handleDelete}
            />
            <p className="summary">${monthlyCost.toLocaleString("en-US", LOCALSTRINGSETTINGS)}/month - ${yearlyCost.toLocaleString("en-US", LOCALSTRINGSETTINGS)}/year</p>
            <Modal
                isDisplayModal={isDisplayModal}
                title={labels.addSubscriptionTitle}
                submitLabel={labels.addSubscriptionButtonLabel}
                setDisplayModal={setIsDisplayModal}
                submitHandler={submitHandler}
                error={error}
            >
                <Form
                    formDefs={formDefs}
                    setError={setError}
                />
            </Modal>
        </SubscriptionsWrapper>
    );
}

export default SubscriptionDetails;

const SubscriptionsWrapper = styled.div`
    /* mobile */
    h2 {
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