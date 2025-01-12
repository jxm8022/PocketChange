import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionDictionary } from "../../api/TransactionAPI";
import { loadDictionary } from "../../actions/transactionActions";

function useLoadDictionary() {
    const { userId, token } = useSelector((state) => state.user);
    const { dictionary } = useSelector((state) => state.transaction);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTransactionDictionary(userId, token).then((res) => {
            dispatch(loadDictionary(res));
        });
    },[dispatch, userId, token]);

    return dictionary;
}

export default useLoadDictionary;