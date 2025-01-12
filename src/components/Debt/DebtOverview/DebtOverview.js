import { useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDebtAPI } from "../../../api/debtAPI";
import { deleteDebt } from "../../../actions/debtActions";
import { TABLETYPES, TYPES } from "../../../resources/constants";
import { labels } from "../../../resources/labels";
import Table from "../../UI/Table/Table";
import './DebtOverview.css';

const DebtOverview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId, token } = useSelector((state) => state.user);
    const { debts } = useSelector((state) => state.debt);
    
    const addTransaction = () => {
        navigate({
            pathname: '/monthOverview/addTransaction',
            search: createSearchParams({
                type: TYPES.DEBT,
            }).toString()
        });
    }
    
    const deleteRow = (rowData) => {
        const response = window.confirm(`Are you sure you want to delete the debt?\nName: ${rowData.name}\nAmount: $${rowData.amount}`);
        if (response) {
            deleteDebtAPI(userId, rowData.id, token).then((res) => {
                dispatch(deleteDebt(rowData.id));
            });
        }
    }
    
    return (
        <>
            <Table
                tableTitle={labels.debtPurchasesTitle}
                dataType={TABLETYPES.DEBT}
                headers={labels.debtPurchasesHeaders}
                data={debts}
                deleteRow={deleteRow}
            />
            <button className="addDebtBtn" onClick={addTransaction}>{labels.addDebtPurchaseBtnLabel}</button>
        </>
    );
}

export default DebtOverview;