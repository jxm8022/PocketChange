import React, { useEffect, useState } from "react";
import { labels, months } from '../../../resources/labels';
import { useDispatch, useSelector } from 'react-redux';
import { categories } from "../../../resources/labels";
import { setDate } from "../../../actions/transactionActions";
import { TYPES } from "../../../resources/constants";
import styled from "styled-components";

const currentDate = new Date();
const currentMonth = currentDate.getMonth();

const TypeSelector = React.forwardRef((props, ref) => {
    const { defaultValue, selectedMonth, addApply } = props;
    let filteredOptions = [...categories].filter((category) => category.id !== TYPES.RECURRING);

    if (currentMonth !== selectedMonth) {
        filteredOptions = filteredOptions.filter((category) => category.id !== TYPES.PINCOME && category.id !== TYPES.PTRANSACTION);
    }

    return (
        <label>{labels.type}
            <select id='type' defaultValue={defaultValue} ref={ref}>
                {filteredOptions.map((category, index) => <option key={category.id} value={index}>{category.type}</option>)}
            </select>
            {addApply && <button type='submit'>{labels.apply}</button>}
        </label>
    );
})

const MonthSelector = (props) => {
    const { prevMonth, prevYear, setSearchParams } = props.setSearchParams;
    const { startYear, currentYear } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    let activeYears = [];
    for (let i = startYear; i <= currentYear; i++) { activeYears.push(i) };

    const setParameters = (event) => {
        switch (event.target.id) {
            case 'month':
                setSearchParams(`month=${event.target.value}&year=${prevYear}`);
                dispatch(setDate({ month: parseInt(event.target.value) }));
                break;
            case 'year':
                setSearchParams(`month=${prevMonth}&year=${event.target.value}`);
                dispatch(setDate({ year: parseInt(event.target.value) }));
                break;
            default:
                break;
        }
    }

    return (
        <form className='month-input-form' onChange={setParameters}>
            <label>{labels.month}
                <select id='month' defaultValue={prevMonth}>
                    {months.map((month, index) => <option key={month.abb} value={index}>{month.abb}</option>)}
                </select>
            </label>
            <label>{labels.year}
                <select id='year' defaultValue={prevYear}>
                    {activeYears.map((year, index) => <option key={index} value={year}>{year}</option>)}
                </select>
            </label>
        </form>
    )
}

const YearSelector = (props) => {
    const dataYear = useSelector((state) => state.transaction.currentYear);
    const { activeYears } = useSelector((state) => state.statistics);

    return (
        <form className='year-input-form'>
            <label>{labels.year}
                <select id='type' value={dataYear} onChange={props.onYearChange}>
                    {activeYears.map((year, index) => <option key={index} value={year}>{year}</option>)}
                </select>
            </label>
        </form>
    )
}

// props = { type , currentMonth, currentYear, onMonthChange, onYearChange}
const SelectorV1 = React.forwardRef((props, ref) => {
    let selector;

    switch (props.type) {
        case 'TYPE':
            selector = <TypeSelector ref={ref} defaultValue={props.defaultValue} selectedMonth={props.selectedMonth} addApply={props.addApply} />;
            break;
        case 'MONTH':
            selector = <MonthSelector setSearchParams={props.setSearchParams} />;
            break;
        case 'YEAR':
            selector = <YearSelector onYearChange={props.onYearChange} />
            break;
        default:
            selector = <p style={{ color: 'red' }}>{labels.error}</p>;
    }

    return (
        <> 
            {selector}
        </>
    );
})

const Selector = (props) => {
    const { currentYear } = useSelector((state) => state.user);
    var years = props.options ?? Array.from({ length: 11 }, (_, i) => currentYear - 10 + i + 1);
    var value = props.value ?? currentYear;
    return (
        <SelectorWrapper>
            <form>
                <label>{props.label}
                    <select value={value} onChange={props.onChange}>
                        {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                    </select>
                </label>
            </form>
        </SelectorWrapper>
    );
}

export default Selector;

const SelectorWrapper = styled.div`
    select {
        cursor: pointer;
        border: none;
        border: 1px solid var(--teal);
        border-radius: 50px;
        margin: 10px;
        padding: 0px 10px;
        background-color: var(--pink);
        font: inherit;
        font-size: .75em;
        color: var(--teal);
        outline: none;
    }
`;