import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { transactionCategories } from '../../resources/labels';
import { FloatString } from '../../utilities/FormatData';
import { CREDITACCOUNTTYPES, CREDITEXPENSETYPES, EXPENSETYPES } from '../../resources/constants';

const MonthSummary = () => {
    const { transactions } = useSelector((state) => state.transaction);
    const { accounts } = useSelector((state) => state.accounts);
    const [data, setData] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);

    const getTypeLabel = (typeId) => transactionCategories.find(c => c.id === typeId)?.type ?? 'No type found';

    useEffect(() => {
        let calculatedData = transactions.reduce((acc, t) => {
            let index = acc.findIndex(c => c.typeId === t.typeId);

            // Checks if it is a debt payment for a credit card (these are considered 'income' for credit accounts)
            // We only want to keep the debt payment from the debit card side
            if (CREDITACCOUNTTYPES.includes(accounts[t.accountId].typeId) && !CREDITEXPENSETYPES.includes(t.typeId)) {
                return acc;
            }

            if (index !== -1) {
                acc[index].total += t.amount;
            }
            else {
                acc.push({ typeId: t.typeId, total: t.amount });
            }
            return acc;
        }, []);

        setData(calculatedData);
        setDataTotal(calculatedData.reduce((acc, t) => acc + (EXPENSETYPES.includes(t.typeId) ? t.total : 0), 0));
    }, [transactions, accounts]);

    const getUsage = (typeId, total) => {
        if (!EXPENSETYPES.includes(typeId)) {
            return '-';
        }

        return FloatString(total / dataTotal) * 100;
    }

    return (
        <MonthSummaryWrapper>
            <h2>Summary</h2>
            {data.map(t => <p key={t.typeId}>{getUsage(t.typeId, t.total)}% {getTypeLabel(t.typeId)}: ${FloatString(t.total)}</p>)}
        </MonthSummaryWrapper>
    );
};

export default MonthSummary;

const MonthSummaryWrapper = styled.div`
    /* mobile */
    text-align: center;

    /* tablets */
    @media only screen and (min-width: 600px) {}

    /* desktop */
    @media only screen and (min-width: 900px) {}

    @media (prefers-color-scheme: dark) {}

    @media (prefers-color-scheme: light) {}
`;