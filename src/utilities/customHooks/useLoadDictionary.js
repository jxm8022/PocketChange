import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../components/Auth/AuthContext";
import { loadDictionary } from "../../actions/transactionActions";
import { getTransactionDictionaryAsync } from "../../api/transactionAPI";

function useLoadDictionary(setIsLoading = () => { }) {
    const { user } = useAuth();
    const { dictionary } = useSelector((state) => state.transaction);
    const dispatch = useDispatch();

    useEffect(() => {
        const getTransactionDictionary = async () => {
            setIsLoading(true);
            try {
                const res = await getTransactionDictionaryAsync(user.uid);
                dispatch(loadDictionary(res));
            }
            catch (ex) {
                console.log(ex.message)
            }
            finally {
                setIsLoading(false);
            }
        }

        getTransactionDictionary();
    }, [dispatch, setIsLoading, user]);

    return dictionary;
}

export default useLoadDictionary;