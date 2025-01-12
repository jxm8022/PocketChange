/***************************************
 * 
 * REMOVED FILTER FUNCTIONALITY IN VERSION 1.8
 * 
***************************************/

import { useRef, useState } from 'react';
import Selector from '../Selector/Selector';
import FilteredBy from './FilteredBy/FilteredBy';
import openedFilter from '../../../assets/images/sorting/solidFilter.png';
import closedFilter from '../../../assets/images/sorting/hollowFilter.png';
import { categories } from '../../../resources/labels';
import './Filter.css';

const currentDate = new Date();
const defaultDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;

const Filter = (props) => {
    const { nameOptions, filterTransactions, filters, setFilters, removeFilter, clearFilters, monthIndex } = props;
    const transType = useRef();
    const transDate = useRef();
    const transName = useRef();
    const transAmount = useRef();
    const [visibility, setVisibility] = useState(false);
    const [filterImage, setFilterImage] = useState(closedFilter);

    const showFilter = () => {
        if (visibility === false) {
            setFilterImage(openedFilter);
            setVisibility(true);
        }
        if (visibility === true) {
            setFilterImage(closedFilter);
            setVisibility(false);
        }
    }

    const typeFilter = (event) => {
        event.preventDefault();
        const typeIndex = parseInt(transType.current.value);
        setFilterImage(closedFilter);
        setVisibility(false);
        if (filters.find((filter) => filter.criteria === typeIndex)) {
        } else {
            const newFilters = [...filters, { id: filters.length, type: 'TYPE', criteria: typeIndex, name: categories[typeIndex].type }]
            setFilters(newFilters);
            filterTransactions({
                type: 'ADD',
                filters: newFilters
            });
        }
    }

    const dateFilter = (event) => {
        event.preventDefault();
        const date = transDate.current.value;
        setFilterImage(closedFilter);
        setVisibility(false);
        if (filters.find((filter) => filter.criteria === date)) {
        } else {
            const newFilters = [...filters, { id: filters.length, type: 'DATE', criteria: date, name: date }]
            setFilters(newFilters);
            filterTransactions({
                type: 'ADD',
                filters: newFilters
            });
        }
    }

    const nameFilter = (event) => {
        event.preventDefault();
        const name = transName.current.value.charAt(0).toUpperCase() + transName.current.value.slice(1);
        setFilterImage(closedFilter);
        setVisibility(false);
        if (filters.find((filter) => filter.criteria === name)) {
        } else {
            const newFilters = [...filters, { id: filters.length, type: 'NAME', criteria: name, name: name }]
            setFilters(newFilters);
            filterTransactions({
                type: 'ADD',
                filters: newFilters
            });
        }
    }

    const amountFilter = (event) => {
        event.preventDefault();
        const amount = parseFloat(transAmount.current.value).toFixed(2);
        setFilterImage(closedFilter);
        setVisibility(false);
        if (filters.find((filter) => filter.criteria === amount)) {
        } else {
            const newFilters = [...filters, { id: filters.length, type: 'AMOUNT', criteria: amount, name: `$${amount}` }]
            setFilters(newFilters);
            filterTransactions({
                type: 'ADD',
                filters: newFilters
            });
        }
    }

    const removeFilterX = (filterToRemove) => {
        const { id } = filterToRemove;
        const newFilters = [...filters].filter((filter) => filter.id !== id);
        setFilters(newFilters);
        removeFilter({
            type: 'REMOVE',
            filters: newFilters
        });
    }

    const clearAllFilters = () => {
        setFilterImage(closedFilter);
        setVisibility(false);
        setFilters([]);
        clearFilters({
            type: 'CLEAR'
        })
    }

    return (
        <>
            <div className="filter">
                {filters.map((filter) => <FilteredBy key={filter.id} filter={filter} removeFilterX={removeFilterX} />)}
                <div className='filtertooltip'>
                    <img src={filterImage} alt='Filter table' onClick={showFilter} />
                    {visibility && <span className='filtertooltiptext' style={{ visibility: visibility }}>
                        <form onSubmit={typeFilter}>
                            <Selector ref={transType} type='TYPE' selectedMonth={monthIndex} addApply={true} />
                        </form>
                        <form onSubmit={dateFilter}>
                            <label>Date
                                <input id='date' ref={transDate} type='date' defaultValue={defaultDate}></input>
                                <button type='submit'>Apply</button>
                            </label>
                        </form>
                        <form onSubmit={nameFilter}>
                            <label>Name
                                <input id='name' list='names' ref={transName} type='text' placeholder='Transaction Name' style={{ width: '50%' }}></input>
                                <datalist id='names'>
                                    {nameOptions.map((nameOption) => <option key={nameOption.id}>{nameOption.name}</option>)}
                                </datalist>
                                <button type='submit'>Apply</button>
                            </label>
                        </form>
                        <form onSubmit={amountFilter}>
                            <label>Amount
                                <input id='amount' ref={transAmount} type='number' step='0.01' placeholder='$0.00' style={{ width: '25%' }}></input>
                                <button type='submit'>Apply</button>
                            </label>
                        </form>
                        <button onClick={clearAllFilters}>Clear Filters</button>
                    </span>}
                </div>
            </div>
        </>
    );
}

export default Filter;