import { useAuth } from '../Auth/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CREDITACCOUNTTYPES, DATEFORMAT } from '../../resources/constants';
import { labels, transactionCategories } from '../../resources/labels';
import { FormatString, GetStringLength } from '../../utilities/FormatData';
import { addTransactionAsync } from '../../api/transactionAPI';
import { addDictionaryItem } from '../../actions/transactionActions';
import useLoadAccounts from '../../utilities/customHooks/useLoadAccounts';
import useLoadDictionary from '../../utilities/customHooks/useLoadDictionary';
import moment from 'moment/moment';
import styled from "styled-components";
import Loader from '../UI/Loader/Loader';
import Template from '../UI/Template/Template';

const AddTransaction = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [searchParams] = useSearchParams();

    const [isError, setIsError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loadCount, setLoadingCount] = useState(0);

    const updateLoadingState = useCallback((isLoading) => {
        setLoadingCount((prev) => prev + (isLoading ? 1 : -1));
    }, [])

    const [accounts, accountDictionary] = useLoadAccounts(updateLoadingState);
    const dictionary = useLoadDictionary(updateLoadingState);

    const accountRef = useRef();
    const categoryRef = useRef();
    const dateRef = useRef();
    const nameRef = useRef();
    const amountRef = useRef();

    const memoizedIsCreditAccount = useCallback((accountId) => {
        return CREDITACCOUNTTYPES.includes(accounts[accountId]?.typeId);
    }, [accounts]);

    useEffect(() => {
        var isCreditAccountType = memoizedIsCreditAccount(accountRef.current.value) ?? memoizedIsCreditAccount(Object.keys(accounts)[0]);
        setCategories(isCreditAccountType ? transactionCategories.filter(c => c.id !== 4) : transactionCategories);
    }, [accounts, memoizedIsCreditAccount]);

    const handleCategories = () => {
        var isCreditAccountType = memoizedIsCreditAccount(accountRef.current.value);
        setCategories(isCreditAccountType ? transactionCategories.filter(c => c.id !== 4) : transactionCategories);
    }

    const defaultDate = moment().month(parseInt(searchParams.get('month')) - 1)
        .startOf('month')
        .year(searchParams.get('year'))
        .format(DATEFORMAT).toString();

    const clearValues = () => {
        nameRef.current.value = '';
        amountRef.current.value = '';
    }

    const validForm = () => {
        if (GetStringLength(accountRef.current.value) === 0) {
            return false;
        }

        if (GetStringLength(categoryRef.current.value) === 0) {
            return false;
        }

        if (GetStringLength(dateRef.current.value) === 0) {
            return false;
        }

        if (GetStringLength(nameRef.current.value) === 0) {
            return false;
        }

        if (GetStringLength(amountRef.current.value) === 0) {
            return false;
        }

        return true;
    }

    const submitForm = async (event) => {
        event.preventDefault();
        setIsError(false);

        if (!validForm()) {
            setIsError(true);
            return;
        }

        const transaction = {
            accountId: accountRef.current.value,
            typeId: parseInt(categoryRef.current.value),
            date: moment(dateRef.current.value).format(DATEFORMAT).toString(),
            name: FormatString(nameRef.current.value),
            amount: parseFloat(amountRef.current.value),
        };

        const response = window.confirm(`Does the following information look correct?\nTransaction Type: ${transactionCategories[transaction.typeId].type}\nTransaction Date: ${transaction.date}\nTransaction Name: ${transaction.name}\nTransaction Amount: $${transaction.amount}`);
        if (response) {
            updateLoadingState(true);
            try {
                await addTransactionAsync(user.uid, transaction);
                dispatch(addDictionaryItem({ [transaction.name]: transaction.name }));
            }
            catch (ex) {
                console.log(ex.message)
            }
            finally {
                updateLoadingState(false);
                clearValues();
            }
        }
    }

    return (
        <Template>
            <TransactionWrapper>
                <Loader isLoading={loadCount > 0} />
                <h1>{labels.addTransactionTitle}</h1>
                <form className='transaction-input-form' onSubmit={submitForm} onFocus={() => { setIsError(false) }}>
                    <label>
                        <p>{labels.transactionAccount}</p>
                        <select id='account' ref={accountRef} onChange={handleCategories}>
                            {Object.keys(accountDictionary).map((id) => {
                                return <option key={id} value={id}>{accountDictionary[id]}</option>
                            })
                            }
                        </select>
                    </label>
                    <label>
                        <p>{labels.transactionType}</p>
                        <select id='type' ref={categoryRef}>
                            {categories?.length > 0 && categories.map((category) => {
                                return <option key={category.id} value={category.id}>{category.type}</option>
                            })}
                        </select>
                    </label>
                    <label>
                        <p>{labels.transactionDate}</p>
                        <input
                            id='date'
                            ref={dateRef}
                            type='date'
                            defaultValue={defaultDate}
                        ></input>
                    </label>
                    <label>
                        <p>{labels.transactionTransaction}</p>
                        <input
                            id='name'
                            ref={nameRef}
                            type='text'
                            placeholder='Name'
                            list='transactions'
                            name='name'
                            autoComplete='on'
                        ></input>
                        <datalist id='transactions'>
                            {Object.keys(dictionary).map((key) => <option key={key} value={dictionary[key]} />)}
                        </datalist>
                    </label>
                    <label>
                        <p>{labels.transactionAmount}</p>
                        <input
                            id='amount'
                            ref={amountRef}
                            type='number'
                            step='0.01'
                            placeholder='$0.00'
                            style={{ width: '25%' }}
                        ></input>
                    </label>
                    <button type='submit'>
                        {labels.addTransactionBtnLabel}
                    </button>
                    {isError && <p className='error'>Please input information!</p>}
                </form >
            </TransactionWrapper>
        </Template>
    );
}

export default AddTransaction;

const TransactionWrapper = styled.div`
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

    /* tablets */
    @media only screen and (min-width: 600px) {
        .transaction-input-form {
            width: 85%;
        }
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
        .transaction-input-form {
            width: 100%;
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