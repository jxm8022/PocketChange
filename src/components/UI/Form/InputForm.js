import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Selector from '../Selector/Selector';
import { categories, labels } from '../../../resources/labels';
import { SELECTORTYPES } from '../../../resources/constants';
import './InputForm.css';

const currentDate = new Date();
const defaultDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;

const InputForm = (props) => {
    const { submitType, deleteTransaction, closeModal, transactionAction, defaults } = props;
    const transType = useRef();
    const transDate = useRef();
    const transName = useRef();
    const transAmount = useRef();
    const [selectedMonth, setSelectedMonth] = useState(defaultDate.split('-')[1] - 1);
    const [error, setError] = useState();
    const { transactionDictionary } = useSelector((state) => state.statistics);

    const dateChanged = (event) => {
        setSelectedMonth(transDate.current.value.split('-')[1] - 1);
    }

    const submitForm = (event) => {
        event.preventDefault();
        setError(false);

        if (event.target.id === 'delete') {
            const response = window.confirm(`Are you sure you want to delete this transaction?`);
            if (response) {
                transactionAction({
                    submitType: 'Delete'
                });
                closeModal();
            }
        } else {
            const type = transType.current.value;
            const date = transDate.current.value;
            const name = transName.current.value;
            const amount = +parseFloat(transAmount.current.value).toFixed(2);

            if (type && date && name && amount) {
                const typeComparison = categories[defaults.type].id === categories[type].id ? categories[type].type : `${categories[defaults.type].type} -> ${categories[type].type}`;
                const dateComparison = defaults.date === date ? date : `${defaults.date} -> ${date}`;
                const nameComparison = defaults.name === name ? name : `${defaults.name} -> ${name}`;
                const amountComparison = defaults.amount === amount ? amount : `${defaults.amount} -> ${amount}`;
                const response = window.confirm(`Do you want to update the following information?\nTransaction Type: ${typeComparison}\nTransaction Date: ${dateComparison}\nTransaction Name: ${nameComparison}\nTransaction Amount: $${amountComparison}`);
                if (response) {
                    transactionAction(
                        {
                            submitType,
                            transaction: {
                                type: parseInt(type),
                                date,
                                name: name.charAt(0).toUpperCase() + name.slice(1),
                                amount
                            }
                        }
                    );
                    transName.current.value = null;
                    transAmount.current.value = null;
                    if (submitType === 'Update')
                        closeModal();
                }
            } else {
                setError(true);
            }
        }
    }

    return (
        <form className='input-form' onSubmit={submitForm}>
            {deleteTransaction && <span id='delete' className='delete' onClick={submitForm}>&times;</span>}
            <Selector
                ref={transType}
                type={SELECTORTYPES.TYPE}
                defaultValue={defaults.type}
                selectedMonth={selectedMonth}
            />
            <label>{labels.date}
                <input
                    id='date'
                    ref={transDate}
                    type='date'
                    onChange={dateChanged}
                    defaultValue={defaults.date}
                ></input>
            </label>
            <label >{labels.transaction}
                <input
                    id='name'
                    ref={transName}
                    type='text'
                    defaultValue={defaults.name}
                    placeholder='Transaction Name'
                    style={{ width: '50%' }}
                    list='transactions'
                    name='transaction'
                    autoComplete='on'
                ></input>
                <datalist id='transactions'>
                    {transactionDictionary.map((trans, index) => <option key={index} value={trans} />)}
                </datalist>
            </label>
            <label>{labels.amount}
                <input
                    id='amount'
                    ref={transAmount}
                    type='number'
                    defaultValue={defaults.amount}
                    step='0.01'
                    placeholder='$0.00'
                    style={{ width: '25%' }}
                ></input>
            </label>
            <button type='submit'>
                {submitType} Transaction
            </button>
            {error && <p className='error'>Please input information!</p>}
        </form >
    );
}

export default InputForm;