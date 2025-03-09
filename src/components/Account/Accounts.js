import styled from "styled-components";
import moment from 'moment/moment';
import { DATEFORMAT } from "../../resources/constants";
import { labels, accountTypes } from "../../resources/labels";
import { useEffect, useState } from "react";
import { addAccountAsync } from "../../api/accountAPI";
import { useDispatch, useSelector } from "react-redux";
import { GetStringLength } from "../../utilities/FormatData";
import { addAccount } from "../../actions/accountActions";
import { useAuth } from "../Auth/AuthContext";
import Table from "../Common/Table";
import Modal from "../Common/Modal";
import Form from "../Common/Form";

const Accounts = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const { accounts } = useSelector((state) => state.accounts);

    const [mappedAccounts, setMappedAccounts] = useState([]);
    const [isDisplayModal, setIsDisplayModal] = useState(false);
    const [type, setType] = useState(0);
    const [account, setAccount] = useState('');
    const [amount, setAmmount] = useState('');
    const [date, setDate] = useState(moment().format(DATEFORMAT).toString());
    const [error, setError] = useState(false);

    /* Build account array */
    useEffect(() => {
        setMappedAccounts(
            Object.keys(accounts).map((id) => {
                var account = { id, ...accounts[id] };
                account.type = accountTypes.find(at => at.id === account.typeId)?.type ?? 'Missing Type';
                return account;
            })
        )
    }, [accounts]);

    const validForm = () => {
        if (GetStringLength(account) === 0) {
            return false;
        }

        if (!(type in accountTypes)) {
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

        const payload = {
            name: account,
            typeId: parseInt(type),
            date: date,
            initialBalance: parseFloat(amount),
            currentBalance: parseFloat(amount),
        }

        if (!validForm()) {
            setError('Invalid form input.')
            return;
        }

        try {
            const accountId = await addAccountAsync(user.uid, payload);
            dispatch(addAccount({ ...payload, id: accountId }));
            setIsDisplayModal(false);
        }
        catch (ex) {
            console.log(ex.message)
        }
    }

    const formDefs = [
        {
            label: labels.accountType,
            input: <select id='type' onChange={(e) => setType(e.target.value)}>
                {accountTypes.map((category, index) => {
                    return <option key={category.id} value={index}>{category.type}</option>
                })}
            </select>
        },
        {
            label: labels.accountAccount,
            input: <input
                id='name'
                onChange={(e) => setAccount(e.target.value)}
                type='text'
                placeholder='Account Name'
            ></input>
        },
        {
            label: labels.accountAmount,
            input: <input
                id='amount'
                onChange={(e) => setAmmount(e.target.value)}
                type='number'
                step='0.01'
                placeholder='$0.00'
            ></input>
        },
        {
            label: labels.accountDate,
            input: <input
                id='date'
                onChange={(e) => setDate(e.target.value)}
                type='date'
                defaultValue={moment().format(DATEFORMAT).toString()}
            ></input>
        },
    ];

    return (
        <AccountsWrapper>
            <Table
                headerLabels={labels.accountsHeaders}
                data={mappedAccounts}
                addItemLabel={labels.addAccountButtonLabel}
                setDisplayModal={setIsDisplayModal}
            />
            <Modal
                isDisplayModal={isDisplayModal}
                title={labels.addAccountTitle}
                submitLabel={labels.addAccountButtonLabel}
                setDisplayModal={setIsDisplayModal}
                submitHandler={submitHandler}
                error={error}
            >
                <Form
                    formDefs={formDefs}
                    setError={setError}
                />
            </Modal>
        </AccountsWrapper>
    );
}

export default Accounts;

const AccountsWrapper = styled.div`
    /* mobile */

    /* tablets */
    @media only screen and (min-width: 600px) {}

    /* desktop */
    @media only screen and (min-width: 900px) {}

    @media (prefers-color-scheme: dark) {}

    @media (prefers-color-scheme: light) {}
`;