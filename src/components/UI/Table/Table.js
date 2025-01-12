import { useState } from 'react';
import { categories, occurrenceTypes } from '../../../resources/labels';
import Modal from '../Modal/Modal';
import './Table.css';

const Table = (props) => {
    const { headers, dataType, data, isSortAsc, sortColumn, sortTable, hideTable, tableTitle, deleteRow } = props;
    const [showModal, setShowModal] = useState();

    const getImage = (sortColumn) => {
        let sortType = '';
        let sortOrder = 'asc';
        switch(sortColumn) {
            case 'Type':
            case 'Name':
                sortType = 'alpha';
                break;
            case 'Amount':
            default:
                sortType = 'numeric';
                break;
        }
        if (!isSortAsc) {
            sortOrder = 'desc';
        }
        return <img className={sortType + '-' + sortOrder} alt={`Sorting ${sortOrder}`} />;;
    }

    const updateRow = (rowData) => {
        setShowModal(rowData);
    }

    const closeModal = () => {
        setShowModal(null);
    }

    let table;

    if (dataType === 'TRANSACTIONS') {
        table = <table className="table">
            <thead>
                <tr>
                    {headers.map((header) => <th key={header} onClick={() => sortTable(header)}>{header}{sortColumn === header && getImage(sortColumn)}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((item) => (
                    <tr key={item.id} onClick={() => updateRow(item)}>
                        <td>{categories[item.type].type}</td>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>${item.amount.toFixed(2)}</td>
                    </tr>
                )) : <tr style={{ height: '48px' }}><td> </td><td> </td><td> </td><td> </td></tr>}
            </tbody>
        </table>;
    }

    const textClass = (amount) => amount < 0 ? 'negative' : '';
    if (dataType === 'RATIOS') {
        table = <table className="table" onClick={hideTable}>
            <thead>
                <tr>
                    {headers.map((header) => <th key={header}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.type}</td>
                        <td>${item.available.toFixed(2)}</td>
                        <td className={textClass(item.remaining)}>${item.remaining.toFixed(2)}</td>
                    </tr>
                )) : <tr style={{ height: '48px' }}><td> </td><td> </td><td> </td></tr>}
            </tbody>
        </table>;
    }

    if (dataType === 'TOPTRANSACTIONS') {
        table = <table className="table">
            <thead>
                <tr>
                    {headers.map((header) => <th key={header}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.place}</td>
                        <td>{item.name}</td>
                        <td>{headers[headers.length - 1] === 'Times Visited' ? `${item.amount}` : `$${item.amount.toFixed(2)}`}</td>
                    </tr>
                )) : <tr style={{ height: '48px' }}><td> </td><td> </td><td> </td></tr>}
            </tbody>
        </table>;
    }

    if (dataType === 'RECURRING') {
        table = <table className="table">
            <thead>
                <tr>
                    {headers.map((header) => <th key={header}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((item) => (
                    <tr key={item.id} onClick={() => deleteRow(item)}>
                        <td>{categories[item.type].type}</td>
                        <td>{occurrenceTypes[item.occurrenceType].type}</td>
                        <td>{item.occurrenceValue ?? 'N/A'}</td>
                        <td>{item.name}</td>
                        <td>{`$${item.amount.toFixed(2)}`}</td>
                    </tr>
                )) : <tr style={{ height: '48px' }}><td> </td><td> </td><td> </td><td> </td><td> </td></tr>}
            </tbody>
        </table>;
    }

    if (dataType === 'DEBT') {
        table = <table className="table">
            <thead>
                <tr>
                    {headers.map((header) => <th key={header}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((item) => (
                    <tr key={item.id} onClick={() => deleteRow(item)}>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td>{`$${item.amount.toFixed(2)}`}</td>
                    </tr>
                )) : <tr style={{ height: '48px' }}>{headers.map((x) => <td key={x}> </td>)}</tr>}
            </tbody>
        </table>;
    }

    return (
        <>
            {showModal && <Modal data={showModal} closeModal={closeModal} />}
            {tableTitle && <h3>{tableTitle}</h3>}
            {table}
        </>
    );
}

export default Table;