import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Auth/AuthContext";
import { DATEFORMAT } from "../../../resources/constants";
import { labels, occurences } from "../../../resources/labels";
import { GetStringLength } from "../../../utilities/FormatData";
import { addBill, deleteBill } from "../../../actions/billActions";
import { addBillAsync, deleteBillAsync } from "../../../api/billsAPI";
import moment from "moment";
import styled from "styled-components";
import Table from "../../Common/Table";
import Loader from "../../UI/Loader/Loader";

const BillDetails = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const { bills } = useSelector((state) => state.recurringPayments);

    const [mappedBills, setMappedBills] = useState([]);
    const [isDisplayModal, setIsDisplayModal] = useState(false);
    const [occurence, setOccurence] = useState(0);
    const [bill, setBill] = useState('');
    const [amount, setAmmount] = useState('');
    const [date, setDate] = useState(moment().format(DATEFORMAT).toString());
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setMappedBills(
            Object.keys(bills).map((id) => {
                var bill = { id, ...bills[id] };
                bill.occurence = occurences.find(at => at.id === bill.occurenceId)?.value ?? 'Missing Type';
                return bill;
            })
        );
    }, [bills]);

    const validateForm = () => {
        if (GetStringLength(bill) === 0) {
            return false;
        }

        if (!(occurence in occurences)) {
            return false;
        }

        if (GetStringLength(amount) === 0) {
            return false;
        }

        if (GetStringLength(date) === 0) {
            return false;
        }
        return true;
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setError(false);

        const isValid = validateForm();

        if (!isValid) {
            setError(true);
            return;
        }

        const payload = {
            name: bill,
            occurenceId: parseInt(occurence),
            amount: parseFloat(amount),
            date: date,
        }

        try {
            const billId = await addBillAsync(user.uid, payload);
            dispatch(addBill({ ...payload, id: billId }));
            setIsDisplayModal(false);
        }
        catch (ex) {
            console.log(ex.message);
        }
    }

    const handleDelete = async (billId) => {
        setIsLoading(true);
        try {
            await deleteBillAsync(user.uid, billId);
            dispatch(deleteBill(billId));
        }
        catch (ex) {
            console.log(ex.message)
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <BillsWrapper>
            <Loader isLoading={isLoading} />
            <h2>{labels.bills}</h2>
            <Table
                headerLabels={labels.billHeaders}
                data={mappedBills}
                addItemLabel={labels.addBillButtonLabel}
                setDisplayModal={setIsDisplayModal}
                handleDelete={handleDelete}
            />
            {isDisplayModal && <ModalWrapper>
                <div className='modal-background'></div>
                <div className='modal'>
                    <div className='modal-container'>
                        <span className='close' onClick={() => setIsDisplayModal(false)}>&times;</span>
                        <div className='modal-header'>
                            <h2>{labels.addAccountTitle}</h2>
                        </div>
                        <div className='modal-body'>
                            <form className='transaction-input-form' onSubmit={submitForm} onFocus={() => { setError() }}>
                                <label>
                                    <p>{labels.billOccurence}</p>
                                    <select id='type' onChange={(e) => setOccurence(e.target.value)}>
                                        {occurences.map((occurence) => {
                                            return <option key={occurence.id} value={occurence.id}>{occurence.value}</option>
                                        })
                                        }
                                    </select>
                                </label>
                                <label>
                                    <p>{labels.bill}</p>
                                    <input
                                        id='name'
                                        onChange={(e) => setBill(e.target.value)}
                                        type='text'
                                        placeholder='Account Name'
                                        list='transactions'
                                        name='transaction'
                                        autoComplete='on'
                                    ></input>
                                </label>
                                <label>
                                    <p>{labels.accountAmount}</p>
                                    <input
                                        id='amount'
                                        onChange={(e) => setAmmount(e.target.value)}
                                        type='number'
                                        step='0.01'
                                        placeholder='$0.00'
                                        style={{ width: '25%' }}
                                    ></input>
                                </label>
                                <label>
                                    <p>{labels.accountDate}</p>
                                    <input
                                        id='date'
                                        onChange={(e) => setDate(e.target.value)}
                                        type='date'
                                        defaultValue={moment().format(DATEFORMAT).toString()}
                                    ></input>
                                </label>
                                <button type='submit'>
                                    {labels.addAccountButtonLabel}
                                </button>
                                {error && <p className='error'>Please input information!</p>}
                            </form >
                        </div>
                    </div>
                </div>
            </ModalWrapper>}
        </BillsWrapper>
    );
}

export default BillDetails;

const ModalWrapper = styled.div`
    /* mobile */
    .modal-background,
    .modal {
        position: fixed;
        z-index: 99999;
        left: 0;
        width: 100%;
        overflow: hidden;
        margin: auto;
    }

    .modal-background {
        top: 0;
        height: 100%;
        backdrop-filter: blur(5px);
    }

    .modal {
        top: 0;
        height: 100%;
    }

    .modal-container {
        background-color: var(--darkteal);
        height: 100%;
        width: 75%;
        margin: auto;
        padding: 0px 16px;
        text-align: left;
    }

    .modal-header {
        width: 60%;
        margin: auto;
        padding: 50px 0px;
    }

    .modal-header h2 {
        margin: 0;
        padding: 10px;
        text-align: center;
        background-color: var(--pink);
        color: var(--darkteal);
    }

    .close {
        color: var(--pink);
        float: right;
        font-size: 30px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: var(--darkpink);
        text-decoration: none;
        cursor: pointer;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
        .modal-container {
            width: 55%;
        }

        .modal-header {
            width: 45%;
        }
    }

    @media (prefers-color-scheme: dark) {
        .modal-container {
            border-left: 10px solid var(--pink);
            border-right: 10px solid var(--pink);
        }
    }

    @media (prefers-color-scheme: light) {
    }

    /* mobile */
    .transaction-input-form {
        margin: 10px 10px 40px 10px;
        padding: 20px;
        width: 90%;
    }

    .transaction-input-form label {
        padding: 10px;
        display: block;
        height: 60px;
    }

    .transaction-input-form p {
        margin: 10px 0px;
        padding: 0px 10px;
        float: left;
        font-weight: 600;
    }

    .transaction-input-form label select,
    .transaction-input-form label input {
        margin: 10px;
    }

    .transaction-input-form select, input {
        cursor: pointer;
        border: none;
        border-radius: 50px;
        margin: 10px 0px;
        padding: 0px 10px;
        font: inherit;
        font-size: .75em;
        outline: none;
    }

    .transaction-input-form button {
        float: right;
        cursor: pointer;
        border: none;
        border-radius: 50px;
        margin: 10px 0px;
        padding: 10px 20px;
        font: inherit;
    }

    #name {
        width: 42%;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
        .transaction-input-form {
            width: 60%;
        }
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
        .transaction-input-form {
            width: 75%;
        }

        #name {
            width: 50%;
        }
    }

    @media (prefers-color-scheme: dark) {
        .transaction-input-form select, input {
            border: 1px solid var(--pink);
            background-color: var(--teal);
            color: var(--pink);
        }

        .transaction-input-form button {
            background-color: var(--pink);
            color: var(--teal);
        }
    }

    @media (prefers-color-scheme: light) {
        .transaction-input-form select, input {
            border: 1px solid var(--teal);
            background-color: var(--pink);
            color: var(--teal);
        }

        .transaction-input-form button {
            background-color: var(--teal);
            color: var(--pink);
        }
    }
`;

const BillsWrapper = styled.div`
    /* mobile */
    h2 {
        text-align: center;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {}

    /* desktop */
    @media only screen and (min-width: 900px) {}

    @media (prefers-color-scheme: dark) {}

    @media (prefers-color-scheme: light) {}
`;