import { useCallback } from 'react';
import { labels, transactionCategories } from '../../../resources/labels';
import { deleteTransactionAPI } from '../../../api/TransactionAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountMonthStatistics, patchAccountMonthStatistics } from '../../../api/statisticsAPI';
import { updateAccountAPI } from '../../../api/accountAPI';
import { CREDITACCOUNTTYPES, CREDITEXPENSETYPES, EXPENSETYPES } from '../../../resources/constants';
import { deleteTransaction } from '../../../actions/transactionActions';

const MonthDetails = ({ accountDictionary, accounts }) => {
    const { filteredTransactions } = useSelector((state) => state.transaction);
    const { userId, token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const getTypeLabel = (typeId) => transactionCategories.find(c => c.id === typeId)?.type ?? 'No type found';

    const memoizedIsCreditAccount = useCallback((accountId) => {
        return CREDITACCOUNTTYPES.includes(accounts[accountId]?.typeId);
    }, [accounts]);

    const isExpense = (isCreditAccountType, typeId) => isCreditAccountType ? CREDITEXPENSETYPES.includes(typeId) : EXPENSETYPES.includes(typeId);

    const handleDeleteTransaction = (transaction) => {
        const response = window.confirm(`Are you sure you want to delete?\nAccount: ${accountDictionary[transaction.accountId]}\nTransaction Type: ${transactionCategories[transaction.typeId].type}\nTransaction Date: ${transaction.date}\nTransaction Name: ${transaction.name}\nTransaction Amount: $${transaction.amount}`);
        if (response) {
            handleDelete(transaction);
        }
    }

    const handleDelete = async (transaction) => {
        deleteTransactionAPI(userId, transaction, token);
        dispatch(deleteTransaction(transaction));

        updateAccountBalance(transaction.accountId, transaction.amount, transaction.typeId);

        updateStatistics(transaction.accountId, transaction.date, transaction.typeId, transaction.amount);
    }

    const updateAccountBalance = (accountId, transactionAmount, transactionTypeId) => {
        const isCreditAccountType = memoizedIsCreditAccount(accountId);
        const isExpenseTransaction = isExpense(isCreditAccountType, transactionTypeId);
        let updatedAmount = isExpenseTransaction ? -transactionAmount : transactionAmount;
        updatedAmount = isCreditAccountType ? -updatedAmount : updatedAmount;
        let updatePayload = { currentBalance: accounts[accountId].currentBalance - updatedAmount };
        updateAccountAPI(userId, accountId, updatePayload, token);
    }

    const updateStatistics = async (accountId, transactionDate, transactionTypeId, transactionAmount) => {
        const year = transactionDate.substring(0, 4);
        const month = transactionDate.substring(5, 7);

        const patchPayload = await fetchAccountMonthStatistics(userId, accountId, year, month, token) ?? { income: 0, expenses: 0 };

        const isCreditAccountType = memoizedIsCreditAccount(accountId);
        if (isExpense(isCreditAccountType, transactionTypeId)) {
            patchPayload.expenses -= transactionAmount;
        } else {
            patchPayload.income -= transactionAmount;
        }

        patchAccountMonthStatistics(userId, accountId, year, month, patchPayload, token);
    }

    return (
        <>
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
        </>
    );
}

export default MonthDetails;