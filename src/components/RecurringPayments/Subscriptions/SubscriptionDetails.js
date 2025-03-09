import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Auth/AuthContext";
import { DATEFORMAT } from "../../../resources/constants";
import { labels, occurences } from "../../../resources/labels";
import { addSubscriptionAsync, deleteSubscriptionAsync } from "../../../api/subscriptionsAPI";
import { addSubscription, deleteSubscription } from "../../../actions/subscriptionActions";
import { GetStringLength } from "../../../utilities/FormatData";
import moment from "moment";
import styled from "styled-components";
import Table from "../../Common/Table";
import Loader from "../../UI/Loader/Loader";
import Modal from "../../Common/Modal";
import Form from "../../Common/Form";

const SubscriptionDetails = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const { subscriptions } = useSelector((state) => state.recurringPayments);

    const [mappedSubscriptions, setMappedSubscriptions] = useState([]);
    const [isDisplayModal, setIsDisplayModal] = useState(false);
    const [occurence, setOccurence] = useState(0);
    const [subscription, setSubscription] = useState('');
    const [amount, setAmmount] = useState('');
    const [date, setDate] = useState(moment().format(DATEFORMAT).toString());
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setMappedSubscriptions(
            Object.keys(subscriptions).map((id) => {
                var subscription = { id, ...subscriptions[id] };
                subscription.occurence = occurences.find(at => at.id === subscription.occurenceId)?.value ?? 'Missing Type';
                return subscription;
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
        }
        catch (ex) {
            console.log(ex.message);
        }
    }

    const handleDelete = async (subscriptionId) => {
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
                onChange={(e) => setAmmount(e.target.value)}
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

    /* tablets */
    @media only screen and (min-width: 600px) {}

    /* desktop */
    @media only screen and (min-width: 900px) {}

    @media (prefers-color-scheme: dark) {}

    @media (prefers-color-scheme: light) {}
`;