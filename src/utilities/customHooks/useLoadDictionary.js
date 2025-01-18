import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionDictionary } from "../../api/TransactionAPI";
import { loadDictionary } from "../../actions/transactionActions";

function useLoadDictionary(setIsLoading = () => { }) {
    const { userId, token } = useSelector((state) => state.user);
    const { dictionary } = useSelector((state) => state.transaction);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        fetchTransactionDictionary(userId, token).then((res) => {
            dispatch(loadDictionary(res));
        }).finally(() => {
            setIsLoading(false);
        });
    }, [dispatch, setIsLoading, userId, token]);

    return dictionary;
}

export default useLoadDictionary;