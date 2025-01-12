import styled from "styled-components";
import moment from 'moment/moment';
import { DATEFORMAT } from "../../resources/constants";
import { labels, accountTypes } from "../../resources/labels";
import { useEffect, useRef, useState } from "react";
import { addAccountAPI } from "../../api/accountAPI";
import { useDispatch, useSelector } from "react-redux";
import { GetStringLength } from "../../utilities/FormatData";
import { addAccount } from "../../actions/accountActions";

const Accounts = () => {
    const dispatch = useDispatch();
    const { userId, token } = useSelector((state) => state.user);
    const { accounts } = useSelector((state) => state.accounts);

    const [mappedAccounts, setMappedAccounts] = useState([]);
    const [isDisplayModal, setIsDisplayModal] = useState(false);
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

    const transType = useRef();
    const transDate = useRef();
    const transName = useRef();
    const transAmount = useRef();

    const handleAddAccount = () => {
        setIsDisplayModal(true);
    }

    const handleCloseModal = () => {
        setIsDisplayModal(false);
    }

    const validForm = () => {
        if (GetStringLength(transName.current.value) === 0) {
            return false;
        }

        if (GetStringLength(transType.current.value) === 0) {
            return false;
        }

        if (GetStringLength(transDate.current.value) === 0) {
            return false;
        }

        if (GetStringLength(transAmount.current.value) === 0) {
            return false;
        }
        return true;
    }

    const submitForm = (event) => {
        event.preventDefault();
        setError(false);

        const payload = {
            name: transName.current.value,
            typeId: parseInt(transType.current.value),
            date: transDate.current.value,
            initialBalance: parseFloat(transAmount.current.value),
            currentBalance: parseFloat(transAmount.current.value),
        }

        if (!validForm()) {
            setError(true)
            return;
        }

        addAccountAPI(userId, payload, token).then(res => {
            dispatch(addAccount({ ...payload, id: res.name }));
            setIsDisplayModal(false);
        });
    }

    return (
        <AccountsWrapper>
            <table>
                <thead>
                    <tr>
                        <th colSpan={labels.accountsHeaders.length}>{labels.accountTableHeader}</th>
                    </tr>
                    <tr>
                        {labels.accountsHeaders.map((header) => <th key={header}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {mappedAccounts.length > 0 ? mappedAccounts.map((account) => (
                        <tr key={account.id}>
                            <td>{account.name}</td>
                            <td>{account.type}</td>
                            <td>{account.initialBalance}</td>
                            <td>{account.date}</td>
                        </tr>
                    )) : <tr style={{ height: '48px' }}><td> </td><td> </td><td> </td><td> </td></tr>}
                    <tr><td colSpan={labels.accountsHeaders.length} onClick={handleAddAccount}>{labels.addAccountButtonLabel}</td></tr>
                </tbody>
            </table>
            {isDisplayModal && <ModalWrapper>
                <div className='modal-background'></div>
                <div className='modal'>
                    <div className='modal-container'>
                        <span className='close' onClick={handleCloseModal}>&times;</span>
                        <div className='modal-header'>
                            <h2>{labels.addAccountTitle}</h2>
                        </div>
                        <div className='modal-body'>
                            <form className='transaction-input-form' onSubmit={submitForm} onFocus={() => { setError() }}>
                                <label>
                                    <p>{labels.accountType}</p>
                                    <select id='type' ref={transType} defaultValue={0}>
                                        {accountTypes.map((category, index) => {
                                            return <option key={category.id} value={index}>{category.type}</option>
                                        })
                                        }
                                    </select>
                                </label>
                                <label>
                                    <p>{labels.accountAccount}</p>
                                    <input
                                        id='name'
                                        ref={transName}
                                        type='text'
                                        placeholder='Account Name'
                                        list='transactions'
                                        name='transaction'
                                        autoComplete='on'
                                    ></input>
                                </label>
                                <label>
                                    <p>{labels.accountAmount}</p>
                                    <input
                                        id='amount'
                                        ref={transAmount}
                                        type='number'
                                        step='0.01'
                                        placeholder='$0.00'
                                        style={{ width: '25%' }}
                                    ></input>
                                </label>
                                <label>
                                    <p>{labels.accountDate}</p>
                                    <input
                                        id='date'
                                        ref={transDate}
                                        type='date'
                                        defaultValue={moment().format(DATEFORMAT).toString()}
                                    ></input>
                                </label>
                                <button type='submit'>
                                    {labels.addAccountButtonLabel}
                                </button>
                                {error && <p className='error'>Please input information!</p>}
                            </form >
                        </div>
                    </div>
                </div>
            </ModalWrapper>}
        </AccountsWrapper>
    );
}

export default Accounts;

const ModalWrapper = styled.div`
    /* mobile */
    .modal-background,
    .modal {
        position: fixed;
        z-index: 99999;
        left: 0;
        width: 100%;
        overflow: hidden;
        margin: auto;
    }

    .modal-background {
        top: 0;
        height: 100%;
        backdrop-filter: blur(5px);
    }

    .modal {
        top: 0;
        height: 100%;
    }

    .modal-container {
        background-color: var(--darkteal);
        height: 100%;
        width: 75%;
        margin: auto;
        padding: 0px 16px;
        text-align: left;
    }

    .modal-header {
        width: 60%;
        margin: auto;
        padding: 50px 0px;
    }

    .modal-header h2 {
        margin: 0;
        padding: 10px;
        text-align: center;
        background-color: var(--pink);
        color: var(--darkteal);
    }

    .close {
        color: var(--pink);
        float: right;
        font-size: 30px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: var(--darkpink);
        text-decoration: none;
        cursor: pointer;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
        .modal-container {
            width: 55%;
        }

        .modal-header {
            width: 45%;
        }
    }

    @media (prefers-color-scheme: dark) {
        .modal-container {
            border-left: 10px solid var(--pink);
            border-right: 10px solid var(--pink);
        }
    }

    @media (prefers-color-scheme: light) {
    }

    /* mobile */
    .transaction-input-form {
        margin: 10px 10px 40px 10px;
        padding: 20px;
        width: 90%;
    }

    .transaction-input-form label {
        padding: 10px;
        display: block;
        height: 60px;
    }

    .transaction-input-form p {
        margin: 10px 0px;
        padding: 0px 10px;
        float: left;
        font-weight: 600;
    }

    .transaction-input-form label select,
    .transaction-input-form label input {
        margin: 10px;
    }

    .transaction-input-form select, input {
        cursor: pointer;
        border: none;
        border-radius: 50px;
        margin: 10px 0px;
        padding: 0px 10px;
        font: inherit;
        font-size: .75em;
        outline: none;
    }

    .transaction-input-form button {
        float: right;
        cursor: pointer;
        border: none;
        border-radius: 50px;
        margin: 10px 0px;
        padding: 10px 20px;
        font: inherit;
    }

    #name {
        width: 42%;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
        .transaction-input-form {
            width: 60%;
        }
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
        .transaction-input-form {
            width: 75%;
        }

        #name {
            width: 50%;
        }
    }

    @media (prefers-color-scheme: dark) {
        .transaction-input-form select, input {
            border: 1px solid var(--pink);
            background-color: var(--teal);
            color: var(--pink);
        }

        .transaction-input-form button {
            background-color: var(--pink);
            color: var(--teal);
        }
    }

    @media (prefers-color-scheme: light) {
        .transaction-input-form select, input {
            border: 1px solid var(--teal);
            background-color: var(--pink);
            color: var(--teal);
        }

        .transaction-input-form button {
            background-color: var(--teal);
            color: var(--pink);
        }
    }
`;

const AccountsWrapper = styled.div`
    /* mobile */
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0px 20px 0px;
    }

    th,
    tr,
    td {
        padding: 5px;
        font-size: .75em;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
        {
            width: 80%;
        }

        th,
        tr,
        td {
            padding: 10px;
            font-size: .85em;
        }
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
        {
            width: 70%;
        }

        th,
        tr,
        td {
            padding: 10px;
            font-size: 1em;
        }

        tr:hover {
            background-color: rgba(156, 156, 156, 0.25);
        }
    }

    @media (prefers-color-scheme: dark) {
        table {
            color: var(--pink);
        }

        th {
            background-color: var(--pink);
            color: var(--teal);
        }

        th,
        tr,
        td {
            border: 1px solid var(--pink);
        }
    }

    @media (prefers-color-scheme: light) {
        table {
            color: var(--teal);
        }

        th {
            background-color: var(--teal);
            color: var(--pink);
        }

        th,
        tr,
        td {
            border: 1px solid var(--teal);
        }
    }
`;