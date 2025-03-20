import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { months, labels } from "../../resources/labels";
import useDefaultSearchParams from "../../utilities/customHooks/useDefaultSearchParams";
import Selector from "../Common/Selector";
import styled from "styled-components";

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
        navigate(`/transactions/addTransaction?${searchParams.toString()}`);
    }

    const onMonthChange = (e) => {
        const monthValue = parseInt(e.target.value) + 1;
        updateParams({ month: monthValue.toString().padStart(2, "0") });
    }

    return (
        <MonthSelectorWrapper>
            <h2>{months[month].month} {year}</h2>
            <Selector
                label={labels.month}
                value={month}
                onChange={onMonthChange}
                options={months} />
            <button className='transaction-btn' onClick={createTransaction}>{labels.addTransactionBtnLabel}</button>
        </MonthSelectorWrapper>
    );
}

export default MonthSelector;

const MonthSelectorWrapper = styled.div`
    text-align: center;

    .transaction-btn {
        cursor: pointer;
        border: none;
        border-radius: 50px;
        margin: 10px 0px;
        padding: 10px 20px;
        font: inherit;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {}

    /* desktop */
    @media only screen and (min-width: 900px) {}

    @media (prefers-color-scheme: dark) {
        .selector {
            border: 1px solid var(--pink);
            background-color: var(--teal);
            color: var(--pink);
        }
        
        .transaction-btn {
            background-color: var(--pink);
            color: var(--teal);
        }
    }

    @media (prefers-color-scheme: light) {
        .selector {
            border: 1px solid var(--teal);
            background-color: var(--pink);
            color: var(--teal);
        }
        
        .transaction-btn {
            background-color: var(--teal);
            color: var(--pink);
        }
    }
`;