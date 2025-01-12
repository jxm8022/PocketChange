import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../../actions/transactionActions";
import { months, labels } from "../../../resources/labels";
import { DATEFORMAT } from "../../../resources/constants";
import { addTransactionAPI } from "../../../api/TransactionAPI";
import { addTransaction } from "../../../actions/transactionActions";
import moment from 'moment/moment';
import './MonthSelector.css';

const MonthSelector = (props) => {
    const { userId, token } = useSelector((state) => state.user);
    const { recurringTransactions } = useSelector((state) => state.transaction);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const month = searchParams.get('month');
    const year = searchParams.get('year');

    const createTransaction = () => {
        navigate({
            pathname: '/monthOverview/addTransaction',
            search: createSearchParams({
                month: month,
                year: year
            }).toString()
        });
    }

    const addRecurring = () => {
        const response = window.confirm(`Do you want to add recurring transactions to ${months[month].month}?`);
        if (response) {
            for (let id in recurringTransactions) {
                let transaction = recurringTransactions[id];
                let dateString = `${parseInt(month)+1}/${1}/${year}`;
                let daysInMonth = moment(dateString, "MM-DD-YYYY").daysInMonth();
                let recurringDate = `${parseInt(month)+1}/${transaction.occurrenceValue && transaction.occurrenceValue < daysInMonth ? transaction.occurrenceValue : daysInMonth}/${year}`;
    
                let formData = {
                    type: transaction.type,
                    date: moment(recurringDate, "MM-DD-YYYY").format(DATEFORMAT).toString(),
                    name: transaction.name,
                    amount: transaction.amount,
                };
                
                addTransactionAPI(userId, formData, token).then((res) => {
                    if (res) {
                        dispatch(addTransaction({
                            ...formData,
                            id: res.name
                        }));
                    }
                });
            }
        }
    }

    const submitForm = (e) => {
        setSearchParams(`month=${e.target.value}&year=${year}`);
        dispatch(setDate({ month: parseInt(e.target.value) }));
    }

    return (
        <>
            <h2>{months[month].month} {year}</h2>
            <form onChange={submitForm}>
                <label>{labels.month}
                    <select className='selector' id='month' defaultValue={month}>
                        {months.map((month, index) => <option key={month.abb} value={index}>{month.abb}</option>)}
                    </select>
                </label>
            </form>
            <button className='transaction-btn' onClick={createTransaction}>{labels.addTransactionBtnLabel}</button>
            {/*<button className='transaction-btn' onClick={addRecurring}>{labels.addRecurringTransactionBtnLabel}</button> disabled for now*/}
        </>
    );
}

export default MonthSelector;