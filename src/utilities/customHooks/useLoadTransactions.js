import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../components/Auth/AuthContext";
import { getTransactionsAsync } from "../../api/transactionAPI";
import { loadTransactions } from "../../actions/transactionActions";
import useDefaultSearchParams from "./useDefaultSearchParams";

function useLoadTransactions(setIsLoading = () => { }) {
    const { user } = useAuth();
    const { transactions } = useSelector((state) => state.transaction);
    const dispatch = useDispatch();

    const { searchParams } = useDefaultSearchParams();
    useEffect(() => {
        const getTransactions = async () => {
            setIsLoading(true);
            try {
                const year = searchParams.get('year');
                const month = searchParams.get('month');
                const res = await getTransactionsAsync(user.uid, year, month);
                dispatch(loadTransactions(res));
            }
            catch (ex) {
                console.log(ex.message)
            }
            finally {
                setIsLoading(false);
            }
        }

        getTransactions();
    }, [dispatch, setIsLoading, user, searchParams]);

    return transactions;
}

export default useLoadTransactions;