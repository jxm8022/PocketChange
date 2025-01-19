import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterTransactions } from "../../../actions/transactionActions";

const TransactionFilter = ({ accountDictionary, transactions }) => {
    const [accountFilterList, setAccountFilterList] = useState([]);
    const [accountFilter, setAccountFilter] = useState('none');
    const [searchInput, setSearchInput] = useState('');
    const dispatch = useDispatch();

    /* Build account list for dropdown account filter */
    useEffect(() => {
        let acntFilterList = [{ key: 'none', value: '-Account Filter-' }];
        for (let id of Object.keys(accountDictionary)) {
            acntFilterList.push({ key: id, value: accountDictionary[id] });
        }
        setAccountFilterList(acntFilterList);
    }, [accountDictionary]);

    /* Handler filtering */
    useEffect(() => {
        // 1. Filter by search
        let filteredTransactions = transactions.filter(t => t.name.toLowerCase().includes(searchInput.toLowerCase()));

        // 2. Filter by account
        if (accountFilter === 'none') {
            dispatch(filterTransactions(filteredTransactions));
        } else {
            dispatch(filterTransactions(filteredTransactions.filter(t => t.accountId === accountFilter)));
        }
        // eslint-disable-next-line
    }, [dispatch, searchInput, accountFilter]);

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    const handleAccountFilter = (e) => {
        setAccountFilter(e.target.value);
    }

    const clearFilters = () => {
        setSearchInput('');
        setAccountFilter('none');
        dispatch(filterTransactions(transactions));
    }

    return (
        <div>
            <input
                id='name'
                type='text'
                placeholder='Search transaction...'
                name='name'
                value={searchInput}
                onChange={handleSearchInput}
            ></input>
            <select onChange={handleAccountFilter} value={accountFilter}>
                {accountFilterList?.length > 0 && accountFilterList.map((account) => {
                    return <option key={account.key} value={account.key}>{account.value}</option>
                })}
            </select>
            <button onClick={clearFilters}>Clear</button>
        </div>
    );
}

export default TransactionFilter;