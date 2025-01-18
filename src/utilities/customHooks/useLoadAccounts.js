import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../api/accountAPI";
import { loadAccounts } from "../../actions/accountActions";

function useLoadAccounts(setIsLoading = () => { }) {
    const { userId, token } = useSelector((state) => state.user);
    const { accounts, accountDictionary } = useSelector((state) => state.accounts);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        fetchAccounts(userId, token).then((res) => {
            dispatch(loadAccounts(res));
        }).finally(() => {
            setIsLoading(false);
        });
    }, [dispatch, setIsLoading, userId, token]);

    return [accounts, accountDictionary];
}

export default useLoadAccounts;