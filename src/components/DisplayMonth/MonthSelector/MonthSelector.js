import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { months, labels } from "../../../resources/labels";
import useDefaultSearchParams from "../../../utilities/customHooks/useDefaultSearchParams";
import './MonthSelector.css';

const MonthSelector = (props) => {
    const navigate = useNavigate();
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const { searchParams, updateParams } = useDefaultSearchParams();

    useEffect(() => {
        if (searchParams.size > 0) {
            setMonth(parseInt(searchParams.get('month')) - 1);
            setYear(searchParams.get('year'));
        }
    }, [searchParams]);

    const createTransaction = () => {
        navigate(`/monthOverview/addTransaction?${searchParams.toString()}`);
    }

    const onMonthChange = (e) => {
        const monthValue = parseInt(e.target.value) + 1;
        updateParams({ month: monthValue.toString().padStart(2, "0") });
    }

    return (
        <>
            <h2>{months[month].month} {year}</h2>
            <form>
                <label>{labels.month}
                    <select className='selector' id='month' onChange={onMonthChange} value={month}>
                        {months.map((month, index) => <option key={month.abb} value={index}>{month.abb}</option>)}
                    </select>
                </label>
            </form>
            <button className='transaction-btn' onClick={createTransaction}>{labels.addTransactionBtnLabel}</button>
        </>
    );
}

export default MonthSelector;