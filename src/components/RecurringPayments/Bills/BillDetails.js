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
import Modal from "../../Common/Modal";
import Form from "../../Common/Form";

const BillDetails = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const { bills } = useSelector((state) => state.recurringPayments);

    const [total, setTotal] = useState(0);
    const [mappedBills, setMappedBills] = useState([]);
    const [isDisplayModal, setIsDisplayModal] = useState(false);
    const [occurence, setOccurence] = useState(0);
    const [bill, setBill] = useState('');
    const [amount, setAmmount] = useState('');
    const [date, setDate] = useState(moment().format(DATEFORMAT).toString());
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTotal(Object.values(bills).reduce((prev, curr) => prev + curr.amount, 0));
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

    const submitHandler = async () => {
        setError(false);

        const isValid = validateForm();

        if (!isValid) {
            setError('Invalid form input.');
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

    const formDefs = [
        {
            label: labels.billOccurence,
            input: <select id='type' onChange={(e) => setOccurence(e.target.value)}>
                {occurences.map((occurence) => {
                    return <option key={occurence.id} value={occurence.id}>{occurence.value}</option>
                })}
            </select>
        },
        {
            label: labels.bill,
            input: <input
                id='name'
                onChange={(e) => setBill(e.target.value)}
                type='text'
                placeholder='Bill Name'
            ></input>
        },
        {
            label: labels.billAmount,
            input: <input
                id='amount'
                onChange={(e) => setAmmount(e.target.value)}
                type='number'
                step='0.01'
                placeholder='$0.00'
            ></input>
        },
        {
            label: labels.billDate,
            input: <input
                id='date'
                onChange={(e) => setDate(e.target.value)}
                type='date'
                defaultValue={moment().format(DATEFORMAT).toString()}
            ></input>
        },
    ];

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
            <p className="summary">Total: ${total.toFixed(2)}</p>
            <Modal
                isDisplayModal={isDisplayModal}
                title={labels.addBillTitle}
                submitLabel={labels.addBillButtonLabel}
                setDisplayModal={setIsDisplayModal}
                submitHandler={submitHandler}
                error={error}
            >
                <Form
                    formDefs={formDefs}
                    setError={setError}
                />
            </Modal>
        </BillsWrapper>
    );
}

export default BillDetails;

const BillsWrapper = styled.div`
    /* mobile */
    h2 {
        text-align: center;
    }

    .summary {
        text-align: center;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {}

    /* desktop */
    @media only screen and (min-width: 900px) {}

    @media (prefers-color-scheme: dark) {}

    @media (prefers-color-scheme: light) {}
`;