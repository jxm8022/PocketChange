import { useAuth } from '../../Auth/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransactionAsync } from '../../../api/transactionAPI';
import { deleteTransaction } from '../../../actions/transactionActions';
import { labels, transactionCategories } from '../../../resources/labels';
import Loader from '../../UI/Loader/Loader';
import { useState } from 'react';

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
        <>
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
        </>
    );
}

export default MonthDetails;