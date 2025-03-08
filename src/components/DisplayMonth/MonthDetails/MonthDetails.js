import { useState } from 'react';
import { useAuth } from '../../Auth/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransactionAsync } from '../../../api/transactionAPI';
import { deleteTransaction } from '../../../actions/transactionActions';
import { labels, transactionCategories } from '../../../resources/labels';
import Loader from '../../UI/Loader/Loader';
import styled from "styled-components";

const MonthDetails = ({ accountDictionary }) => {
    const { user } = useAuth();
    const { filteredTransactions } = useSelector((state) => state.transaction);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const getTypeLabel = (typeId) => transactionCategories.find(c => c.id === typeId)?.type ?? 'No type found';

    const handleDeleteTransaction = async (transaction) => {
        const response = window.confirm(`Are you sure you want to delete?\nAccount: ${accountDictionary[transaction.accountId]}\nTransaction Type: ${transactionCategories[transaction.typeId].type}\nTransaction Date: ${transaction.date}\nTransaction Name: ${transaction.name}\nTransaction Amount: $${transaction.amount}`);
        if (response) {
            setIsLoading(true);
            try {
                await deleteTransactionAsync(user.uid, transaction);
                dispatch(deleteTransaction(transaction.id));
            }
            catch (ex) {
                console.log(ex.message)
            }
            finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <MonthDetailsWrapper>
            <Loader isLoading={isLoading} />
            <table className="table">
                <thead>
                    <tr>
                        {labels.transactionHeaders.map((header) => <th key={header}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.length > 0 ? filteredTransactions.map((t) => (
                        <tr key={t.id} onClick={() => { handleDeleteTransaction(t) }}>
                            <td>{accountDictionary[t.accountId]}</td>
                            <td>{getTypeLabel(t.typeId)}</td>
                            <td>{t.name}</td>
                            <td>${t.amount.toFixed(2)}</td>
                            <td>{t.date}</td>
                        </tr>
                    )) : <tr style={{ height: '48px' }}><td> </td><td> </td><td> </td><td> </td></tr>}
                </tbody>
            </table>
        </MonthDetailsWrapper>
    );
}

export default MonthDetails;

const MonthDetailsWrapper = styled.div`
    /* mobile */
    .table {
        border-collapse: collapse;
        margin: 20px 0px 40px 0px;
    }

    .table th,
    .table tr,
    .table td {
        padding: 5px 10px;
        font-size: .75em;
    }

    .table img {
        width: 15px;
        float: right;
    }

    .table tr:hover {
        background-color: rgba(156, 156, 156, 0.25);
    }

    /* tablets */
    @media only screen and (min-width: 600px) {

        .table th,
        .table tr,
        .table td {
            padding: 10px;
            font-size: .85em;
        }

        .table img {
            width: 25px;
        }
    }

    /* desktop */
    @media only screen and (min-width: 900px) {

        .table th,
        .table tr,
        .table td {
            padding: 10px;
            font-size: 1em;
        }

        .table img {
            width: 40px;
        }
    }

    @media (prefers-color-scheme: dark) {
        .table {
            color: var(--pink);
        }

        .table th {
            background-color: var(--pink);
            color: var(--teal);
        }

        .table th,
        .table tr,
        .table td {
            border: 1px solid var(--pink);
        }

        .alpha-asc {
            content: url("../../../assets/images/sorting/sortAscendingAlpha_light.png");
        }

        .numeric-asc {
            content: url("../../../assets/images/sorting/sortAscendingNumeric_light.png");
        }

        .alpha-desc {
            content: url("../../../assets/images/sorting/sortDescendingAlpha_light.png");
        }

        .numeric-desc {
            content: url("../../../assets/images/sorting/sortDescendingNumeric_light.png");
        }
    }

    @media (prefers-color-scheme: light) {
        .table {
            color: var(--teal);
        }

        .table th {
            background-color: var(--teal);
            color: var(--pink);
        }

        .table th,
        .table tr,
        .table td {
            border: 1px solid var(--teal);
        }

        .alpha-asc {
            content: url("../../../assets/images/sorting/sortAscendingAlpha_dark.png");
        }

        .numeric-asc {
            content: url("../../../assets/images/sorting/sortAscendingNumeric_dark.png");
        }

        .alpha-desc {
            content: url("../../../assets/images/sorting/sortDescendingAlpha_dark.png");
        }

        .numeric-desc {
            content: url("../../../assets/images/sorting/sortDescendingNumeric_dark.png");
        }
    }
`;