import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../api/TransactionAPI";
import { useSearchParams } from "react-router-dom";
import { loadTransactions } from "../../actions/transactionActions";

function useLoadTransactions(setIsLoading = () => { }) {
    const [searchParams,] = useSearchParams();
    const { userId, token } = useSelector((state) => state.user);
    const { transactions } = useSelector((state) => state.transaction);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        const year = searchParams.get('year');
        const month = (parseInt(searchParams.get('month')) + 1).toString().padStart(2, '0');
        fetchTransactions(userId, year, month, token).then((res) => {
            dispatch(loadTransactions(res));
        }).finally(() => {
            setIsLoading(false);
        });
    }, [dispatch, setIsLoading, userId, searchParams, token]);

    return transactions;
}

export default useLoadTransactions;