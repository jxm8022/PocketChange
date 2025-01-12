import { useNavigate, createSearchParams } from "react-router-dom";
import { TABLETYPES, TYPES } from "../../../resources/constants";
import { labels } from "../../../resources/labels";
import Table from "../../UI/Table/Table";
import './RecurringTransactions.css';
import { useDispatch, useSelector } from "react-redux";
import { deleteRecurringTransaction } from "../../../actions/transactionActions";
import { deleteRecurringTransactionAPI } from '../../../api/recurringTransactionsAPI';

const RecurringTransactions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { recurringTransactions } = useSelector((state) => state.transaction);
    const { userId, token } = useSelector((state) => state.user);

    const addTransaction = () => {
        navigate({
            pathname: '/monthOverview/addTransaction',
            search: createSearchParams({
                type: TYPES.RECURRING,
            }).toString()
        });
    }
    
    const deleteRow = (rowData) => {
        const response = window.confirm(`Are you sure you want to delete the transaction?\nName: ${rowData.name}\nAmount: $${rowData.amount}`);
        if (response) {
            deleteRecurringTransactionAPI(userId, rowData.id, token).then((res) => {
                dispatch(deleteRecurringTransaction(rowData.id));
            });
        }
    }

    return (
        <>
            <Table
                tableTitle={labels.recurringTransactionsTitle}
                dataType={TABLETYPES.RECURRING}
                headers={labels.recurringTransactionsHeaders}
                data={recurringTransactions}
                deleteRow={deleteRow}
            />
            <button className="addRecurringBtn" onClick={addTransaction}>{labels.addRecurringTransactionBtnLabel}</button>
        </>
    );
}

export default RecurringTransactions;